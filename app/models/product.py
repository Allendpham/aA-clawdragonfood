from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


class Product(db.Model):
   __tablename__ = 'products'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255), nullable=False, unique=True)
   description = db.Column(db.Text, nullable=False)
   price = db.Column(db.Float, nullable=False)

   images = db.relationship('ProductImage', back_populates='product', lazy=False)

   reviews = db.relationship('Review', back_populates='product')

   def to_dict(self):
      return {
         'id': self.id,
         'name': self.name,
         'description': self.description,
         'price': self.price,
         'images': [image.to_dict() for image in self.images]
      }
