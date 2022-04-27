
from turtle import update
from Model import Products, Merchant as Merchant_model,db,app
from flask import request, jsonify
import bcrypt
import jwt
import datetime
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # args=token.parse_args()
        token = request.args.get("token")
        # print(token)
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({"message": "Token is invalid or missing"}), 403
        return f(*args, **kwargs)

    return decorated

class Merchant:

    def addItem(id,name,qty,cat,price,des):
        print("Product listing "+str(Products.product_id))

        if id != '':
            updateItem = Products.query.get(id)
            updateItem.product_price=price            
            updateItem.product_name=name
            updateItem.product_available_qty=qty
            updateItem.product_category=cat
            updateItem.product_description=des
            db.session.commit()

            return "SuccessFully Updated"
        # .update(product_name=name,product_category=cat,product_available_qty=qty,product_price=price ,product_description=des)

        else:
            newitem = Products(product_name=name,product_category=cat,product_available_qty=qty,product_price=price,product_description=des)
            db.session.add(newitem)
            db.session.commit()
            return "successfully added"


    def deleteItem(id):
        Products.query.filter_by(product_id=id).delete()
        db.session.commit()
        return "Deleted"

    def ListItem():
        pass

    def signup(email,password):
        exist=db.session.query(Merchant_model.merchant_id).filter_by(merchant_email=email).first() is not None
        print(exist)
        if exist:
            return {"message":"There is a user exist"}
        else:
            print(email,password)
            salt = bcrypt.gensalt()
            hash = bcrypt.hashpw(password.encode('utf-8'), salt)
            hash = str(hash).split("'")[1]
            salt = str(salt).split("'")[1]
            try:
                new_merchant=Merchant_model(merchant_email=email,hash=hash,salt=salt)
                db.session.add(new_merchant)
                db.session.commit()
            except:
                return {"message":"Error in Database"}
            return {"message":"Merchant successfully created"}
    
    def login(email,password):
        data=Merchant_model.query.filter_by(merchant_email=email).first()
        email=data.merchant_email
        hash=data.hash
        salt=data.salt
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt.encode('utf-8'))
        hashed = str(hashed).split("'")[1]
        if (hashed.encode('utf-8') == hash.encode('utf-8')):
            token = jwt.encode({"user": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
            return {"token":token}
        else:
            {"message":"Login is not a successful attempt"}

@app.route("/signup",methods=["POST"])
def signup():
    email=request.form['email']
    password=request.form['password']
    return Merchant.signup(email,password)

@app.route("/login",methods=["POST"])
def login():
    email=request.form['email']
    password=request.form['password']
    return Merchant.login(email,password)

@token_required
@app.route('/',methods=['POST'])
def root():
    id = request.form['id']
    name = request.form['name']
    qty = request.form['qty']
    cat = request.form['cat']
    des = request.form['des']
    price = request.form['price']
    return Merchant.addItem(id,name,qty,cat,price,des)


@token_required
@app.route('/<int:id>')
def delete(id):
    return Merchant.deleteItem(id)

if __name__ == "__main__":
    app.run(debug=True,port=5000)