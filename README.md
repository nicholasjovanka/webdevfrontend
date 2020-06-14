# WADS-FP
Final Project for COMP6343 – Web Application Development and Security 

Group Member:
- Nicholas Jovanka : 2201798446
- Rino Santoso : 2201798736

## Front-End:
  For the website Front-End my group uses the Angular Framework as the Angular framework is one of the oldest framework out there and it      provides many external packages that helps for the final project. 
  List of Modules used for the Frontend:
  - Angular Material
  - Angular FlexLayout ( https://github.com/angular/flex-layout)
  - Angular Password Strength ( https://github.com/angular/flex-layout)
  - Ngx Youtube Player (https://www.npmjs.com/package/ngx-youtube-player)
  
 
 ## Features:
 - User Creation and Email Verification
 - Display Information about Games such as their the brief game description, Game Video (Using Youtube) , and Game Image
 - Review system for the game where the users can rate the game along with their consensus about the game
 - See available review score from games that are from steam (Using the steam api)
 - See whether or not a game is released or not
 
 ## Website Workflow
 
 ## Non Users:
 - Non users can just open the website normally and use see the game reviews by either searching for the game through the search bar or by going through the game list and clicking on one of the game inside the list
 
 ## Users:
 - In order to give reviews User must register first
 - To register click on the userbar icon on the top right of the navbar where the userbar will appear and the user can either login or register from there by clicking one of the buttons
 - After registering, log in to your account and you shall be redirected to the verified page where you need to click the send email verification button to get the verification email.
 - If after veryfing the browser doesnt redirect just type in the threviews.me and the website will redirect back to the home page by typing threviews.me
 - Users can give review of a game by going to the game page and scrolling down to the review tab.
 - User can later edit or delete their review.
 
 ## Admin
 - To register as an admin first register an account and verifying the email
 - Then you must manually set the userType to admin in the mysql manually for the desired user
 - Then you can go to threviews.me/admin in order to go to the admin page after you log in
 - In admin page you can add a game by using the add a game button or edit/ delete a game by first clicking on the game that you want to edit or delete in the table
 - For Adding a game the only required field is the gamename and the game description
 - You can also see the list of reviews of the game by pressing the see comments button in the editgame page

## Admin Controls
- Add Game
- Edit Game
- Remove User Reviews

## Optimization:
- All Modules here uses lazy loading which reduces initial load speed
- This project only uses angular material and angular flex layout so its lightweight

## Website Design:
 All website is design is manually made with some exception as using the styling that comes with angular material indigo pink theme
 
## Backend:
   Backend for the project is located here https://github.com/nicholasjovanka/laravelfinalproject. This project implements the resful api from the backend to the frontend
