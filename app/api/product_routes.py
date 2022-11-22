from flask import Blueprint, jsonify
from app.models import Product


product_routes = Blueprint('products', __name__)


@product_routes.route('/all')
def get_all_products():
   """
   Query for all product listings
   """
   all_products = Product.query.all()
   return { 'products': [product.to_dict() for product in all_products] }
