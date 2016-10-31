var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: "quiz.sqlite"
});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exporta la definicion de la tabla Quiz
//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if (count === 0) { //la tabla se inicializa solo si está vacia
			Quiz.create({
					pregunta: 'Capital de Italia',
					respuesta: 'Roma',
					aciertos: 0
				})
				.then(function() {
					console.log('Base de datos inicializada')
				});
		} else {
			Quiz.findAll().then(function(quiz) {
				quiz[0].aciertos = 0;
				quiz[0].save({fields: ['aciertos']});
			});
		}
	});
});