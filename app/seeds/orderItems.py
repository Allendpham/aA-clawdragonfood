from app.models import db, environment, SCHEMA, OrderItem


def seed_order_items():
   item1 = OrderItem(
      contents = '3X BEEF PHO BOWLS 3X VEGETABLE PHO BOWLS',
      quantity = 1,
      orderId = 1
   )

   item2 = OrderItem(
      contents = 'Garlic Pho Packets',
      quantity = 1,
      orderId = 1
   )

   item3 = OrderItem(
      contents = '2X BEEF PHO BOWLS 3X MUSHROOM PHO BOWLS 1X LAKSA PHO BOWLS',
      quantity = 1,
      orderId = 2
   )

   db.session.add_all([item1, item2, item3])
   db.session.commit()

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM order_items")

    db.session.commit()
