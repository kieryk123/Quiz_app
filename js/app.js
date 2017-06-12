var question = $('.question'),
		timeField = $('.time'),
		points = $('.points'),
		answerA = $('.answerA'),
		answerB = $('.answerB'),
		answerC = $('.answerC'),
		answerD = $('.answerD'),
		correctButton = $('.correct'),
		questionsData,
		timer;

// function to get questions form external JSON file
function getQuestions(url) {
	$.ajax({
		url: url,
		dataType: 'json',
		success: function(response) {
			questionsData = response;
			Quiz.setQuestion();
		},
		error: function(response) {
			$('.wrapper').html('<h1>BŁĄD PRZY POBIERANIU PYTAŃ!</h1>');
		}
	});
}
getQuestions('https://kieryk123.github.io/Quiz_app/questions.json');

// Quiz object
var Quiz = {
	time: 10,
	points: 0,
	actualQuestion: 0,
	correctAnswer: '',
	gameOver: false,
	gameWin: false,
	timerIsStopped: false,

	countTime: function() {
		this.clearTimer();
		this.time = 10;

		var count = () => {
			timeField.html(this.time);

			if (this.time > 0) {
				this.time--;
			} else {
				this.clearTimer();
				this.gameOver = true;
				this.checkGameState();
			}
		}

		timer = setInterval(count, 1000);
	},

	clearTimer: function() {
		clearInterval(timer);
	},

	setQuestion: function() {
		this.countTime();
		this.displayPoints();

		if (this.actualQuestion < questionsData.questions.length) {
			question.html(questionsData.questions[this.actualQuestion].question);

			this.setCorrectAnswer();

			$('.answer-btn').removeClass('correct');

			switch (this.correctAnswer) {
				case 'A':
					answerA.addClass('correct');
					break;
				case 'B':
					answerB.addClass('correct');
					break;
				case 'C':
					answerC.addClass('correct');
					break;
				case 'D':
					answerD.addClass('correct');
					break;
			}
			this.actualQuestion++;
		} else {
			return false;
		}
	},

	setCorrectAnswer: function() {
		this.correctAnswer = questionsData.questions[this.actualQuestion].answer;
	},

	addPoint: function() {
		this.points++;
	},

	displayPoints: function() {
		points.html(this.points);
	},

	checkGameState: function() {
		if (this.gameWin) this.endGame();
		if (this.gameOver) this.endGame();
	},

	isLastQuestion: function() {
		if (this.actualQuestion == questionsData.questions.length) {
			if (this.points == questionsData.questions.length) {
				this.timerIsStopped = true;
				this.clearTimer();
				this.gameWin = true;
				this.endGame();
			}
		}
	},

	endGame: function() {
		this.timerIsStopped = true;
		this.clearTimer();

		if (this.gameWin) {
			$('.wrapper').html('<h1>WYGRAŁEŚ!</h1> <p>Twoje punkty: ' + parseInt(this.points) + '</p>');
		} else if (this.gameOver) {
			$('.wrapper').html('<h1>PRZEGRAŁEŚ!</h1> <p>Twoje punkty: ' + parseInt(this.points) + '</p>');
		}
	}
};
