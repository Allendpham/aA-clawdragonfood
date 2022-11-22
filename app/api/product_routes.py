from flask import Blueprint, jsonify, request
from app.models import Product, Review, db
from flask_login import login_required
from app.forms import ReviewForm

product_routes = Blueprint('products', __name__)


@product_routes.route('/all')
def get_all_products():
   """
   Query for all product listings
   """
   all_products = Product.query.all()
   return { 'products': [product.to_dict() for product in all_products] }


@product_routes.route('/<int:productId>/reviews')
def get_product_reviews(productId):
   """
   Query for all reviews of one product
   """
   reviews = Review.query.filter(Review.productId == productId)
   return { 'reviews': [review.to_dict() for review in reviews] }

@product_routes.route('/<int:productId>/reviews', methods=['POST'])
@login_required
def create_review(productId):
   """
   Create a review on a product
   """
   form = ReviewForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      data = form.data
      new_review = Review(title=data['title'], message=data['message'], rating=data['rating'], userId=data['userId'], productId=data['productId'])
      db.session.add(new_review)
      db.session.commit()
      return {'review': new_review.to_dict()}
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401
