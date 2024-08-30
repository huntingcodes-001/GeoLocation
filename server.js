const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');  // Import the fs module

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive geolocation data
app.post('/save-geolocation', (req, res) => {
    const geolocation = req.body;
    console.log('Received geolocation data:', geolocation);

    // Convert the geolocation data to a string
    const dataToWrite = JSON.stringify(geolocation, null, 2);

    // Append the geolocation data to a file named 'geolocation_data.txt'
    fs.appendFile('geolocation_data.txt', `${dataToWrite}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).json({ message: 'Failed to save geolocation data' });
            return;
        }
        console.log('Geolocation data saved to geolocation_data.txt');
        res.json({ message: 'Geolocation data received and saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});