# Steps how I build the backend
1. Create
   1. Folder
   2. git path
   3. package.json
   4. gitignore
2. Installed Express and dotenv
3. Created a config folder with a env file that is not in the repo.
4. Installed Nodemon
5. Created a listening port.
6. Mongo Website: Created a database for Alien Budgets.
7. Test server response with simple USER routes
8. Create Route files to make it simpler.
9. Create Controller files.
10. Setup Middleware & Morgan
11. Setup Mongoose and Connect Database
12. Create Student routes, controllers, and model.
13. Create Custom ErrorHandler
14. Create custom Messages for Errors
15. Create asyncHandler to make it DRY
16. Created Seeder file to add fake data
17. Added Query, select, and Sort functions to student
18. Add Pagination to Students
19. Create seeder for avatar. Refactored seeder for students to add avatars. Removed randomAnimal NPM package
20. Refactored seeder for Adult Avatars. Refactored Pagination to show more information.
21. Refactored reusable filteredResults
22. Add auth route and controller. Add Register User
23. Add Token to user when registering.
24. Add Login to Adult and Student
25. Add token in a cookie for browser
26. Add protected route to /me. Still need to modify protection to be only see students based on classCodes.