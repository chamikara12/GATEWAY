# Gateway - Vehicle & Gate Pass System

This is a MERN stack application designed to manage vehicle entries, exits, and gate passes for a university or organization. It includes dashboards for Administrators and Security Officers.

## Features

*   **Admin Dashboard**:
    *   Manage Users (Security Officers, Admins).
    *   Approve/Reject Gate Passes.
    *   View Reports and Analytics.
    *   Manage Vehicles.
*   **Security Dashboard**:
    *   Record Vehicle Entries and Exits.
    *   View Visitor Logs.
    *   Scan QR Codes (planned/integrated).

## Prerequisites

Before running the project, ensure you have the following installed:

*   **Node.js** (v14 or higher)
*   **MongoDB** (Local instance running on `mongodb://localhost:27017/gatePass`)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/anushika32/GATEWAY.git
    cd GATEWAY
    ```

2.  **Install Dependencies**:
    The project uses a single `package.json` for both frontend and backend configurations.
    ```bash
    npm install
    ```

## Running the Application

You need to run both the backend server and the frontend React application.

### 1. Start the Backend Server
The server runs on port **5000** and connects to the local MongoDB instance.
```bash
npm run server
```
*   Ensure MongoDB is running locally before starting the server to avoid connection errors.
*   The backend entry point is `Database/index.js`.

### 2. Start the Frontend
The React application runs on port **3000**.
```bash
npm start
```
*   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Login Credentials

Use the following default credentials to access the system:

### **Admin Login**
*   **Role**: Admin
*   **Username**: `admin`
*   **Password**: `admin123`
*   *Note: Administrative access for managing the system.*

### **Security Officer Login**
*   **Role**: Security
*   **Username**: `security`
*   **Password**: `security123`
*   *Note: Operational access for recording entries/exits.*

## Project Structure

*   `src/`: React Frontend source code.
    *   `src/components/`: Reusable UI components and Dashboard views.
*   `Database/`: Express Backend source code.
    *   `Database/Router/`: API Routes.
    *   `Database/controller/`: Route controllers/logic.
    *   `Database/model/`: Mongoose data models.

## Troubleshooting

*   **MongoDB Connection Error**: If the server fails to connect to MongoDB, ensure your local MongoDB service is active. The app handles connection failures gracefully but backend features will not work without it.
*   **Port Conflicts**: Ensure ports 3000 (React) and 5000 (Express) are free.

## License

[MIT](LICENSE)
