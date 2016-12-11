// Definicion del modelo de User

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User',
		{
		username: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Falta el nombre de usuario"}}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "-> Falta la contraseña"}}
		},
	});
}
