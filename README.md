# Express.js Timestamp File Creator

This project is an Express.js application that provides two main functionalities:
1. Create a text file with the current timestamp.
2. List all text files in a specified directory.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
## Setup

1. Clone the repository or download the source code.

    ```bash
    git clone https://github.com/AKASH021001-0202/nodejs-file-system
    cd express-timestamp-file-creator
    ```

2. Install the dependencies.

    ```bash
    npm install
    ```

3. Start the server.

    ```bash
    npm start
    ```

    By default, the server runs on `http://localhost:3000`.

## API Endpoints

### Create a Text File

**Endpoint:** `POST /create-file`

**Description:** Creates a text file in the `textfile` directory with the current timestamp as the file name and the file content.

**Response:**

- **Success:**
    ```json
    {
        "status": "success",
        "message": "File created successfully at textfile/2024-05-31T17-29-31-563Z.txt",
        "fileName": "2024-05-31T17-29-31-563Z.txt",
        "content": "2024-05-31T17:29:31.563Z"
    }
    ```
- **Error:**
    ```json
    {
        "status": "error",
        "message": "Failed to create file",
        "error": "Error message"
    }
    ```

### List All Text Files

**Endpoint:** `GET /list-files`

**Description:** Retrieves a list of all text files in the `textfile` directory.

**Response:**

- **Success:**
    ```json
    {
        "status": "success",
        "message": "Files retrieved successfully",
        "files": ["<--timestamp-->.txt"]
    }
    ```
- **Error:**
    ```json
    {
        "status": "error",
        "message": "Failed to retrieve files",
        "error": "Error message"
    }
    ```


## Directory Structure

