# Text-Search

Text-Search is a project developed under the DictateMD organization. It allows users to search for specific text within a dataset.

## Steps to run the project

1. Clone the project repository to your local machine.

2. Navigate to the project directory in the terminal.

3. ### Client

   - Go to the client directory:
     ```bash
     cd client
     ```

   - Install the dependencies:
     ```bash
     npm install
     ```

   - Run the client:
     ```bash
     npm start
     ```

4. ### Server

   - Go to the server directory:
     ```bash
     cd server
     ```

   - Install the dependencies:
     ```bash
     npm install
     ```

   - Before running the server, make sure you have created a `.env.local` file in the server directory and add the following variables in it:
     ```bash
     DATABASE_URL=<YOUR_MONGODB_URL>
     ```

   - Run the server:
     ```bash
     node index.js
     ```

   Note: Replace `<YOUR_MONGODB_URL>` with your actual MongoDB connection URL.

5. Open a web browser and visit `http://localhost:3000` to access the Text-Search application.

Feel free to explore and search for specific text within the dataset!

