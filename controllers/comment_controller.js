var models = require('../models/models.js');

// GET /quizes/:quizId(\\d+)/comments/new
exports.new = function(req, res, next) {
	var comment = models.Comment.build( //crea objeto comment
	);

	res.render('comments/new', {quiz: req.quiz, errors: [] });
};

// POST /quizes/:quizId(\\d+)/comments
exports.create = function(req, res, next) {

	var comment = models.Comment.build( req.body.comment );

	comment.validate().then(function(err) {
		if(err){
			res.render('comments/new', {comment: comment, quiz: req.quiz, errors: err.errors});
		}else{
			//guarda en DB los campo texto de comment
			comment.save().then(function(){
				req.quiz.addComment(comment).then(function(){
					res.redirect('/quizes/' + req.quiz.id);
				});
			}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	}
  ).catch(function(error){next(error)});
};
