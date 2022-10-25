const { Pool } = require("pg");

const pool = new Pool({
	user: "joseph",
	host: "localhost",
	database: "postgres",
	password: "Hellopeople201590",
	port: 5432
});


module.exports = pool;