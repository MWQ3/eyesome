Glasses Ecommerce Website: EYESOME

Welcome to the Glasses Ecommerce website! This project is a practice ecommerce website designed to sell glasses. Below you'll find information on how to set up and run the website, as well as key features and technologies used.

Key Features
User authentication: Users can sign up and sign in securely to access features such as adding items to their wishlist and bag.
Wishlist and Bag: Users can add or remove items to their wishlist and bag, making it convenient to track desired products.
Responsive Design: The website is designed to be responsive, ensuring a seamless user experience across different devices.
Technologies Used
Frontend: React.js, Redux Toolkit, Axios, JWT for authentication.
Backend: Node.js, Express.js, MongoDB with Mongoose for data storage, Bcrypt for password hashing.
Development Tools: Create React App for frontend setup, Nodemon for automatic server restarts during development.
Getting Started
Follow these steps to set up and run the Glasses Ecommerce website:

Clone the Repository: Clone this repository to your local machine using:
```git clone <repository_url>```

Install Dependencies: Navigate to the project directory and install the necessary dependencies for both frontend and backend:
```
cd glasses-ecommerce
npm install
cd client
npm install
cd ..
```

Set Environment Variables: Create a `.env` file in the root directory and add environment variables for MongoDB connection, JWT secret, etc.
Run the Application: Start both the frontend and backend servers simultaneously using:

```npm run dev```

Access the Website: Open your browser and navigate to `http://localhost:3000` to access the Glasses Ecommerce website.

Additional Information
Ensure MongoDB is running locally or provide a remote connection URI in the environment variables for database connectivity.
Make sure to replace placeholder values in the .env file with your actual configuration details.
For detailed API documentation, refer to the backend code and API routes.
That's it! You're now ready to explore and test the Glasses Ecommerce website. If you have any questions or encounter any issues, feel free to reach out.
