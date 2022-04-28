from Model import Products, Merchant as Merchant_model,Users,Purchase,db,app
from Merchant import Merchant
from flask import request, jsonify
import bcrypt
import jwt
import datetime
from functools import wraps
from sqlalchemy import select
from flask_cors import cross_origin
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

@app.route('/merchant',methods=['POST'])
@token_required_merchant
def root():
    request_sent=request.get_json()
    token = request.headers.get("token")
    print(request_sent)
    id = request_sent['id']
    name = request_sent['name']
    qty = int(request_sent['qty'])
    cat = request_sent['cat']
    des = request_sent['des']
    price = int(request_sent['price'])
    merchant=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    print(merchant)
    return Merchant.addItem(id,name,qty,cat,price,des,merchant['name'])

@app.route('/merchant/<int:id>',methods=["DELETE"])
@token_required_merchant
def delete(id):
    return Merchant.deleteItem(id)
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

    def signup(email,password):
        exist=db.session.query(Users.user_id).filter_by(user_email=email).first() is not None
        print(exist)
        if exist:
            return {"message":"There is a user exist"}
        else:
            print(email,password)
            salt = bcrypt.gensalt()
            hash = bcrypt.hashpw(password.encode('utf-8'), salt)

            try:
                new_user=Users(user_email=email,hash=hash,salt=salt)
                db.session.add(new_user)
                db.session.commit()
            except:
                return {"message":"Error in Database"}
            return {"message":"User successfully created"}
    
    def login(email,password):
        try:
            data=Users.query.filter_by(user_email=email).first()
            print(data.user_email)
        except:
            return {"message":"There is a problem in Database connection"}
        email=data.user_email
        hash=data.hash
        salt=data.salt
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)

        if (hashed == hash):
            token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
            return jsonify({"token":token})
        else:
            jsonify({"message":"Login is not a successful attempt"})
    
    def purchase(product_id,entered_number_of_products,user_id,inCart,status):

        user_session=db.session.query(Users.user_email).filter_by(user_email=user_id.lower())
        product_session=db.session.query(Products.product_id).filter_by(product_id=product_id)
# stmt = select(user_table).where(user_table.c.name == 'spongebob')
        product_available=select(Products).where(Products.product_id==product_id)
        print(product_available)
        print(entered_number_of_products)
        if product_available is None:
            return {"message":"product is is wrong"}
        elif product_available <= entered_number_of_products:
            return {"message":"Available product is "+str(product_available)}
        else:
            new_purchase=Purchase(product_id=product_session,user_id=user_session,inCart=inCart,date=datetime.datetime.now(),status=status,quantity=entered_number_of_products)
            db.session.add(new_purchase)
            db.session.commit()
            return {"message":"product entered successfully"}


@app.route("/user/signup",methods=["POST"])
def signup_user():
    email=request.form['email']
    password=request.form['password'] 
    return User.signup(email,password)

@app.route("/user/login",methods=["POST"])
def login_user():
    email=request.form['email']
    password=request.form['password'] 
    return User.login(email,password) 


@app.route("/user/purchase",methods=["POST"])
@token_required_user
def purchase():
    token = request.headers.get("token")
    product_id=request.form['product_id']
    quantity=request.form['quantity']
    # user_id=request.form['user_id']
    inCart=request.form['inCart']
    status=request.form['status']
    user_email=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    print(user_email["email"])
    return User.purchase(product_id,quantity,user_email["email"],inCart,status)
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------

class Page():
    def home():
        return {"message":"home page"}
    
    def sections(shopby,pricerange_higher_limit,pricerange_lower_limit,brandname):
        # filter by sections -> routes
        # params -> pricerange, brandname
        arr=[]
        results=db.session.query(Products).filter(Products.product_price<=pricerange_higher_limit & Products.product_price >pricerange_higher_limit & Products.product_category== shopby)
        for result in results:
            arr.append(result)
        return {"data":arr}
        
if __name__ == "__main__":
    app.run(debug=True,port=5000)