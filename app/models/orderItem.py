from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


class OrderItem(db.Model):
   __tablename__ = 'order_items'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   contents = db.Column(db.String(255), nullable=False)
   quantity = db.Column(db.Integer, nullable=False)
   orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)

   order = db.relationship('Order', back_populates='items')

   def to_dict(self):
      return {
         'id': self.id,
         'contents': self.contents,
         'quantity': self.quantity,
         'orderId': self.orderId
      }
