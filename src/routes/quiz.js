var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController")

router.post('/salvar', quizController.salvar)

module.exports = router;