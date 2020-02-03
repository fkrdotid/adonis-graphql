## What Is This ?
This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

## How do I get setup ?

* Install Node.js >= v8.6.0

* Install npm >= v5.3.0
    
* Install project dependencies:
    
    - Install all dependencies defined in package.json:
    
        `npm install`
    
* Setup environment variables

    This project uses [dotenv](https://www.npmjs.com/package/dotenv), please configure the proper environment variables before running this application.
    
    - Copy the `.sample-env` file and rename it to `.env`
    - Edit all sample fields with the correct environment variables for the application server
 
* Migrations
    - Run the following command to run startup migrations.
        `adonis migration:run`

* Install pm2 
    
    - Install pm2 dependencies
        `sudo npm install pm2 -g`

* Deployment instructions

    `pm2 start server.js`
    
 * URL End Point

    [doc list end point](https://drive.google.com/open?id=1eH41oaDriCIsdTdDdR1V6fvXCycwW3w4 "URL END POINT") 



## Documentaion Adonis JS ##

[Adonis JS](https://adonisjs.com/docs/4.1/installation)
