from app.models import db, environment, SCHEMA, Product


def seed_products():
   cpb = Product(
      name='Chicken Pho Bowls',
      description="A delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Chicken Pho delivers a soothing punch with bright spices, rich umami flavors, and authentic rice noodles that soak up all the goodness. It's delicious on its own or the perfect base for whatever toppings you can imagine.",
      price=3.30)
   bpb = Product(
      name='Beef Pho Bowls',
      description="A delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Beef Pho is made in the classic style with a rich beef flavored broth, a vibrant mix of spices such as chilies, cinnamon, and star anise, and rice noodles that soak up all the umami flavors. It's perfect on its own or used as a canvas for your wildest culinary creations.",
      price=3.30)
   vpb = Product(
      name='Vegetable Pho Bowls',
      description="Pho is a delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Vegetable Pho is made with a soothing veggie broth, a mix of added spices, and Pho-style rice noodles for a hearty, yet clean snack or meal. It's perfect on its own or used as a canvas for your wildest culinary creations.",
      price=3.30)
   mpb = Product(
      name='Mushroom Pho Bowls',
      description="Pho is a delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Mushroom Pho is made with an umami-rich mushroom broth, the perfect blend of added spices, and Pho-style rice noodles that add a hearty element to the soup. It's perfect on its own or used as a canvas for your wildest culinary creations.",
      price=3.30)
   lcb = Product(
      name='Laksa Curry Bowls',
      description="Our Laksa is akin to the staple found all over Singapore. A mildly spicy blend of Southeast Asian spices balanced by the soothing richness of creamy coconut milk makes this curry truly unique in the soup world. Like all of our soups, this is perfect on its own or the perfect base to add your own flavor twists.",
      price=3.30)
   crc = Product(
      name='Chicken Ramen Cups',
      description="Born in Japan, ramen is arguably the most popular soup in the world with hundreds of styles and flavor combinations. Our Tokyo-Style Chicken Ramen is a nod to the classic with a savory chicken flavored broth, the perfect blend of seasonings, and bouncy ramen noodles that add a hearty touch. This bowl of deliciousness can be enjoyed as is or doctored up with anything that your creative, little heart desires.",
      price=3.00)
   mrc = Product(
      name='Miso Ramen Cups',
      description="Born in Japan, ramen is arguably the most popular soup in the world with hundreds of styles and flavor combinations. Our Sapporo-Style Miso Ramen has a rich miso-based veggie broth fortified with spices and herbs, and perfectly tender ramen noodles that add a hearty touch. This bowl of deliciousness can be enjoyed as is or doctored up with anything your creative little heart desires.",
      price=3.00)
   strc = Product(
      name='Spicy Tonkatsu Ramen Cups',
      description="Born in Japan, ramen is arguably the most popular soup in the world with hundreds of styles and flavor combinations. Our Kyushu-Style Spicy Tonkotsu Ramen has a spicy pork broth enhanced with chili garlic oil, and perfectly tender, authentic ramen noodles that add a hearty touch. This can be enjoyed as is or doctored up with anything your creative heart desires.",
      price=3.00)
   gpp = Product(
      name='Garlic Pho Packets',
      description="A delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Garlic Pho is made with a savory garlic broth with hints of star anise, and Pho-style rice noodles that sop up all the flavor. It's perfect on its own or used as a canvas for your wildest culinary creations.",
      price=24.00)
   bpp = Product(
      name='Beef Pho Packets',
      description="A delicious noodle soup that's synonymous with Vietnamese cuisine with regional and personal recipes found all over the country. Our Saigon-Style Beef Pho is made in the classic style with a rich beef flavored broth, a warming, yet sweet mix of spices, and Pho-style rice noodles that absorb all that flavorful goodness. It's perfect on its own or used as a canvas for your wildest culinary creations.",
      price=24.00)

   db.session.add_all([cpb, bpb, vpb, mpb, lcb, crc, mrc, strc, gpp, bpp])
   db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
