# Meowzza Project

Meowzza is single page marketplace application for exotic cat adoption. We have used ES6 serverside (NodeJS) code and express to impliment restful routes. Our database was built using PostgreSQL DBMS and pg (with promises). On the front end we used jQuery to manage user interaction and the Material Design library as well as SASS to style our app. Whave utilized the Twilio API to allow users to send text messages to Admin. Please note that we have commented out the twilio related code in server.js, please uncomment and add your own twilio credentials to make use of this feature.  

## Final Product

!["featuredCats"](https://github.com/AtaAnsari/meowzza/blob/master/docs/featuredCats.png)
!["msgingFeature"](https://github.com/AtaAnsari/meowzza/blob/master/docs/msgingFeature.png)
!["catCards"](https://github.com/AtaAnsari/meowzza/blob/master/docs/catCards.png)
!["addNewCatForm"](https://github.com/AtaAnsari/meowzza/blob/master/docs/addNewCatForm.png)

## Dependencies

- body-parser  
- chalk  
- cookie-session  
- dotenv  
- ejs 
- express 
- flickity 
- material-components-web   
- morgan 
- node-sass-middleware 
- nodemailer 
- pg 
- pg-native 
- twilio 

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` command.
- Reset the database before running the app, by using the following command in your terminal: npm run db:reset

## Authors: 

Liubov Kleimenova, Steven Choi, Ata Ansari 
