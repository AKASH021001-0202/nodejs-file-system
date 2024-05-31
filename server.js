import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
const port = 3000;


app.use(express.json());

// create file
app.post('/create-file', (req, res) => {
    const folderName = 'textfile';

    
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

    // create a file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
    const fileName = `${timestamp}.txt`;
    const filePath = path.join(folderName, fileName);
    const content = new Date().toISOString();

    console.log("Attempting to write file at path:", filePath); 

    try {
        fs.writeFileSync(filePath, content);
        console.log("File created successfully:", filePath);

      
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


app.get('/list-files', (req, res) => {
    const folderName = 'textfile';

    try {
        
        const files = fs.readdirSync(folderName).filter(file => file.endsWith('.txt'));

 
        res.send({
            status: 'success',
            message: "Files retrieved successfully",
            files: files
        });
    } catch (error) {
       
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
