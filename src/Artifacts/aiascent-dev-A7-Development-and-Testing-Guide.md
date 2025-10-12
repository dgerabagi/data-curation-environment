# Artifact A7: aiascent.dev - Development and Testing Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A step-by-step guide explaining how to run, debug, and test the `aiascent.dev` website locally.
- **Tags:** template, cycle 0, documentation, project setup, nextjs

## 1. Purpose

This guide provides the standard procedure for running, debugging, and testing the **aiascent.dev** website locally.

## 2. Development Workflow

### Step 1: Install Dependencies

Ensure all project dependencies are installed using npm. Navigate to the project root (`C:\Projects\aiascent-dev`) in your terminal and run:
```bash
npm install
```

### Step 2: Start the Development Server

To compile the code and watch for changes with hot-reloading, run the following command:
```bash
npm run dev
```
This will start the Next.js development server.

### Step 3: Running the Application

Once the development server is running, you will see a message in your terminal, typically:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```
Open a web browser and navigate to **`http://localhost:3000`** to view the application.

### Step 4: Debugging

You can use the browser's developer tools to debug the frontend application. You can set breakpoints directly in your source code within the "Sources" tab of the developer tools.

## 3. Testing

The project will be configured with a testing framework (e.g., Jest and React Testing Library). To run the test suite, use the following command:
```bash
npm run test
```
This will execute all test files located in the project and report the results to the console.