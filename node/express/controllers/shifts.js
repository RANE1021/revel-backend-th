const shiftService = require('../services/shifts')

const createShift = async (lat, long, vehicles) => {
	const query = await shiftService.createShift(lat, long, vehicles)
	return query
}

const getAllShifts = async () => {
	const query = await shiftService.fetchAllShifts()
	return query
}

const getShiftVehicles= async (shiftId) => {
	const query = await shiftService.fetchShiftVehicles(shiftId)
	return query
}

module.exports = {
	createShift,
	getAllShifts,
	getShiftVehicles,
};
