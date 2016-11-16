var models = require('../models/models.js');

// Autoload - factoriza el codigo se ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				var err = new Error('Esa pregunta no existe');
  				err.status = 404;
				next(err);
			}	
		})
};

// GET /quizes/:quizId(\\d+)
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	})
};


// GET /quizes/:quizId(\\d+)
exports.show = function(req, res) {
	req.quiz.getComments().then(function(comments){
		res.render('quizes/show', {quiz: req.quiz, comments: comments});
	});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
	if (req.query.respuesta === req.quiz.respuesta) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
	}
};

// GET /quizes/new
exports.new = function(req,res) {
	var quiz = models.Quiz.build( //crea objeto quiz
	);

	res.render('quizes/new', {quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(function(err) {
		if(err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		}else{
			//guarda en DB los campos pregunta y respuesta de quiz
			quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes');
			}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	});
};

// GET /quizes/:quizId/edit
exports.edit = function(req,res) {
	var quiz = req.quiz; //Autoload de instancia de quiz

	res.render('quizes/edit', {quiz: quiz});
};

// PUT /quizes/:quizId
exports.update = function(req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(function(err) {
		if(err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		}else{
			//guarda en DB los campos pregunta y respuesta de quiz
			req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes');
			}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	});
};

// DELETE /quizes/:quizId
exports.destroy = function(req,res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function(error) {next(error)});
};
