from flask import Blueprint, jsonify, request
from app.models import Order, OrderItem, db
from flask_login import login_required, current_user
import json

order_routes = Blueprint('orders', __name__)


@order_routes.route('/current')
@login_required
def get_orders():
   """
   Query for users orders
   """
   orders = Order.query.filter(Order.userId == current_user.id)
   return { 'orders': [order.to_dict() for order in orders] }


@order_routes.route('', methods=['POST'])
# @login_required
def add_order():
   """
   Add an order
   """
   data = request.get_json() #Getting data from req.body
   new_order = Order(userId=data['userId'], totalPrice=data['totalPrice'])
   db.session.add(new_order)
   db.session.commit()

   # How to get new_order id?
   order = Order.query.order_by(Order.id.desc()).first().to_dict()

   items = json.loads(request.get_json()['items'])
   for item in items:
      if 'Packets' in item['name']:
         # print(item['name'], item['count'])
         new_item = OrderItem(contents=item['name'], quantity=item['count'], orderId=new_order.to_dict()['id'])
         db.session.add(new_item)
         db.session.commit()
      else:
         new_item = OrderItem(contents="".join(item['contents']), quantity=item['count'], orderId=new_order.to_dict()['id'])
         db.session.add(new_item)
         db.session.commit()

   return { 'order': new_order.to_dict() }
