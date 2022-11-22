from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy import func
from sqlalchemy.orm import relationship
import datetime
import json


class Review(db.Model):
   __tablename__ = 'reviews'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   title = db.Column(db.String(255), nullable=False)
   message = db.Column(db.String(255), nullable=False)
   rating = db.Column(db.Integer, nullable=False)
   createdAt = db.Column(db.DateTime, default=datetime.datetime.now)
   updatedAt = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
   userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
   productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

   product = db.relationship('Product', back_populates='reviews')
   user = db.relationship('User', back_populates='reviews', lazy=False)

   def to_dict(self):
      return {
         'id': self.id,
         'title': self.title,
         'message': self.message,
         'rating': self.rating,
         'userId': self.userId,
         'productId': self.productId,
         'createdAt': json.dumps(self.createdAt, default=str),
         'updatedAt': json.dumps(self.updatedAt, default=str),
         'user': self.user.to_dict()
      }
