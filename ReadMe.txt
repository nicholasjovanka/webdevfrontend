Documentation:

For the Backend:
Dependencies: - Requires Passport
	      - Requires Intervention  Link: http://image.intervention.io/

For the Frontend:
Dependencies: - Angular Material
              - Angular Flex Layout : https://github.com/angular/flex-layout
	      - Angular password Strength : https://www.npmjs.com/package/@angular-material-extensions/password-strength

How to use the web application:
- For Non Users:
	 - Non Users can just open the website and browse for games either use the game list or the search bar.	
- Users: 
	-  Users must first register by clicking on the picture that is located on the top right in the navbar where there will be dialog where there is the 
	  login and register button
	-  Register the user
	-  After registering the user can login and will be redirected to a verify email page where they can press the verify email button in order for the verification email to be sent
	- Users who have been verified can access the website normally and give review on games
- Admin: Admin can access the admin page by accessing threviews.me/admin
	- Admin can add , edit , and delete games;. Add games by clicking the add game button and Edit or delete games by pressing the game name in the table list
	- Admin then in the editpage can edit the game, delete the game,  and also see all the available reviews by clicking the see comments button.	

Admin user type must be manually assigned through the mysql console by changing the user type into 'admin' (case sensitive)	