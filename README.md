
### -Deply-local-Nodejs-web-app-to-Aws

##Basic Introduction
The code is written in **Nodejs, Express, Ejs (template engine) and [Sequelize](https://sequelize.org/)(with Postgres)**. The code is deployed and hosted on AWS lambda with AWS RDS database and [NodeJs Serverless Framework](https://www.serverless.com/framework/docs/guides/sdk/nodejs).

### - Create AWS RDS instance

    1. Login to your AWS account
    2. Create RDS instance from database services(free tier) with Postgres. (i.e. database-instance1)
    3. In Additional information give your database a name.
    4. Allow public access to your database
    5. Let remaining settings be default. After creating RDS instance save the endpoint into clipboard. (You will host your db on this host)

### - Migrate your local database to 
  
    1. Take the backupfile from local database. Add .sql at the end of the backup file (demo_backup.sql) and custom format.
    2. Create a new server in postgres (i.e. aws_rds)
    3. In the connection tab in hostname/address add the RDS endpoint from AWS.
    4. You will see the database under the aws_rds. Now restore the database with the demo_backup.sql
  
 For Reference [How to Migrate Local PostgreSQL Database to AWS RDS](https://www.youtube.com/watch?v=Vi44UHVYWEg)
 
### - Deploy your Nodejs app to AWS through CLI using serverless framework

First open the terminal for your project.Install Serverless Framework in your project using following commands

    1.  npm install -g serverless
    2.  serverless create -t aws-nodejs

Now you have to configure your serverless to aws using access and secret keys. 
  
    3. serverless config credentials -provider aws -key <key> -secret <secret-key>
  
This will create a serverless.yml and handler.js in your project. In serverless.yml you will see your provider as aws. You can define the stages for api gate under the provider as **stage:dev**. As well you have you define all your .env variables into yml file under this section as 
    
    provider:
      name: aws
      timeout: 30
      stage: dev
      runtime: nodejs12.x
      environment:
        STAGE: dev
        
 The handler.js file contains the lambda function. In order for lambda to invoke there must be some event. So in order to create an http event we define it in serverless.yml file under the function section 
    
    
    functions:
      hello:
        handler: handler.hello
        events:
          - http:
              path: /{proxy+}
              method: ANY
              cors: true
          - http:
              path: /
              method: ANY
              cors: true
              
The /{proxy+} defines the endpoint for your application. You can check the following in API GATEWAY of your account.
Now in handler.js we have to create the serverless-http request. For that run the following command
      
      4. npm install serverless-http
 
 Now replace the handler.js file with following commands

    'use strict';
    const app=require('./app')
    const serverless=require('serverless-http');
    module.exports.hello=serverless(app);
 
 - You are all set to deploy your app to aws with serverless deploy command
      
       5. serverless deploy
    
- ( IMP ) Make sure to module.exports=app ( in your app.js file ) and replace the host of your database with the RDS endpoint.
- ( ADDITIONAL ) In the package.json file you can add the following line under the scripts section *"deploy": "serverless deploy"* . Now you can deploy you app with following command

      6 .npm run deploy
