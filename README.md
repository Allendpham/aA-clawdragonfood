# Claw Dragon Food
![image](https://i.imgur.com/mPUOAfG.png)


***
### A Snap Dragon Food clone

Claw Dragon Food is a full stack application that is inspired by [Snap Dragon Food](https://snapdragonfood.com/). It can be used explore and (psuedo) purchase the slurpable favorites 
such as Pho, Curry, Ramen, and much more! Explore the live link here [live link](https://aa-clawdragonfood.onrender.com/)!

***

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, change directory in a separate terminal to the react-app directory and install dependencies.
   ```bash
   npm install
   npm start
   ```
8. Note there should be two terminals active at this point: 1 for the backend and 1 for the front end. 

### Technologies Used
### Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Backend
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

### Hosting

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

***
### Feature Descriptions
* Users can create an account or log in to an existing account.
![image](https://i.imgur.com/a9M0UZb.png)
![image](https://i.imgur.com/uKeZBb6.png)

* Upon successful log in or sign up:
* Users can view all products and single product information.
![image](https://i.imgur.com/6f2YdG1.png)
![image](https://i.imgur.com/8VVWVoE.png)

* Users can create custom boxes of 6 bowls or cups to add to their cart.
![image](https://i.imgur.com/KCO5cIw.png)
![image](https://i.imgur.com/80DR63q.png)

*Users can checkout out their purchase and view their order history on the account page.
![image](https://i.imgur.com/uAnP34q.png)

*Users can create reviews on products and view them publicly on the product information page.
![image](https://i.imgur.com/WVEZrpE.png)
![image](https://i.imgur.com/XgPiWiy.png)

### Contact Information
Have any questions or want to start a conversation? Contact Allen Pham at any of the options below:
* Email: Allendpham@gmail.com
* [LinkedIn](https://www.linkedin.com/in/allen-pham/)

### Future Features
* A fully functional search filter to allow users to search for items 
* Ability to view recipes that involve products
* Ability to submit questions about products similar to reviews
