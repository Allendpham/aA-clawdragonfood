from app.models import db, environment, SCHEMA, Order


def seed_orders():
   order1 = Order(
      userId=1,
      totalPrice=43.80
   )

   order2 = Order(
      userId=1,
      totalPrice=19.80
   )

   db.session.add_all([order1, order2])
   db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
