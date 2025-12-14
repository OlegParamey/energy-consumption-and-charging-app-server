const express = require('express');
const cors = require('cors');

const getEnergyDataForThreeDays = require('./services/getEnergyDataForThreeDays.js');
const getOptimalChargingWindowTime = require('./services/getOptimalChargingWindowTime.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/generation-mix-for-three-next-days', getEnergyDataForThreeDays);

app.get('/optimal-charging-window-time', getOptimalChargingWindowTime);

app.listen(port, () => {
	console.log('Server is running on port: ', port);
});
