
from turtle import update
from Model import Products,db,app
from flask import request

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


@app.route('/',methods=['POST'])
def root():
    id = request.form['id']
    name = request.form['name']
    qty = request.form['qty']
    cat = request.form['cat']
    des = request.form['des']
    price = request.form['price']
    return Merchant.addItem(id,name,qty,cat,price,des)

@app.route('/<int:id>')
def delete(id):
    return Merchant.deleteItem(id)

if __name__ == "__main__":
    app.run(debug=True,port=5000)