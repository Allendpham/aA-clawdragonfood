from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


class ProductImage(db.Model):
   __tablename__ = 'productImages'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   imageUrl = db.Column(db.String(255), nullable=False)
   productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

   product = db.relationship('Product', back_populates='images')

   def to_dict(self):
      return {
         'id': self.id,
         'imageUrl': self.imageUrl,
         'productId': self.productId
      }
