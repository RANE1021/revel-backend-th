const { models } = require('../../sequelize');
const sequelize = require('../../sequelize/index');

const Shifts = sequelize.models.Shift

const createShift = async (lat, long, vehicles) => {
	const distanceArray = []
	const startLocation = [lat, long]
	const shiftVehicles = []
	vehicles.map(vehicle => {
		const location = [vehicle.latitude, vehicle.longitude]
		const distance = calculateEuclideanDistance(startLocation, location)
		distanceArray.push(distance);
	})

	for (let i = 0; i < 20; i++) {
		let minDistance = Math.min(...distanceArray)
		const minIndex = distanceArray.indexOf(minDistance)
		if(distanceArray.length <= 0) {break}
		distanceArray.splice(minIndex, 1)
		const shiftVehicle = vehicles.splice(minIndex, 1)
		shiftVehicles.push(shiftVehicle[0].id)
	}
	//create shift
	const shift = await Shifts.create({
		employee: "Jane McNamara",
		vehicles: JSON.stringify(shiftVehicles),
	});

	return shift
}

const fetchAllShifts = async () => {
	return (
		Shifts.findAll()
	)
}

const fetchShiftVehicles = async (shiftId) => {
	const shiftVehicles = await Shifts.findOne({
		attributes: ['vehicles'],
		where: {
			id: shiftId
		}
	})
	return JSON.stringify(shiftVehicles)[0].vehicles
}

// - How to Calculate Euclidean Distance
// - Find the difference between coordinates
// - Square the results and add them up
// - Find the square root for the final result
const calculateEuclideanDistance = (a,b) => {
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2)
        .reduce((sum, now) => sum + now)
        ** (1/2)
}

module.exports = {
	createShift,
	fetchAllShifts,
	fetchShiftVehicles,
}
