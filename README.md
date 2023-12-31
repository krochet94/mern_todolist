# Todo List w/ Authentication using MERN Stack

## Description

A simple todo list project with user authentication using MERN (MongoDB, Express, React.js and Node.js) Stack and Material UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed
- [Yarn](https://www.npmjs.com/package/yarn) installed

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/krochet94/mern_todolist.git
   ```
   <br>


2. Navigate to the project directory:

    ```
    cd mern-todolist
    ```
    <br>

3. Install dependencies:

    ```
      yarn install
    ```
    <br>

4. Install MongoDB:
      <br>
    - macOS: You can use [Homebrew](https://brew.sh/) to install MongoDB:

      ```
      brew tap mongodb/brew
      brew install mongodb-community
      ```
      <br>
    - Windows: Download the MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community) and follow the installation instructions.
      <br>
    - Linux: Refer to the [MongoDB installation guide](https://www.mongodb.com/docs/manual/administration/install-on-linux/) for your specific distribution.
    <br>

5. Configure your application:

    - Create a .env file in the project root and set environment variables for DB_LOCAL_URI. For example:

      ```env
      DB_LOCAL_URI=mongodb://localhost:27017/test
      ```
    - If you want to also change the variable name just make sure to modify your application code to use process.env to access these environment variables.
    <br>

6. Load initial data / unit test.
      ```
      yarn run seeder
      ```
      <br>

7. Open 2 terminals to start the application:
    - Terminal 1: 
      ```
      yarn start
      ```
    - Terminal 2
      ```
      yarn run server
      ```
    <br>

## Testing
  - Username : <b>testuser</b>
  - Password : <b>testuser</b>
  <br>
## Usage

  1. Navigate to register page and register username and password. (optional)
  2. After successful registration, login using the credentials. Or you can use the test username and password to login.
  3. Navigate to the Todolist page.
  4. Add new tasks, filter them according to status of completion, make them finished by clicking the check icon and the undo icon to revert back.
  5. Navigate to the Account Details page.
  6. Check, edit and save new account's username and/or password.
  5. Logout.
  <br>

## License

  - ISC



