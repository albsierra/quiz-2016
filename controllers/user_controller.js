var models = require('../models/models.js');

// Comprueba si el usuario está registrado en users
// Si autenticación falla o hay errores se ejecuta el callback(error).
exports.autenticar = function(login, password, callback) {
	models.User.findOne({
		where: {
			username: login,
			password: password
		}
	}).then(function(user){
		if(user) {
			callback(null, user);
		} else {
			callback(new Error('Nombre de usuario o contraseña errónea.'));
		}
	}).catch(function(error){callback(error)});
};
