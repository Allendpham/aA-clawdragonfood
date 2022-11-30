from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class ReviewForm(FlaskForm):
   title = StringField('title', validators=[DataRequired(message='Please enter a title.')])
   message = StringField('message', validators=[DataRequired(message='Please enter a message.'), Length(max=255, message='Message character limit is 255 characters.')])
   rating = IntegerField('rating', validators=[DataRequired(message='Please select a rating.')])
   userId = IntegerField('userId', validators=[DataRequired()])
   productId = IntegerField('productId', validators=[DataRequired()])
