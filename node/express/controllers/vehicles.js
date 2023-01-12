const vehicleService = require('../services/vehicles')
const vehicleData = require('../vehicleData')

function list() {
	return (
		vehicleData.map(vehicle => {
			return makeDBVehicle(vehicle);
		})
	)

};

const makeDBVehicle = (apiVehicle) => {
		const latitude = apiVehicle.location[0];
		const longitude = apiVehicle.location[1];

		return ({
			"id": apiVehicle.id,
			"licensePlate": apiVehicle.license_plate,
			"batteryLevel": apiVehicle.battery_level,
			"inUse": apiVehicle.in_use,
			"model": apiVehicle.model,
			"latitude": latitude,
			"longitude": longitude,
		})
	}

const getAllVehicles = async () => {
	const query = await vehicleService.fetchAllVehicles()
	return query
}

const getAllShiftVehicles = async (vehicleArray) => {
	const query = await vehicleService.getAllVehiclesInShift(vehicleArray)
	return query
}

const swapBattery = async (vehicleId) => {
	const query = await vehicleService.swapVehicleBattery(vehicleId)
	return query
}

const checkBatteryStatus = async (vehicleId) =>{
	const query = await vehicleService.getBatteryStatus(vehicleId)
	return query
}

const checkAllSwapStatus = async (vehicleArray) => {
	const vehiclesNotSwapped = []
	const vehiclesSwapped = []
	const query = await vehicleService.getAllVehiclesInShift(vehicleArray)
	query.map(vehicle => {
		if(vehicle.dataValues.batterySwapped !== true) {
			vehiclesNotSwapped.push(vehicle.dataValues.id)
		}
		if(vehicle.dataValues.batterySwapped === true) {
			vehiclesSwapped.push(vehicle.dataValues.id)
		}
	})
	const result = {
		"vehiclesSwapped": vehiclesSwapped,
		"vehiclesNotSwapped": vehiclesNotSwapped
	}

	return result
}

module.exports = {
	list,
	makeDBVehicle,
	getAllVehicles,
	getAllShiftVehicles,
	swapBattery,
	checkBatteryStatus,
	checkAllSwapStatus
};
