from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


class Order(db.Model):
   __tablename__ = 'orders'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
   totalPrice = db.Column(db.Float, nullable=False)
   # items = db.Column(db.String(255), nullable=False)

   items = db.relationship('OrderItem', back_populates='order', lazy=False)

   def to_dict(self):
      return {
         'id': self.id,
         'userId': self.userId,
         'totalPrice': self.totalPrice,
         'items': [item.to_dict() for item in self.items]
      }
