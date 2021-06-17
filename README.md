# Reward-calculator-Konstantin-Kotenko-assesment-test

    Author: Konstantin Kotenko
    Date: 06/17/2021
    Purpose: This is an assessment test task, for the position of React developer. 
    Requirements:
    A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
    A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction 
    (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
    Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.
    · Use React JS.
    · Make up a data set to best demonstrate your solution.
    · Check solution into GitHub and email to the recruiter. 
---------------------------------------
Comment: Since the requirements were focusing more on math operation with external data, I created a local json file with mock
user accounts and transaction activities for 3 months (Jan, Feb, Mar) rel path: (database\data.json). 
In this app / component I decided not to focus on events and not to manipulate DOM, (I already have a separate project that utilizes complex 
DOM manipulation, with event handlers, synthetic events, etc.)

When component did mount data called and set as state, and rendered to dom based on the required logic.
App accepts only numeric data in the transactions portion of json file (money amounts with two decimal places). 
If invalid data is detected in json file, the error message will be logged in to the console. 
If database grows app responds gracefully and adds new users / profiles to the calculation as long as the structure of json file remains the same.

Style: I used a template from a previous project with bootstrap plugged in. 

Note: In the Transaction columns each transaction amount separated by comma.
In order to implement table layout in HTML as fast as possible I used an excellent tool: https://www.tablesgenerator.com/html_tables#
