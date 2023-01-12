const { Op } = require("sequelize");
const { models } = require('../../sequelize');
const sequelize = require('../../sequelize/index');

const Vehicles = sequelize.models.Vehicle

const fetchAllVehicles = async () => {
	return(
		Vehicles.findAll()
	)
}

const getAllVehiclesInShift = async (shiftVehicles) => {
	const vehicles = await Vehicles.findAll({
		where: {
			id: {
			[Op.or]: shiftVehicles
			}
		}
	})
	return vehicles
}

const getVehicleById = async (vehicleId) => {
	return(
		Vehicles.findOne({
			where: {
				id: vehicleId
			}
		})
	)
}

const swapVehicleBattery = async (vehicleId) => {
	const vehicle = await Vehicles.update({
		batteryLevel: 100,
		batterySwapped: true
	 }, {
		where: {
			id: vehicleId
		}
	});
	return getVehicleById(vehicleId)
}

const getBatteryStatus = async (vehicleId) => {
	const vehicle = await Vehicles.findOne({
		where: {
			id: vehicleId
		}
	})

	return vehicle
}

module.exports = {
	fetchAllVehicles,
	getAllVehiclesInShift,
	swapVehicleBattery,
	getBatteryStatus
}
