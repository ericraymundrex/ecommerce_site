
from flask import Flask, redirect, render_template, request, session, url_for
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///Ecommerce.sqlite3'

db=SQLAlchemy(app)
class Products(db.Model):
    product_id=db.Column('id',db.Integer,primary_key=True)
    product_name=db.Column(db.String(100))
    product_category=db.Column(db.String(50))
    product_available_qty=db.Column(db.Integer)
    product_description=db.Column(db.String(1000))
    product_price=db.Column(db.Integer)

    def __init__(self,product_name,product_category,product_available_qty,product_price,product_description):
        self.product_name = product_name
        self.product_category = product_category
        self.product_price = product_price
        self.product_available_qty = product_available_qty
        self.product_description = product_description

# db.create_all()

if __name__ == "__main__":
    app.run(debug=True,port=5002)