module.exports = app => {
	const Students = app.db.models.Students;
	
	app.route("/students")
		.all(app.auth.authenticate())
		.get((req, res) => {
			Students.findAll({
				where: {user_id: req.user.id}
			})
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg: error.message});
			})
		})
		.post((req, res) => {
			req.body.user_id = req.user.id;
			Students.create(req.body)
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		});

	app.route("/students/:id")
		.all(app.auth.authenticate())
		.get((req, res) => {
			Students.findOne({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
			.then(result => {
				if(result){
					res.json(result);
				}else{
					res.sendStatus(404);
				}
			})
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		})
		.put((req, res) => {
			Students.update(req.body, {where: {
				id: req.params.id,
				user_id: req.user.id
			}})
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		})
		.delete((req, res) => {
			Students.destroy({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		});
};