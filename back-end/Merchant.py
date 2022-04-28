from Model import Products, Merchant as Merchant_model,Users,Purchase,db,app
from flask import jsonify
import bcrypt
import jwt
import datetime

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