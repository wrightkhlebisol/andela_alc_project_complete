module.exports = {
	database: "students",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "students.sqlite",
		define: {
			underscored: true
		}
	},
	jwtSecret: "$tudent$AP1",
	jwtSession: {session: false}
};