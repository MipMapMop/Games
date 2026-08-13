/****************************************************
 Movie Pitch
 script.js
****************************************************/

/***********************
 PLAYER SETUP
************************/

function changeForm(){

    var selector = parseInt($("#numOfPlayers").val());
    var timeoutCount = 50;

    for(var i=0;i<12;i++){

        var box = "input[name='pName"+i+"']";

        if(i < selector){

            if(!$(box).is(":visible")){

                setTimeout(
                    quickAnim,
                    timeoutCount,
                    box,
                    "zoomIn"
                );

                timeoutCount += 50;

            }

        }else{

            if($(box).is(":visible")){

                setTimeout(
                    quickAnimHide,
                    timeoutCount,
                    box,
                    "zoomOut"
                );

                timeoutCount += 50;

            }

        }

    }

}


function startGame(){

    resetGame();

    numPlayers = parseInt($("#numOfPlayers").val());

    scores = {};

    for(var i=0;i<numPlayers;i++){

        var player = $("input[name='pName"+i+"']").val();

        if(player===""){

            player="Player "+(i+1);

        }

        scores[player]=0;

    }

    currentProducer=0;

    quickAnimHide("#MainPage","fadeOutLeft");

    setTimeout(function(){

        $("#GamePage").show();

        roundStart();

    },1000);

}


/***********************
 ROUND START
************************/

function roundStart(){

    clearRound();

    $("#pickWinner").hide();

    $("#playerArea").show();

    $("#genreCardContainer").show();

    var producer = playerName(currentProducer);

    $("#producerName").text("Producer: "+producer);

    currentGenre = drawGenre();

    $("#genreCard").text(currentGenre);

    $(".job-card").removeClass("flipped");

    setTimeout(function(){

        $(".job-card").addClass("flipped");

    },500);

    currentPlayer=0;

    showNextPlayer();

}


function showNextPlayer(){

    while(currentPlayer==currentProducer){

        currentPlayer++;

    }

    if(currentPlayer>=numPlayers){

        showWinnerSelection();

        return;

    }

    var player=playerName(currentPlayer);

    $("#currentPlayerName").text(player);

    dealHand(player);

    displayHand(player);

}

/****************************************************
 PLAYER HAND
****************************************************/

var selectedHero = null;
var selectedLocation = null;
var selectedTwist = null;
var selectedQuote = null;

function displayHand(player){

    $("#heroCards").empty();
    $("#locationCards").empty();
    $("#twistCards").empty();
    $("#quoteCards").empty();

    $("#movieTitle").val("");

    selectedHero = null;
    selectedLocation = null;
    selectedTwist = null;
    selectedQuote = null;

    $("#submitPitch").prop("disabled", true);

    createCardRow(
        playerHands[player].heroes,
        "#heroCards",
        function(card){

            selectedHero = card;

        }
    );

    createCardRow(
        playerHands[player].locations,
        "#locationCards",
        function(card){

            selectedLocation = card;

        }
    );

    createCardRow(
        playerHands[player].twists,
        "#twistCards",
        function(card){

            selectedTwist = card;

        }
    );

    createCardRow(
        playerHands[player].quotes,
        "#quoteCards",
        function(card){

            selectedQuote = card;

        }
    );

}


/****************************************************
 CREATE ONE ROW OF CARDS
****************************************************/

function createCardRow(cards, container, callback){

    cards.forEach(function(card){

        var button = $("<button>");

        button
            .addClass("word-card")
            .text(card);

        button.click(function(){

            $(container)
                .find(".word-card")
                .removeClass("selected");

            $(this).addClass("selected");

            callback(card);

            updateSubmitButton();

        });

        $(container).append(button);

    });

}


/****************************************************
 ENABLE PITCH BUTTON
****************************************************/

$("#movieTitle").on("input", updateSubmitButton);

function updateSubmitButton(){

    var title = $("#movieTitle").val().trim();

    $("#submitPitch").prop(

        "disabled",

        !(

            selectedHero &&
            selectedLocation &&
            selectedTwist &&
            selectedQuote &&
            title.length > 0

        )

    );

}

/****************************************************
 SUBMIT MOVIE PITCH
****************************************************/

function submitPitch(){

    var player = playerName(currentPlayer);


    playerIdeas[player] = {

        title:
        $("#movieTitle")
            .val()
            .trim(),

        genre:
        currentGenre,

        hero:
        selectedHero,

        location:
        selectedLocation,

        twist:
        selectedTwist,

        quote:
        selectedQuote

    };


    currentPlayer++;


    showNextPlayer();

}




/****************************************************
 PRODUCER CHOOSES WINNER
****************************************************/

function showWinnerSelection(){

    $("#playerArea")
        .hide();


    $("#pickWinner")
        .empty()
        .show();


    $("#pickWinner")
        .append(
            "<h2>Choose the Best Movie!</h2>"
        );



    for(var player in playerIdeas){


        var idea = playerIdeas[player];


        var pitchCard = $("<div>");


        pitchCard.addClass("pitch-card");


        pitchCard.addClass(

            idea.genre
                .toLowerCase()
                .replace(/\s+/g,"")

        );


        pitchCard.data(
            "player",
            player
        );



        pitchCard.html(

            "<div class='poster-banner'>BLOCKBUSTER PICK</div>"+

            "<div class='poster-header'>"+

                "<div class='poster-genre'>"+
                    idea.genre+
                "</div>"+

                "<div class='poster-title'>"+
                    idea.title+
                "</div>"+

            "</div>"+


            "<div class='poster-details'>"+

                "<div><span>⭐</span> "+idea.hero+"</div>"+

                "<div><span>🌍</span> "+idea.location+"</div>"+

                "<div><span>💥</span> "+idea.twist+"</div>"+

                "<div><span>💬</span> "+idea.quote+"</div>"+

            "</div>"+


            "<div class='poster-footer'>"+

                "Presented by <strong>"+player+"</strong>"+

            "</div>"

        );



        pitchCard.click(function(){


            var winner = $(this)
                .data("player");


            pickedWinner(winner);


        });



        $("#pickWinner")
            .append(pitchCard);


    }


    fitMovieTitles();


}

/****************************************************
 WINNER
****************************************************/

function pickedWinner(player){


    scores[player]++;


    $("#ScorePage h1")
        .text(
            player + " wins!"
        );


    displayScores();


    quickAnimHide(
        "#GamePage",
        "fadeOutLeft"
    );


    setTimeout(function(){

        quickAnim(
            "#ScorePage",
            "fadeInRight"
        );

    },1000);


}



/****************************************************
 SCOREBOARD
****************************************************/

function displayScores(){


    $("#ScorePage h3")
        .remove();



    var players =
    Object.keys(scores)
    .sort(function(a,b){

        return scores[b]-scores[a];

    });



    players.forEach(function(player){


        $("#ScorePage h2")
        .after(

            "<h3>" +
            player +
            " — " +
            scores[player] +
            "</h3>"

        );


    });


}



/****************************************************
 NEXT ROUND
****************************************************/

function nextRound(){


    quickAnimHide(
        "#ScorePage",
        "fadeOutLeft"
    );



    setTimeout(function(){


        $("#ScorePage h3")
            .remove();



        nextProducer();



        $("#GamePage")
            .show();



        roundStart();



    },1000);


}



/****************************************************
 END GAME
****************************************************/

function endGame(){


    quickAnimHide(
        "#ScorePage",
        "fadeOutLeft"
    );



    setTimeout(function(){


        $("#ScorePage h3")
            .remove();



        $("input[name^='pName']")
            .val("");



        $("#numOfPlayers")
            .val("3");



        changeForm();



        quickAnim(
            "#MainPage",
            "fadeInDown"
        );



    },1000);


}



/****************************************************
 CLEAR ROUND
****************************************************/

function clearRound(){


    playerIdeas = {};


    $("#heroCards")
        .empty();


    $("#locationCards")
        .empty();


    $("#twistCards")
        .empty();


    $("#quoteCards")
        .empty();


    $("#movieTitle")
        .val("");



    selectedHero = null;

    selectedLocation = null;

    selectedTwist = null;

    selectedQuote = null;


}

/****************************************************
 HOW TO
****************************************************/

function howTo(){

    quickAnimHide(
        "#MainPage",
        "fadeOutLeft"
    );


    setTimeout(function(){

        quickAnim(
            "#HowTo",
            "fadeInLeft"
        );

    },1000);

}



function goBack(){

    quickAnimHide(
        "#HowTo",
        "fadeOutLeft"
    );


    setTimeout(function(){

        quickAnim(
            "#MainPage",
            "fadeInLeft"
        );

    },1000);

}



/****************************************************
 ANIMATION FUNCTIONS
****************************************************/

function quickAnim(selector,animName){

    $(selector)
        .addClass(animName+" animated")
        .show()
        .one(
            "animationend",
            function(){

                $(this)
                    .removeClass(
                        animName+" animated"
                    );

            }
        );

}



function quickAnimHide(selector,animName){

    $(selector)
        .addClass(animName+" animated")
        .one(
            "animationend",
            function(){

                $(this)
                    .hide()
                    .removeClass(
                        animName+" animated"
                    );

            }
        );

}



/****************************************************
 TITLE ANIMATION
****************************************************/

function animateTitle(){


    $("#MainPage .select").hide();

    $("#MainPage .boxes").hide();

    $("#MainPage .startgame").hide();

    $("#MainPage .howPlay").hide();



    for(var i=0;i<3;i++){

        $("input[name='pName"+i+"']")
            .hide();

    }



    quickAnim(
        "#MainPage .title",
        "zoomIn"
    );



    setTimeout(
        quickAnim,
        400,
        "#MainPage .select",
        "zoomIn"
    );



    setTimeout(
        quickAnim,
        800,
        "#MainPage .boxes",
        "zoomIn"
    );



    for(var i=0;i<3;i++){


        setTimeout(
            quickAnim,
            750+(75*i),
            "input[name='pName"+i+"']",
            "zoomIn"
        );


    }



    setTimeout(
        quickAnim,
        1200,
        "#MainPage .startgame",
        "zoomIn"
    );



    setTimeout(
        quickAnim,
        1250,
        "#MainPage .howPlay",
        "zoomIn"
    );


}



/****************************************************
 START PROGRAM
****************************************************/

animateTitle();