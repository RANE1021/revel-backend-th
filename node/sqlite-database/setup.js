const sequelize = require('../sequelize');
const { pickRandom, randomDate } = require('./helpers/random');
const Vehicles = require('../express/controllers/vehicles');
//const vehicles = require('../sequelize/models/vehicles');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: true });
  // add some dummy data here - e.g.
	 await sequelize.models.Vehicle.bulkCreate(
		Vehicles.list()
	 );

	console.log('Done!');
}

reset();
