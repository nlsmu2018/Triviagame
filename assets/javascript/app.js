$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Brasilia is the capital of which country?",
	    choices: ["Brazil", "SouthKorea", "Northkorea", "Budapest"],
	    correctAnswer: "Brazil",
	    image: "<img src='assets/images/Brazil.png' width=300 height=200 class='img-circle shadow'>"
	  }, 
	  {
	    question: "New Delhi is the capital of which country",
	    choices: ["Pakistan", "China", "India", "Argentina"],
	    correctAnswer: "India",
	    image: "<img src='assets/images/newdelhi.png' width=300 height=200 class='img-circle shadow'>"
	  }, 
	  {
	    question: "Canberra is the capital of which country?",
	    choices: ["Algeria", "Australia", "Alaska", "Argentina"],
	    correctAnswer: "Australia",
	    image: "<img src='assets/images/canberra.png' width=300 height=200 class='img-circle shadow'>"
	  }, 
	  {
	    question: "Paris is the capital of which country?",
	    choices: ["United Kingdom", "Spain", "France", "Germany"],
	    correctAnswer: "France",
	    image: "<img src='assets/images/paris.jpg' width=300 height=200  class='img-circle shadow'>"
	  }, 
	  {
	    question: "Moscow is the capital of which country",
	    choices: ["Russia", "Germany", "Czech Republic", "Sweden"],
	    correctAnswer: "Russia",
	    image: "<img src='assets/images/russia.jpg' width=300 height=200 class='img-circle shadow'>"
	  },
	  {
	    question: "Berlin is the capital of which country?",
	    choices: ["Germany", "Russia", "Iraq", "Sweden"],
	    correctAnswer: "Germany",
	    image: "<img src='assets/images/germany.jpg' width=300 height=200 class='img-circle shadow'>"
	  },
	  {
	    question: "London is the capital of which country",
			choices: ["United Kingdom", "Spain", "France", "Germany"],
	    correctAnswer: "United Kingdom",
	    image: "<img src='assets/images/london.jpg' width=300 height=200 class='img-circle shadow'>"
		},
		{
	    question: "Havana is the capital of which country",
			choices: ["Cuba", "Egypt", "Austria", "Japan"],
	    correctAnswer: "Cuba",
	    image: "<img src='assets/images/cuba.jpg' width=300 height=200 class='img-circle shadow'>"
		},
		{
	    question: "Tokyo is the capital of which country",
			choices: ["Cuba", "Egypt", "Austria", "Japan"],
	    correctAnswer: "Japan",
	    image: "<img src='assets/images/japan.jpg' width=300 height=200 class='img-circle shadow'>"
		},
		{
	    question: "Bogoto is the capital of which country",
			choices: ["Columbia", "Thailand", "Austria", "China"],
	    correctAnswer: "Columbia",
	    image: "<img src='assets/images/columbia.jpg' width=300 height=200 class='img-circle shadow'>"
		}];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>Correct!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 1000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Incorrect!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 1000);
		questionCounter++;
	}

	// Timeup
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>Timeout!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 1000);
			questionCounter++;
		}
	}

	// screen that shows final score 
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Bang On!!, Greatjob!";
		
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Goodjob!, You Pass!";
			
		}
		else {
			var endMessage = "You loose, but there is always a next time!!";
		
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>Correct: <strong>" + 
			correctGuesses  + 
			"<p>Incorrect: " + incorrectGuesses);
		$("#gameScreen").append("<h1 id='start'>Refresh your screen to start over!</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});