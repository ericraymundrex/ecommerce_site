import datetime
from flask import Flask, redirect, render_template, request, session, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import relationship
from flask_cors import CORS
from flask_restful import Api
from sqlalchemy.sql import func

app=Flask(__name__)
CORS(app)
Api(app)
db=SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///Ecommerce.sqlite3'
app.config['SECRET_KEY'] = "Thisisasecertkey"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["Access-Control-Allow-Origin"]="*"
app.config["Strict-Access-Control-Allow-Origin"]="*"


class Products(db.Model):
    product_id=db.Column('id',db.Integer,primary_key=True)
    product_name=db.Column(db.String(100))
    product_category=db.Column(db.String(50))
    product_available_qty=db.Column(db.Integer)
    product_description=db.Column(db.String(1000))
    product_price=db.Column(db.Integer)
    product_rating=db.Column(db.Float)

    purchases=relationship('Purchase',backref="products")

    merchants=db.Column(db.Integer,ForeignKey("merchant.id"))

    def __init__(self,product_name,product_category,product_available_qty,product_price,product_description,product_rating,merchants):
        self.product_name = product_name
        self.product_category = product_category
        self.product_price = product_price
        self.product_available_qty = product_available_qty
        self.product_description = product_description
        self.product_rating=product_rating
        self.merchants=merchants



class Merchant(db.Model):
    merchant_id=db.Column('id',db.Integer,primary_key=True)
    merchant_name=db.Column(db.String(100))
    merchant_email=db.Column(db.String(100))
    hash=db.Column(db.String(100))
    salt=db.Column(db.String(100))
    isdeleted=db.Column(db.String(1))
    products=relationship('Products',backref="merchant")

    def __init__(self,merchant_email,hash,salt,merchant_name):
        self.merchant_name=merchant_name.lower()
        self.merchant_email=merchant_email.lower()
        self.hash=hash
        self.salt=salt
        self.isdeleted=False

class Users(db.Model):
    user_id=db.Column('id',db.Integer,primary_key=True)
    user_email=db.Column(db.String(100))
    hash=db.Column(db.String(100))
    salt=db.Column(db.String(100))
    isdeleted=db.Column(db.String(1))
    name=db.Column(db.String(100))

    purchases=relationship('Purchase',backref="users") 
    
    def __init__(self,user_email,hash,salt,name):
        self.user_email=user_email
        self.hash=hash
        self.salt=salt
        self.isdeleted=False
        self.name=name

class Purchase(db.Model):
    purchase_id=db.Column('id',db.Integer,primary_key=True)
    
    product_id=db.Column(db.Integer,ForeignKey('products.id'))
    user_id=db.Column(db.Integer,ForeignKey('users.id'))
    
    inCart=db.Column(db.LargeBinary)
    date=db.Column(db.Date)
    status=db.Column(db.String(10))
    quantity=db.Column(db.Integer)
    def __init__(self, product_id,user_id,inCart,status,quantity):
        self.product_id=product_id
        self.user_id=user_id
        self.inCart=inCart
        self.date=func.now()
        self.status=status
        self.quantity=quantity

db.create_all()

if __name__ == "__main__":
    app.run(debug=True,port=5002)