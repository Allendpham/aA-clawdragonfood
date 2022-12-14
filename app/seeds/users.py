from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    allen = User(
        first_name='Allen', last_name='Pham', email='allen@aa.io', password='password')
    barney = User(
        first_name='Barney', last_name='Dino', email='barney@aa.io', password='password')
    chloe = User(
        first_name='Chloe', last_name='Cardashian', email='chloe@aa.io', password='password')

    db.session.add(allen)
    db.session.add(barney)
    db.session.add(chloe)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
