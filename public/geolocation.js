// geolocation.js

// Function to fetch geolocation data using an external API
async function fetchGeolocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return null;
    }
}

// Function to send geolocation data to the server
async function sendGeolocationToServer(geolocation) {
    try {
        const response = await fetch('/save-geolocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(geolocation)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Server response:', responseData);
    } catch (error) {
        console.error('Error sending geolocation data to server:', error);
    }
}

// Fetch and send geolocation data
async function trackGeolocation() {
    const geolocation = await fetchGeolocation();
    if (geolocation) {
        console.log('Geolocation data:', geolocation);
        await sendGeolocationToServer(geolocation);
    }
}

// Start tracking geolocation
trackGeolocation();
