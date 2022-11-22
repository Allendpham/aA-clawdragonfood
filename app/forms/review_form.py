from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ReviewForm(FlaskForm):
   title = StringField('title', validators=[DataRequired(message='Please enter a title.')])
   message = StringField('message', validators=[DataRequired(message='Please enter a message.')])
   rating = IntegerField('rating', validators=[DataRequired(message='Please select a rating.')])
   userId = IntegerField('userId', validators=[DataRequired()])
   productId = IntegerField('productId', validators=[DataRequired()])