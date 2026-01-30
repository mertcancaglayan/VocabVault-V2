# VocabVault V2

VocabVault V2 is a vocabulary learning application designed to help users master new words through various interactive modes.

## Features

-   **Flashcards**: Learn words with digital flashcards.
-   **Quiz Mode**: Test your knowledge with quizzes.
-   **Matching Mode**: A game-like mode to match words with their meanings or translations.
-   **Admin Panel**: A dedicated interface for managing vocabulary content.

## Tech Stack

**Frontend:**
-   React
-   Vite
-   TypeScript
-   Tailwind CSS (via `index.css`)

**Backend:**
-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

## Project Structure

-   `frontend/`: The React client application.
-   `backend/`: The Node.js/Express API server.
-   `admin/`: Simple HTML/JS admin dashboard for word management.

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (Local or Atlas)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your MongoDB connection string and port:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### Admin Panel
