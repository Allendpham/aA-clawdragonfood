from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms import ReviewForm
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
   """
   Update a review
   """
   review = Review.query.get_or_404(reviewId)
   form = ReviewForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit:
      data = form.data
      review.title = data['title']
      review.message = data['message']
      review.rating = data['rating']
      review.userId = data['userId']
      review.productId = data['productId']
      db.session.commit()
      return {'review': review.to_dict()}
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):
   """
   Delete a review
   """
   review = Review.query.get_or_404(reviewId)
   if review:
      db.session.delete(review)
      db.session.commit()
      return {'message': "Review was successfully deleted."}
   return {"error": "Review does not exist"}, 404
