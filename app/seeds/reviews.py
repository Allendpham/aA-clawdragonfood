from app.models import db, Review, environment, SCHEMA


def seed_reviews():
   review1 = Review(
      title='So Delicious', message='This is definitely one of the best purchases I have made!', rating=5, userId=2, productId=1)
   review2 = Review(
      title='Not Too Sure', message='Obviously this food does not compare to home cooked meals but it was ok.', rating=4, userId=3, productId=1)
   db.session.add_all([review1, review2])
   db.session.commit()
   

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
