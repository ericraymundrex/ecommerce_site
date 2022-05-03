
from crypt import methods
from unicodedata import category
from numpy import product
from Model import Products, Merchant, Users, Purchase, db, app
from Merchant import Merchant
from flask import request, jsonify
import bcrypt
import jwt
import datetime
from functools import wraps
from sqlalchemy import select
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
import os

import boto3 as aws
import glob
#--------------------------------------------------------------------------------------------------------------------
#------------------------------------------------------------ MERCHANT-----------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
def token_required_merchant(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("token")
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({"message": "Token is invalid or missing"}), 403
        return f(*args, **kwargs)

    return decorated

@app.route("/merchant/signup",methods=["POST"])
@cross_origin(supports_credentials=True)
def signup():
    request_sent=request.get_json()
    email=request_sent["email"]
    password=request_sent['password']
    name=request_sent['name']
    return Merchant.signup(email,password,name)

@app.route("/merchant/login",methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    request_sent=request.get_json()
    email=request_sent['email']
    password=request_sent['password']

    return Merchant.login(email,password)


@app.route('/merchant',methods=['POST','GET'])
@token_required_merchant
def root():
    
    token = request.headers.get("token")
    merchant=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    if request.method=="POST":
        request_sent=request.get_json()
        print(request_sent)
        id = request_sent['id']
        name = request_sent['name']
        qty = int(request_sent['qty'])
        cat = request_sent['cat']
        des = request_sent['des']
        price = int(request_sent['price'])
        img_id=request_sent['img_id']
        if id !='':
            product_rating=request_sent['product_rating']
        else:
            product_rating=0
        print(merchant)
        return Merchant.addItem(id,name,qty,cat,price,des,merchant['name'],product_rating,img_id)
    if request.method=="GET":
        return Merchant.ListItem(merchant)
        

@app.route('/merchant/<int:id>',methods=["DELETE"])
@token_required_merchant
def delete(id):
    return Merchant.deleteItem(id)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/merchant/img',methods=["POST"])
def img():
    bucket_name = "system-item-bucket"

    if 'files[]' not in request.files:
            # response = jsonify({"messgae": "No file in the request"})
            # response.status_code = 400
        return jsonify({"messgae": "No file in the request"}),400

    files = request.files.getlist('files[]')
    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            errors[file.filename] = 'File type is not allowed'

    statics_folder = glob.glob('static/*')
    print(statics_folder)
    for file_in_static in statics_folder:
        client = aws.client('s3');
        client.upload_file(file_in_static, bucket_name, file_in_static.split("/")[1])
    # for file in statics_folder:
    #     os.remove(file)

    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        resp = jsonify(errors)
        resp.status_code = 500

        return resp
    if success:
        resp = jsonify({'message': 'Files successfully uploaded'})
        resp.status_code = 201

        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
#--------------------------------------------------------------------------------------------------------------------
#------------------------------------------------------------ USER---------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------

def token_required_user(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("token")
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({"message": "Token is invalid or missing"}), 403
        return f(*args, **kwargs)

    return decorated
class User:
    def signup(email,password,name):
        exist=db.session.query(Users.user_id).filter_by(user_email=email).first() is not None
        print(exist)
        if exist:
            return {"message":"There is a user exist"}
        else:
            print(email,password)
            salt = bcrypt.gensalt()
            hash = bcrypt.hashpw(password.encode('utf-8'), salt)

            try:
                new_user=Users(user_email=email,hash=hash,salt=salt,name=name)
                db.session.add(new_user)
                db.session.commit()
            except:
                return {"message":"Error in Database"}
            return {"message":"User successfully created"}
    
    def login(email,password):
        try:
            data=Users.query.filter_by(user_email=email).first()
        except:
            return {"message":"There is a problem in Database connection"}
        email=data.user_email
        hash=data.hash
        salt=data.salt
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)

        if (hashed == hash):
            token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
            return jsonify({"token":token,"userType":"customer","email":email,"name":data.name})
        else:
            return jsonify({"message":"Login is not a successful attempt"})
    #product_id,user_id,inCart,status,quantity):
    def purchase(product_id,entered_number_of_products,user_id,status):
        print(str(product_id)+" "+str(user_id))
        user_session=db.session.query(Users.user_id).filter_by(user_email=user_id.lower())
        product_session=db.session.query(Products.product_id).filter_by(product_id=int(product_id))
        print(str(user_session)+" "+str(product_session))
        new_purchase=Purchase(product_id=product_session,user_id=user_session,status=status,quantity=entered_number_of_products)
        db.session.add(new_purchase)
        db.session.commit()
        return {"message":"product entered successfully"}

    def Reviews(id,rating):
        updateItem = Products.query.get(id)
        print(updateItem.product_rating)
        print(rating)
        updateItem.product_rating=int((updateItem.product_rating+int(rating))/2)
        db.session.commit()
        return {"message":"success"}
    def purchase_history(user_id):
        # result=db.session.query(Purchase,Users).select_from(Users).join(Users).filter(Users.user_id==user_id).all()
        # data=[]
        # for purchase,user in result:
        #     data.append(purchase)
        # return jsonify({"data":data})  
        pass     

@app.route("/user/signup",methods=["POST"])
def signup_user():
    request_sent=request.get_json()
    email=request_sent['email']
    password=request_sent['password']
    name=request_sent['name'] 
    return User.signup(email,password,name)

@app.route("/user/login",methods=["POST"])
def login_user():
    request_sent=request.get_json()
    email=request_sent['email']
    password=request_sent['password'] 
    return User.login(email,password) 


@app.route("/user/purchase",methods=["POST","GET"])
@token_required_user
def purchase():
    token = request.headers.get("token")
    user_email=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])    
    if request.method=="POST":
        request_sent=request.get_json()
        # product_id=request_sent['product_id']
        # quantity=request_sent['quantity']
        # status=request_sent['status']
        data=request_sent['data']
        print(data)
        print(user_email["email"])
        for data in data:
            print(data)
            User.purchase(data["id"],1,user_email["email"],"booked")
        return {"message":"success"}

    if request.method=="GET":
        return User.purchase_history(user_email)

@app.route("/user/review",methods=["POST"])
@token_required_user
def review():
    request_sent=request.get_json()
    id=request_sent['id']
    rate=request_sent['rate']
    return User.Reviews(id,rate)
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------

class Page():
    def home(page):
        rows = db.session.query(Products).count()
        offseter=rows-page*10
        all_products=db.session.query(Products.product_id,Products.product_name,Products.product_price,Products.product_description, Products.product_category, Products.product_available_qty,Products.product_rating,Products.img_id).offset(offseter).limit(10).all()
        products=[]
        for p in all_products:
            products.append({"name":p.product_name,"id":p.product_id,"price":p.product_price,"description":p.product_description,"product_category":p.product_category,"product_available_qty":p.product_available_qty,"product_rating":p.product_rating,"img":"static/"+str(p.img_id)+str(".png")})
        return {"data":products}

    def Unique_Categories():
        query = db.session.query(Products.product_category.distinct())
        unique_cat = []
        for p in query:
            unique_cat.append({"id":len(unique_cat)+1,"name":str(p).split("'")[1].replace(' ',''),"value":str(p).split("'")[1]})
        return {"data": unique_cat}
    
    def category_price_range_brand(price_upper_limit,price_lower_limit,brand_name):
        all_products=db.session.query(Products.product_id,Products.product_name,Products.product_price,Products.product_description, Products.product_category, Products.product_available_qty).filter_by(Products.product_price<=price_upper_limit & Products.product_price>=price_lower_limit)
        products=[]
        for p in all_products:
            products.append({"name":p.product_name,"id":p.product_id,"price":p.product_price,"description":p.product_description,"product_category":p.product_category,"product_available_qty":p.product_available_qty})
        return {"data":products}
    def detail_view(product_id):
        
        products=db.session.query(Products.product_id,Products.product_name,Products.product_price,Products.product_description, Products.product_category, Products.product_available_qty, Products.product_rating).filter(Products.product_id==product_id)
        product=[]
        for p in products:
            product.append({"name":p.product_name,"id":p.product_id,"price":p.product_price,"description":p.product_description,"product_category":p.product_category,"product_available_qty":p.product_available_qty,"product_rating":p.product_rating})
        return {"data":product}

    def filter_By_Category(category):

        products = db.session.query(Products.product_id,Products.product_name,Products.product_price,Products.product_description, Products.product_category, Products.product_available_qty,Products.product_rating,Products.img_id).filter(Products.product_category == category).all()
        product = []
        for p in products:
            product.append({"name":p.product_name,"id":p.product_id,"price":p.product_price,"description":p.product_description,"product_category":p.product_category,"product_available_qty":p.product_available_qty,"product_rating":p.product_rating,"img":"http://localhost:5000/static/"+str(p.img_id)+str(".png")})
        return {"data":product}

    def get_search():
        query = db.session.query(Products).all()
        products = []
        for p in query:
            products.append({"name":p.product_name,"product_category":p.product_category})
        return {"data":products}        

@app.route("/home",methods=["POST"])
@cross_origin(supports_credentials=True)
def home_page():
    request_sent=request.get_json()
    print(request_sent)
    offset=request_sent['offset']    
    return Page.home(offset)

@app.route("/category",methods=["GET"])
# @cross_origin(supports_credentials=True)
def get_category_list():
    return Page.Unique_Categories()

@app.route("/product/<id>",methods=["GET"])
@cross_origin(supports_credentials=True)
def detail_page(id):
    print(id)
    return Page.detail_view(id)

@app.route("/<val>",methods=["GET"])
@cross_origin(supports_credentials=True)
def filter_category(val):
    category_name = str(val[0])
    for i in range(1,len(val)):
        if val[i] >= 'Z':
            category_name += str(val[i])
        elif 'A' <= val[i] <= 'Z':
            category_name += (" " + str(val[i]))
    return Page.filter_By_Category(category_name)

@app.route("/search",methods=["GET"])
@cross_origin(supports_credentials=True)
def search():
    return Page.get_search()


if __name__ == "__main__":
    app.run(debug=True,port=5000)
    # print(Page.category_price_range_brand())