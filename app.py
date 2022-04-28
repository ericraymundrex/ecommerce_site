from Model import Products, Merchant as Merchant_model,Users,Purchase,db,app
from flask import request, jsonify
import bcrypt
import jwt
import datetime
from functools import wraps


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

class Merchant:

    def addItem(id,name,qty,cat,price,des,merchant):
        merchant_session=db.session.query(Merchant_model.merchant_id).filter_by(merchant_name=merchant.lower())
        print(merchant_session)
        if id != '':
            updateItem = Products.query.get(id)
            updateItem.product_price=price            
            updateItem.product_name=name
            updateItem.product_available_qty=qty
            updateItem.product_category=cat
            updateItem.product_description=des
            updateItem.merchants=merchant_session
            db.session.commit()

            return "SuccessFully Updated"
        # .update(product_name=name,product_category=cat,product_available_qty=qty,product_price=price ,product_description=des)

        else:
            newitem = Products(product_name=name,product_category=cat,product_available_qty=qty,product_price=price,product_description=des,merchants=merchant_session)
            db.session.add(newitem)
            db.session.commit()
            return "successfully added"


    def deleteItem(id):
        Products.query.filter_by(product_id=id).delete()
        db.session.commit()
        return {"message":"Deleted"}

    def ListItem():
        pass

    def signup(email,password,name):
        exist=db.session.query(Merchant_model.merchant_id).filter_by(merchant_email=email.lower()).first() is not None
        if exist:
            return {"message":"There is a user exist"}
        else:
            # print(email,password)
            salt = bcrypt.gensalt()
            hash = bcrypt.hashpw(password.encode('utf-8'), salt)

            try:
                new_merchant=Merchant_model(merchant_email=email,hash=hash,salt=salt,merchant_name=name)
                db.session.add(new_merchant)
                db.session.commit()
            except:
                return {"message":"Error in Database"}
            return {"message":"Merchant successfully created"}
    
    def login(email,password):
        try:
            data=Merchant_model.query.filter_by(merchant_email=email.lower()).first()
        except:
            return {"message":"There is a problem in Database connection"}
        email=data.merchant_email
        name=data.merchant_name
        hash=data.hash
        salt=data.salt
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        if (hashed == hash):
            token = jwt.encode({"email": email,"name":name, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
            return jsonify({"token":token})
        else:
            jsonify({"message":"Login is not a successful attempt"})



@app.route("/merchant/signup",methods=["POST"])
def signup():
    email=request.form['email']
    password=request.form['password']
    name=request.form['name']
    return Merchant.signup(email,password,name)

@app.route("/merchant/login",methods=["POST"])
def login():
    email=request.form['email']
    password=request.form['password']
    return Merchant.login(email,password)

@app.route('/merchant',methods=['POST'])
@token_required_merchant
def root():
    token = request.headers.get("token")
    id = request.form['id']
    name = request.form['name']
    qty = int(request.form['qty'])
    cat = request.form['cat']
    des = request.form['des']
    price = int(request.form['price'])
    merchant=jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    print(merchant)
    return Merchant.addItem(id,name,qty,cat,price,des,merchant['name'])

@app.route('/merchant/<int:id>',methods=["DELETE"])
@token_required_merchant
def delete(id):
    return Merchant.deleteItem(id)
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------
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
    
    def purchase(product_id,entered_number_of_products,user_id,inCart,date,status):

        product_available=db.session.query(Products.available_qty).filter_by(product_id=product_id).first() is not None
        if product_available is None:
            return {"message":"product is is wrong"}
        elif product_available <entered_number_of_products:
            return {"message":"Available product is "+str(product_available)}
        else:
            new_purchase=Purchase(product_id=product_id,user_id=user_id,inCart=inCart,date=date,status=status,quantity=entered_number_of_products)
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
def purchase():
    product_id=request.form['project_id']
    quantity=request.form['quantity']
    user_id=request.form['user_id']
    inCart=request.form['inCart']
    date=request.form['date']
    status=request.form['status']
    return User.purchase(product_id,quantity,user_id,inCart,date,status)
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