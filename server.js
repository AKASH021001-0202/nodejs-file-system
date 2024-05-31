import express from 'express';
import fs from 'fs';
import path from 'path';

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const folderName = 'textfile';

    // Logic to create a folder if it doesn't exist
    if (!fs.existsSync(folderName)) {
        try {
            fs.mkdirSync(folderName);
            console.log("Successfully created folder:", folderName);
        } catch (error) {
            console.error("Error creating folder:", error);
            return res.status(500).send({
                status: 'error',
                message: 'Failed to create folder',
                error: error.message
            });
        }
    } else {
        console.log("Folder already exists:", folderName);
    }

    // Logic to create a file with the current timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replace colons and dots
    const fileName = `${timestamp}.txt`;
    const filePath = path.join(folderName, fileName);
    const content = new Date().toISOString();

    console.log("Attempting to write file at path:", filePath); // Log file path

    try {
        fs.writeFileSync(filePath, content);
        console.log("File created successfully:", filePath);

        // Send response
        res.send({
            status: 'success',
            message: `File created successfully at ${filePath}`,
            fileName: fileName,
            content: content
        });
    } catch (error) {
        console.error("Error writing file:", error);
        res.status(500).send({
            status: 'error',
            message: 'Failed to create file',
            error: error.message
        });
    }
});

// API endpoint to retrieve all text files in the folder
app.get('/list-files', (req, res) => {
    const folderName = 'textfile';

    try {
        // Logic to list all text files in the folder
        const files = fs.readdirSync(folderName).filter(file => file.endsWith('.txt'));

        // Send response
        res.send({
            status: 'success',
            message: "Files retrieved successfully",
            files: files
        });
    } catch (error) {
        // Send error response
        res.status(500).send({
            status: 'error',
            message: 'Failed to retrieve files',
            error: error.message
        });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
