const express = require('express');
const bodyParser = require('body-parser');

const controllers = {
	vehicles: require('./controllers/vehicles'),
	shifts: require('./controllers/shifts'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Use the sqlite-database/setup.js to add base fixture data to your db and run <b>npm run setup-example-db</b> once to have a populated database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/vehicles'>/api/vehicles</a>!</p>
	`);
});

app.get(`/api/vehicles`, async(req,res) => {
	const allVehicles = await controllers.vehicles.getAllVehicles()
		res.status(200).json(allVehicles);
});

app.get(`/api/shifts`, async(req, res) => {
		const shifts = await controllers.shifts.getAllShifts()
		res.status(200).json(shifts);
});
// create shifts
app.post(`/api/shifts`, async(req, res) => {
		const lat = req.body.latitude,
        long = req.body.longitude;
		//Double check this vehicle allocation, might need to be done elsewhere
		const vehicles = await controllers.vehicles.getAllVehicles()
		const shiftCreation = await controllers.shifts.createShift(lat, long, vehicles)
		res.status(200).json(shiftCreation);
});

//review all vehicles in a shift
app.get(`/api/shifts/:shiftId/vehicles`, async (req, res) => {
	const shiftId = req.params.shiftId
	const vehiclesForReview = await controllers.shifts.getShiftVehicles(shiftId)
	const vehiclesReview = await controllers.vehicles.getAllShiftVehicles(vehiclesForReview)
	res.status(200).json(vehiclesReview);
});
//complete a battery swap for a vehicle
app.post(`/api/vehicles/:vehicleId/batterySwap`, async (req, res) => {
	const vehicleId = req.params.vehicleId
	const batterySwap = await controllers.vehicles.swapBattery(vehicleId)
	res.status(200).json(batterySwap)
});
//check if a swap has been completed for any vehicle in a shift
app.get(`/api/shifts/:shiftId/:vehicleId/swapStatus`, async (req, res) => {
	const shiftId = req.params.shiftId,
	vehicleId = req.params.vehicleId
	const vehicleForReview = await controllers.shifts.getShiftVehicles(shiftId)
	const checkSwapStatus = await controllers.vehicles.checkBatteryStatus(vehicleId)
	const compound_result = {
		"shiftId": shiftId,
		"vehicle": checkSwapStatus
	}
		res.status(200).json(compound_result)
});
//query shift to see if all vehicles in the shift have had their battery swaps
app.get(`/api/shifts/:shiftId/swapStatus`, async (req, res) => {
	const shiftId = req.params.shiftId
	const vehiclesInShift = await controllers.shifts.getShiftVehicles(shiftId)
	const vehicles = await controllers.vehicles.checkAllSwapStatus(vehiclesInShift)
	res.status(200).json(vehicles)
});

module.exports = app;
