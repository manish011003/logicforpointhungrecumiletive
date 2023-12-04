const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different datasets
app.get('/iphone-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'iphone-dataset.json'));
});

app.get('/huawei-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'huawei-dataset.json'));
});

app.get('/google-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'google-dataset.json'));
});

app.get('/samsung-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'samsung-dataset.json'));
});

app.get('/xiaomi-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'xiaomi-dataset.json'));
});

app.get('/oneplus-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'oneplus-dataset.json'));
});

app.get('/oppo-dataset.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'oppo-dataset.json'));
});

// Add routes for other datasets as needed

// Calculate Points Logic
function calculatePoints(deviceInfo) {
    if (deviceInfo) {
        const points = Math.round(
            deviceInfo['Gold (%)'] * 1800 +
            deviceInfo['Silver (%)'] * 30 +
            deviceInfo['Palladium (%)'] * 2000 +
            deviceInfo['Copper (%)'] * 10
        );

        const preciousMetals = {
            Gold: deviceInfo['Gold (%)'],
            Silver: deviceInfo['Silver (%)'],
            Palladium: deviceInfo['Palladium (%)'],
            Copper: deviceInfo['Copper (%)'],
        };

        return { points, preciousMetals };
    }
    return { points: 0, preciousMetals: {} };
}

// Handle POST request for calculating points
app.post('/calculatePoints', (req, res) => {
    const selectedBrand = req.body.brand;
    const selectedDevice = req.body.userDevices[0];
    const datasetPath = path.join(__dirname, 'public', `${selectedBrand}-dataset.json`);
    const dataset = require(datasetPath);

    const deviceInfo = dataset.find(item => item['Smartphone Model'] === selectedDevice);
    const result = calculatePoints(deviceInfo);

    res.json({ [selectedDevice]: result });
});

// Load index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
