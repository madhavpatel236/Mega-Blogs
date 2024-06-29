# Sources we used in this Project

( i ) Backend: For the Backend services we use the `appwrite` services.

( ii ) Form Heandling: For form Heandling we use the `React Hook Form.`

( iii ) Parshing : In the appwrite services we have store a data in the html form and html doen not render in the web pages so we need to parsh them, for that we use the `html-react-parser.`

( iv ) Text Editor : For the text editor we use the `TinyMCE` react component. 


# Create Appwrite Services

After Creating the project in the appwrite services,

    -> continue to create a database.
     
    -> in the databse we have to create a collection in the database section (in the collection part we need to change the some setting accroding to the project).

    -> Now we need to add the Attribute in the Collection, Attribute is nothing but the basic items we used in our project with the help of the appwrite services.(in this projects our attribute is `title, content, featuredImage, status, userId`).

    -> Create the index in the collection.

    -> Now we Create the Storage Service for storing the images and files in the storage service.

- After setup the appwrite services we need to create the `.env` file in our project source code  and in this file we need to set all the environment variable.
For our Project we need : 
VITE_APIWRITE_URL, 
VITE_APIWRITE_PROJECT_ID, 
VITE_APIWRITE_DATABASE_ID, 
VITE_APIWRITE_COLLECTION_ID, 
VITE_APIWRITE_BUCKET_ID

 ### Note: .env file does not uplode in any platform like github or any where

- After updating the .env variable we will need to save this in the one object because some times if we directly use the .env variable then not work properly so for that we have to create a single object and inside it we can add all the environment variables.
 In Our Project we will create a saperate file at `src > conf > conf.js.`

# Authentication using the Appwrite Services

-> For use the appwrite services we will need to install the `appwrite` npm package in our project source code.

```
npm i appwrite
```
- Now we can use the appwrite authentication as well as other services in out project, Now From the appwrite Documentation we can use all the property https://appwrite.io/docs/references <br> <br>  In this project i used the authentication property in much optimize way so that it will easy for you to understand and also make your code more readable. ` src > appwrite > auth.js `

- Now after the authentication portion we will implement or build the configurtion part of our project. for that i was learned from the documentaion. 

In our case we have many config like createPost, deletePost, updatePost, getPosts, uplodeFiles etc. ` src > appwrite > config.js `