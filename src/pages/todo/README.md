# How to do To-do

## Objective
The goal is to have a simple To-do list that does the following
- Add reminder
- Delete reminder
- Complete reminder
- View existing reminder

## Database
All reminders are stored in the dynamodb table, `Reminder`.
|Id|Item|complete|createdAt|
|-|-|-|-|
|string|string|boolean|num|

## Processes
Once the To-do page is up and running and available on https://the-everything-will.vercel.app/todo. The first thing that crossed my mine was how easily can anyone just come in here and create chaos
### List of potential issues
1. API Flooding (No rate limiting)
    - Overwhelm the server with requests, causing Denial of Service 
    - Rapidly consume the AWS resources, potentially leading to high costs, oh boy, the money
    - Slow down the application for legitimate user, yes, it is just me right now
2. Unauthorized Access (No user authentication/authorization)
    - Access and manipulate any user data
    - Perform actions on behalf of other users
    - Potentially access sensitive information if present in system
3. Injection Attacks
    - Insert malicious scripts (Cross-Site Scripting or XSS)
    - Manipulate database queries (SQL injections)
    - Store malicious content that could affect other users
4. Data abuse (No maximum length restrictions)
    - Store extremely large amounts of data, causing storage issue
    - Create overly long todo items that could break the UI layout
    - Potentially use the storage for hosting illegal content
5. Resources exhaustion
    - Create excessive number of todos, potentially exhausting database resources
    - Slow doesn the application for all users due to large data sets
    - Increase AWS costs significantly due excessive data storage and transfer

Okay, let's address them

To buy time, let's restrict access to the page

### Add http basic auth in middleware
User will be requested to enter username and password to access To-do and URL shortener page
