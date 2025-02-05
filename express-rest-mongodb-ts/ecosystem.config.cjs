
const folder = "C:/Projects/templates/express-rest-mongodb-ts/dist";
//const folder = "/mnt/c/Projects/templates/express-rest-mongodb-ts/dist"

module.exports = {
	apps: [{
		"name": "express-rest-mongodb-ts",
		"script": "server.cjs",
		"cwd": folder,
		"instances": 1,
		"exec_mode": "fork",
		"autorestart": true,
		"watch": false,
		"max_memory_restart": "60M",
		"max_restarts": 4,
		"min_uptime": 60000,
		"restart_delay": 10000,
		"error_file": "logs/errors.txt",
		"out_file": "logs/logs.txt",
		env: {
			NODE_ENV: "production"
		},
	}]
}
