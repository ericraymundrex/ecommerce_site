from unittest import result
from Model import Products, Merchant as Merchant_model,Users,Purchase,db,app
from flask import jsonify, request
import bcrypt
import jwt
import datetime



class Merchant:

    def addItem(id,name,qty,cat,price,des,merchant,product_rating,img_id):
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
            updateItem.product_rating=product_rating
            updateItem.img_id=img_id
            db.session.commit()

            return "SuccessFully Updated"
        # .update(product_name=name,product_category=cat,product_available_qty=qty,product_price=price ,product_description=des)

        else:
            newitem = Products(product_name=name,product_category=cat,product_available_qty=qty,product_price=price,product_description=des,merchants=merchant_session,product_rating=0,img_id=img_id)
            db.session.add(newitem)
            db.session.commit()
            return{"message":"success"}

        
    def deleteItem(id):
        Products.query.filter_by(product_id=id).delete()
        db.session.commit()
        return {"message":"Deleted"}

    def ListItem(merchant):
        result=db.session.query(Products).join(Merchant_model).filter(Merchant_model.merchant_name==merchant["name"]).all()
        data=[]
        for product in result:
            data.append({
                "product_id":product.product_id,
                "product_name":product.product_name,
                "product_price":product.product_price,
                "product_available_qty":product.product_available_qty,
                "product_rating":product.product_rating
            })
        return jsonify({"data":data})
        

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
        try:
            email=data.merchant_email
            name=data.merchant_name
            hash=data.hash
            salt=data.salt
            hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        except AttributeError:
            return jsonify({"message":"Email is wrong"})
        if (hashed == hash):
            token = jwt.encode({"email": email,"name":name, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
            return jsonify({"token":token,"userType":"merchant","email":email,"name":name})
        else:
            jsonify({"message":"Login is not a successful attempt"})
