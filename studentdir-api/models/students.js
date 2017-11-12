module.exports = (sequelize, DataType) => {
	const Students = sequelize.define("Students", 
	{
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		gender: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		level: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Students.belongsTo(models.Users);
			}
		}
	});
	return Students;
};