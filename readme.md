# DESCRIPTION
## Project Overview

This project is centered around the development of a feature-rich Todo Task Application. Within this application, users are empowered to manage their tasks with ease. Key functionalities include task creation, updates, deletions, and task sharing among users via email. The user journey encompasses a seamless flow: from account creation, email verification, and login to task management.

## User Journey

### 1) User Registration and Verification

Users initiate their journey by signing up for an account.
To ensure security and authenticity, account verification via email is an essential step.

### 2) User Login

After successful verification, users log in to access their accounts.

### 3) Task Management

Once logged in, users are greeted with a Todo page.
Here, they can create new tasks and effortlessly manage their existing ones.
Task updates and deletions can be performed with ease.

### 4) Task Sharing

Collaboration is made simple through the ability to share tasks with other users.
Task sharing is achieved by providing the recipient's email address.

### 5) Task Viewing

Users can conveniently view their own tasks and those shared with them.
This fosters efficient task tracking and teamwork.

### 6) Logout

The application offers user-friendly navigation, including an easy way to log out when needed.



# FOLLOW THIS STEP TO RUN THE CODE

*1. Set Up AWS Amplify:*

- Install the AWS Amplify CLI if you haven't already: `npm install -g @aws-amplify/cli`.
- Initialize a new Amplify project: `amplify init`.
- Follow the prompts to configure your Amplify project, including the AWS region and authentication settings (use AWS Cognito).

*2. Create a GraphQL API:*

- Run `amplify add api` to create a GraphQL API using AWS AppSync.
- Define the data model for your tasks in the GraphQL schema. Ensure it includes fields like task name, ownerID, and sharedWith (an array of user emails).
- Implement GraphQL resolvers for CRUD operations on tasks, including create, read, update, and delete.
- Implement authorization rules in the GraphQL schema to restrict access to tasks based on the owner's ID.

*3. Set Up AWS Lambda Functions:*

- Create AWS Lambda functions to handle specific serverless tasks. For example, you can create a Lambda function to send email notifications when a task is shared.

*4. Build the React Frontend:*

- Create a React frontend for your todo app. You can use `create-react-app` or any other React boilerplate.
- Use the `aws-amplify` library to interact with your GraphQL API for tasks.
- Implement React components for creating, reading, updating, and deleting tasks.
- Add user authentication using AWS Cognito, and ensure that only authenticated users can access the app.

*5. Task Sharing:*

- Implement a feature that allows users to share tasks with other users by specifying their email addresses.
- Ensure that the sharing functionality updates the `sharedWith` field in the task's data in the GraphQL API.

*6. Authorization:*

- Configure AWS Cognito to allow only authorized users to access the app `amplify add auth`.
- Set up fine-grained authorization rules in your GraphQL schema to control access to tasks based on ownership and sharing.

*7. Testing:*

- Test your app thoroughly to ensure that tasks can be created, updated, deleted, and shared as expected.
- Verify that only authorized users can view tasks.


*8. Deployment:*

- Deploy your frontend using the Amplify Console by `amplify add hosting` then `amplify add publish`.

This is the link to the Github rep for the codebase :- https://github.com/Balosod/todo_task
This is the link to the website :-https://dev.d2jzw23kp3iveu.amplifyapp.com

