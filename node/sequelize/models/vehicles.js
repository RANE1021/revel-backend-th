
module.exports = (sequelize, DataTypes) => {
	const Vehicle = sequelize.define('Vehicle', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		licensePlate: {
			type: DataTypes.STRING,
		},
		batteryLevel: {
			type: DataTypes.INTEGER,
		},
		batterySwapped: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		inUse: {
			type: DataTypes.BOOLEAN,
		},
		model: {
			type: DataTypes.STRING,
		},
		latitude: {
			type: DataTypes.DECIMAL(9/6),
		},
		longitude: {
			type: DataTypes.DECIMAL(9/6),
		},

	}, {
		// Other model options go here
	});
	return Vehicle;
};
