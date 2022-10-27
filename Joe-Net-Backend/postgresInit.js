const { Pool } = require("pg");

const pool = new Pool({
	user: "",
	host: "localhost",
	database: "",
	password: "",
	port: ""
});


module.exports = pool;
