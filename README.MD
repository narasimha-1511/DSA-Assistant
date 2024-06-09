# Narasimha's DSA Assistant
## Overview
Narasimha's DSA Assistant is a monorepo project designed to help users with data structures and algorithms (DSA) problems. The application consists of a frontend built using Vite and a backend built with Express and the Gemini API. Users can submit LeetCode problem links and their specific doubts, receiving guidance and hints from a GPT-based teaching assistant.

## Project Structure
The project is organized as a monorepo with two main directories:
- `frontend`: Contains the Vite-based frontend code.
- `backend`: Contains the Express server and integration with the Gemini API.

## Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Installation

### Fork the Repository
1. Navigate to the [repository on GitHub](https://github.com/yourusername/narasimhas-dsa-assistant).
2. Click the "Fork" button in the top-right corner to create a copy of the repository in your GitHub account.

### Clone the Repository
1. Open your terminal.
2. Clone your forked repository:
    ```sh
    git clone https://github.com/your-username/narasimhas-dsa-assistant.git
    cd narasimhas-dsa-assistant
    ```

### Install Dependencies
#### For Frontend
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

#### For Backend
1. Navigate to the `backend` directory:
    ```sh
    cd ../backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

## Development

### Running the Frontend
Navigate to the `frontend` directory and start the development server.
```sh
cd frontend
npm run 
```
This will start the Vite development server and you can access the frontend at http://localhost:5173.

### Running the Backend
Navigate to the `backend` directory and start the Express server.
```sh
cd backend
npm start
```
This will start the Express server and you can access the backend at http://localhost:3000.

## Usage
1. Open the frontend in your browser at http://localhost:5173.
2. Submit a LeetCode problem link and your specific doubts.
5. Check on the Custom Doubt to ask any specific doubts.
3. Receive guidance and hints from the GPT-based teaching assistant.

You can also use the Application here [Narasimha's DSA Assistant](https://assignment-ebon-theta.vercel.app/)

## Project Architecture

### Frontend
* Vite : is used as the frontend build tool, providing a fast and modern development experience. The frontend is built using **React**.
* Components: The frontend is organized into components that handle different parts of the user interface.

The main component in the frontend is the chat box.
* Chat Box: The chat box component is responsible for rendering the chat interface and handling user interactions. It sends user messages to the backend and displays responses from the GPT-based teaching assistant.

### Backend
* Express: is used as the backend server framework, providing a simple and flexible way to build APIs.
* Gemini API: The backend integrates with the Gemini API to interact with the GPT-based teaching assistant.

The main routes in the backend are:
* `/api/custom` `POST` : Handles custom doubts submitted by the user.
    
    * Body parameters:
        * `message`: The user's custom doubt message.
        * `leetcode question`: The LeetCode question link submitted by the user.


* `/api/prepromt` `POST` : Handles the selected Options given by the user such as Intuition, Hints , and Pseudocode.

    * Body parameters:
        * `message`: The user's selected option
            * `Intuition`
            * `Hints`
            * `Pseudocode`
        * `leetcode question`: The LeetCode question link submitted by the user.


* `/api/continue` `POST` : Handles the user's response to the GPT-based teaching assistant.

    * Body parameters:
        * `message`: The user's response to the GPT-based teaching assistant.
        * `history`: The conversation history with the GPT-based teaching assistant.

## Environment Variables
The backend requires the following environment variables to be set:

* `GOOGLE_API_KEY`: The API key for the Gemini API.

* `ALLOWED_ORIGINS`: A comma-separated list of allowed origins for CORS.

     For example, `http://localhost:5173`.

The frontend requires the following environment variables to be set:

* `VITE_BACKEND_URL`: The URL of the backend server.

     For example, `http://localhost:3000`.


## Deployment
The frontend and backend are deployed separately on Vercel.

Link to the Application: [Narasimha's DSA Assistant](https://assignment-ebon-theta.vercel.app/)


## Promts Used


* `Custom Doubt`

    ```
    Here is the LeetCode question along with the doubt I have:
    ${leetcodeQuestion} 
    ${doubt}
    ```
* `Intuition`
    ```
    I'd like to gain a deeper intuition on how to approach solving the following LeetCode question:
        ${leetcodeQuestion}
        Can you provide a high-level overview or strategy for tackling this problem?
    ```
* `Hints`
    ```
    I'd appreciate some hints or guidance on how to approach solving the following LeetCode question:
        ${leetcodeQuestion}
        Could you provide some hints or strategies to get started?
    ```
* `Pseudocode`
    ```
    I'm looking for a pseudocode representation to solve the following LeetCode question:
            ${leetcodeQuestion} 
            Could you provide a step-by-step algorithm or pseudocode for this problem?
    ```

These are the Basic Prompts used , we can add more prompts to make the application more interactive.