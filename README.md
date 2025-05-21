# Plena Task

This repository is a task given by Plena Finance.

## Initialize

This project employ s RabbitMQ for event driven behavior. Along with it, the project employs Redis and MongoDB as well.

To start these services, there is a docker-compose.yaml file in the root folder which will start all the services. You can spin it up using below command.
```
docker-compose up
```

Once started, you can then run the two services
1. access-key-management-service
2. web3-token-information-service

Steps to run:
1. Go into each folder and run ``npm install``
2. Copy ``.env.example`` to ``.env`` 
3. Run ``npm run start:dev`` and then you should be able to run the APIs.

## Postman Collection

There is a Postman export JSON in the root folder, import the JSON file to your project. 

You will find two folders in the collection for both the services. Following are the APIs with the sequence with which the ideal flow should happen:
1. Access Key Management Service
    1. User
        1. Get Access Key Details (3)
        2. Update Access Key Status
    2. Admin
        1. Create Access Key (1)
        2. Get Access Keys (2)
        3. Update Access Key
        4. Delete Access Key
        5. Fetch Logs
2. Web3 Information Service
    1. Token
        1. Get Token Details (4)

## Generate Admin JWT Token

Use the below JWT Token for Admin APIs
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJjMzY1ZjBjOTQ4MTA4NDBmZTk1ZGEiLCJpYXQiOjE3NDc3MzI3MTAsImV4cCI6MTc3OTI5MDMxMH0.97Vdfxit_uAp1o4lbqq6xIactKgy8v0RM88kequWheM
```
In any case, if this JWT Token doesn't work, you can generate a new token using the generate-admin-jwt script.
```
$ cd generate-admin-jwt

$ npm i

$ npm run generate
```
This should log a new JWT Token which you can use for Admin APIs.

## Project Structure
![Project Strucutre](./image.jpg)
### Access Key Management Service
This service has 5 modules
1. Access Key Module
2. Admin Module
3. Logs Module
4. Message Broker Module
5. User Module

#### APIs
Admin, User expose APIs as per requirements in the task.

#### Guards
1. Admin controller is protected by AdminAuthGuard which verifies Admin JWT Token. 
2. User controller is protected by the AccessKeyGuard which only checks if a token is provided in ``x-api-key`` header or else it blocks the request. 

### Web3 Token Information Service
This service has 2 modules
1. Access Control Module
2. Token Module

#### APIs
1. Access Control Module does not expose APIs but accepts RabbitMQ events sent by AKMS.
2. Token Module exposes APIs as per requirements of the task.

#### Guards
1. Token Module is protected by AccessKeyGuard which employs Access Control Service to check if a token is valid and within the rate limit. The same uses logs service to send logs.
