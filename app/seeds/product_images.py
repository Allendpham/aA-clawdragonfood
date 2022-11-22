from app.models import db, environment, SCHEMA, ProductImage


def seed_product_images():
   img1 = ProductImage(imageUrl='https://i.imgur.com/uYsB6Ki.png', productId=1)
   img2 = ProductImage(imageUrl='https://i.imgur.com/1pAsEO1.png', productId=1)
   img3 = ProductImage(imageUrl='https://i.imgur.com/NIwVXLa.png', productId=1)

   img4 = ProductImage(imageUrl='https://i.imgur.com/MLN4Ana.png', productId=2)
   img5 = ProductImage(imageUrl='https://i.imgur.com/Rxmuhf6.png', productId=2)
   img6 = ProductImage(imageUrl='https://i.imgur.com/JRmYPcB.png', productId=2)

   img7 = ProductImage(imageUrl='https://i.imgur.com/hlfOVzk.png', productId=3)
   img8 = ProductImage(imageUrl='https://i.imgur.com/GKrBaUg.png', productId=3)
   img9 = ProductImage(imageUrl='https://i.imgur.com/POeQ6r7.png', productId=3)

   img10 = ProductImage(imageUrl='https://i.imgur.com/Z4BSlje.png', productId=4)
   img11 = ProductImage(imageUrl='https://i.imgur.com/TGv3al6.png', productId=4)
   img12 = ProductImage(imageUrl='https://i.imgur.com/zldZYCc.png', productId=4)

   img13 = ProductImage(imageUrl='https://i.imgur.com/Djs0whe.png', productId=5)
   img14 = ProductImage(imageUrl='https://i.imgur.com/lHU6acD.png', productId=5)
   img15 = ProductImage(imageUrl='https://i.imgur.com/kcMrHeI.png', productId=5)

   img16 = ProductImage(imageUrl='https://i.imgur.com/J8BRNMO.png', productId=6)
   img17 = ProductImage(imageUrl='https://i.imgur.com/y1gRATN.png', productId=6)
   img18 = ProductImage(imageUrl='https://i.imgur.com/nE4PVHw.png', productId=6)

   img19 = ProductImage(imageUrl='https://i.imgur.com/mf6dmcF.png', productId=7)
   img20 = ProductImage(imageUrl='https://i.imgur.com/zRegCKn.png', productId=7)
   img21 = ProductImage(imageUrl='https://i.imgur.com/xCFmMSX.png', productId=7)

   img22 = ProductImage(imageUrl='https://i.imgur.com/5vFplq7.png', productId=8)
   img23 = ProductImage(imageUrl='https://i.imgur.com/kBjVW2e.png', productId=8)
   img24 = ProductImage(imageUrl='https://i.imgur.com/eKDY8bF.png', productId=8)

   img25 = ProductImage(imageUrl='https://i.imgur.com/8KSeQfL.png', productId=9)
   img26 = ProductImage(imageUrl='https://i.imgur.com/VH37PaD.png', productId=9)
   img27 = ProductImage(imageUrl='https://i.imgur.com/xSrSZ8C.png', productId=9)

   img28 = ProductImage(imageUrl='https://i.imgur.com/hffph36.png', productId=10)
   img29 = ProductImage(imageUrl='https://i.imgur.com/omPFJaF.png', productId=10)
   img30 = ProductImage(imageUrl='https://i.imgur.com/ajBkzFr.png', productId=10)

   db.session.add_all([img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30])
   db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_images")

    db.session.commit()
