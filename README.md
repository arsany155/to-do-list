In Backend :
run "npm install" to install the packages
put in MONGO_URI that is inside the .env file your database connection 

In Frontend :
run "npm install" to install the packages

If the program doesn't work with use , please check multiple thing :
1- the cors connection
2- Port that the server working on it 
3- if the frontend doesn't get the data try again this command in the backend "prisma generate"
4- DataBase connectoin (mongodb)


to run the Backend ---> "npm start"
to run the Frontend  ----> "npm run dev"

you will see the Models file that use with mongoose beacuse i made the Backend and finish all the code before adding Prisma.js , But
after adding Prisma there is file called schema.prisma inside folder Prisma .... you will find the new models (task , user) based on the files that are inside Models folder
so i keep the code and not deleting it because if anyone want to use mongoose instead of Prisma.js

****It was the first time to work with Prisma.js****
