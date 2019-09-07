//click start button onclick:
//new question appears + options
//timer stats counting down
//if person chooses the right option:
//then it says you're correct & gives the right answer
//adds to 'correct'
//if person gets it wrong 
//it tells you you're wrong and gives the right answer
//adds to 'incorrect'
// if no answer is selected and timer runs out
// it shows the right answer and goes to next question

var game = {

    questions: [
        "hope dangles on a string / like slow-spinning redemption",
        "hey, you know they're all the same / you know you're doing better on your own / so don't buy in",
        "you could slit my throat / and with my one last gasping breath / i'd apologize for bleeding on your shirt",
        "if I ever start to think straight / this heart will start a riot in me",
        "doing laundry finally / the first sign of first light / still nothing to wear between us.",
        "but i loved so much, the way we touched and psuedo-kissed, oh i already miss you",
        "one summer night's the only time we've known, so shut your eyes, when you wake, i'll be gone",
        "you're just jealous 'cause we're young and in love",
        "if i flooded out your house, do you think you'd make it out? / or would you burn up before the water filled your lungs?",
        "god bless catastrophe / there's no way in hell / you'll ever live to see through this",
        "i called in sick from your funeral / the sight of your body made me feel uncomfortable / i couldn't recognize your shell"
    ],

    questionNumber: 0,

    answerOne: [
        "dashboard confessional - vindicted",
        "good charlotte x the anthem",
        "the smiths x there is a light that never goes out",
        "paramore x that's what you get",
        "the weakerthans x aside",
        "say hi to your mom x sad, but endearingly so",
        "the get up kids x i'm a loner, a dottie, a rebel",
        "death cab for cutie x brothers on a hotel bed",
        "say anything x woe",
        "panic! at the disco x i write sins not tragedies",
        "saves the day x funeral"],
    answerTwo: [
        "puddle of mud x she f***ing hates me",
        "my chemical romance x helena",
        "taking back sunday x you're so last summer",
        "thursday x war all the time",
        "cap'n jazz x oh, messy life",
        "braid x a dozen roses",
        "american football x never meant",
        "jawbreaker x i love you so much it's killing us both",
        "new found glory x head on collision",
        "alkaline trio x mercyme",
        "the hotelier x your deep rest"],
    answerThree: [
        "brand new x sic transit gloria",
        "jimmy eat world x the middle",
        "my chemical romance x i'm not ok",
        "hawthorne heights x ohio is for lovers",
        "sunny day real estate x seven",
        "joyce manor x constant headache",
        "mae x embers and envelopes",
        "brand new x soco amaretto lime",
        "tigers jaw x i saw water",
        "all american rejects x hope it gives you hell",
        "further seems forever x so cold"],
    answerFour: [
        "evanescence - bring me to life",
        "fall out boy - grand theft autumn",
        "boys like girls x dance hall drug",
        "straylight run x existentialism on prom night",
        "the promise ring x happiness is all the rage",
        "mineral x gloria",
        "taking back sunday x cute without the e",
        "the gloria record x torch yourself",
        "saves the day x at your funeral",
        "cute is what we aim for x there's a class for this",
        "the academy is... x we've got a big mess on our hands"],

    correctAnswer: [1, 3, 2, 1, 4, 2, 1, 3, 4, 2, 2],

    correctAnswerArray: [
        "dashboard confessional x vindicted",
        "jimmy eat world x the middle", 
        "taking back sunday x you're so last summer",
        "paramore x that's what you get",
        "the promise ring x happiness is all the rage", 
        "braid x a dozen roses", 
        "the get up kids x i'm a loner, dottie, a rebel", 
        "brand new x soco amaretto lime", 
        "saves the day x at your funeral", 
        "alkaline trio x mercy me", 
        "the hotelier x your deep rest"
    ],

    answerGif: "",

    userGuess: "",
    correct: 0,
    wrong: 0,
    missed: 0,

    time: 15,
    intervalId: "",
    clockRunning: false,

    resetTimer: function () {
        game.time = 15;
        $("#content__timer").text("15 s.");
    },

    startTimer: function () {
        if (!game.clockRunning) {
            game.intervalId = setInterval(game.count, 1000);
            game.clockRunning = true;
        }
    },

    stopTimer: function () {
        clearInterval(game.intervalId);
        game.clockRunning = false;
    },

    count: function () {
        game.time--
        $("#content__timer").text(game.time + " s.");
        if (game.time === 0) {
            game.stopTimer();
            game.missed++;
            $("#content__question-text").text("time's up, poser... it was");
            $(".content__answers").css("display", "none");
            game.displayGif();
            game.displayAnswer();

            game.questionNumber++

            setTimeout(game.newQuestion, 5000);
            setTimeout(game.resetTimer, 5000);
            setTimeout(game.startTimer, 5000);


        }
    },

    displayAnswer: function() {

        $("#content__answer-reveal").text(game.correctAnswerArray[game.questionNumber]);

        setTimeout(function () {
            $("#content__answer-reveal").empty();
        }, 5000)

    },

    displayGif: function () {

        game.answerGif = $("<img>");
        game.answerGif.attr("src", "assets/images/answer-gifs/answer-gif-" + game.questionNumber + ".gif")
        game.answerGif.attr("class", "band-gif");
        $("#content__answer-gif").css("display", "block");
        $("#content__answer-gif").append(game.answerGif);

        setTimeout(function () {
            $("#content__answer-gif").empty();
        }, 5000)
    },

    newQuestion: function () {
        if (game.questionNumber < 11) {
            $(".content__answers").css("display", "block");
            $("#content__question-text").text(game.questions[game.questionNumber]);
            $("#content__answer-1").text(game.answerOne[game.questionNumber]);
            $("#content__answer-2").text(game.answerTwo[game.questionNumber]);
            $("#content__answer-3").text(game.answerThree[game.questionNumber]);
            $("#content__answer-4").text(game.answerFour[game.questionNumber]);
        } else {
            game.stopTimer();
            $("#content__timer").css("display", "none")
            $(".content__answers").css("display", "none");
            $("#content__question-text").css("display", "none");
            $(".scores").css("display", "block")
            $("#scores__correct").text("correct: " + game.correct);
            $("#scores__wrong").text("wrong: " + game.wrong);
            $("#scores__missed").text("missed: " + game.missed);
            if (game.correct >= 8) {
                $("#scores__explanation").text("wow, you're so emo i bet you have permanent tear stains on your cheeks. congrats. and maybe get some help.");
            } else if (game.correct < 8 && game.correct >= 5) {
                $("#scores__explanation").text("you're pretty emo but it seems like you might actually go out and enjoy the sun or listen to a pop tune sometimes. good for you.");
            } else if (game.correct < 5 && game.correct >= 2) {
                $("#scores__explanation").text("maybe you used to listen to dashboard confessional in high school but you sold out and became a well-adjusted adult. you're not actually emo.");
            } else if (game.correct < 2) {
                $("#scores__explanation").text("looks like you're too busy enjoying your life to even recognize a single bitter emo lyric. you're such a poser.");
            }
        }
    },

    checkGuess: function () {

        game.stopTimer();

        if (eval(game.userGuess) === game.correctAnswer[game.questionNumber]) {
            game.correct++;
            $("#content__question-text").text("you got it right... it's");
            game.displayGif();
            game.displayAnswer();
        } else if (eval(game.userGuess) !== game.correctAnswer[game.questionNumber]) {
            game.wrong++;
            $("#content__question-text").text("you're such a poser... it was");
            game.displayGif();
            game.displayAnswer();
        }

        $(".content__answers").css("display", "none");

    },

    answerBtnClicked: function () {
        game.checkGuess();

        game.questionNumber++

        setTimeout(game.newQuestion, 5000);
        setTimeout(game.resetTimer, 5000);
        setTimeout(game.startTimer, 5000);
    },

    resetGame: function () {
        $(".scores").css("display", "none");
        $("#content__question-text").css("display", "block");
        $("#btn__start").css("display", "block");
        $("#content__question-text").text("are you emo? or just a poser?");
        game.resetTimer();
        game.questionNumber = 0;
        game.userGuess = "";
        game.correct = 0;
        game.wrong = 0;
        game.missed = 0;
    }
}

$("#btn__start").on("click", function () {
    $("#content__timer").css("display", "block");
    $("#content__timer").text("15 s");
    game.startTimer();
    game.newQuestion();
    $("#btn__start").css("display", "none");
});

$("#content__answer-1").on("click", function () {
    game.userGuess = this.value;
    game.answerBtnClicked();
});

$("#content__answer-2").on("click", function () {
    game.userGuess = this.value;
    game.answerBtnClicked();
});

$("#content__answer-3").on("click", function () {
    game.userGuess = this.value;
    game.answerBtnClicked();
});

$("#content__answer-4").on("click", function () {
    game.userGuess = this.value;
    game.answerBtnClicked();
});

$("#btn__play-again").on("click", function () {
    game.resetGame();
})


