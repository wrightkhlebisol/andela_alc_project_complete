module.exports = app => {
	app.db.sequelize.sync().done(() => {
		app.listen(app.get("port"), ()=> {
			console.log(`Student API running on port: ${app.get("port")}`);
		});
	}); 
};