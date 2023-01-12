
module.exports = (sequelize, DataTypes) => {
	const Shift = sequelize.define('Shift', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		employee: {
			type: DataTypes.STRING,
		},
		vehicles: {
			type: DataTypes.JSON,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
	}, {
		// Other model options go here
	});
	return Shift;
}
