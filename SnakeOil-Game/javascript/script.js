/****************************************************
 * Snake Oil
 * script.js
 ****************************************************/


/***********************
 * PLAYER SETUP
 ***********************/


function changeForm(){

    var selector = parseInt($("#numOfPlayers").val());
    var timeoutCount = 50;


    for(var i = 0; i < 12; i++){

        var box = "input[name='pName" + i + "']";


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

        } else {


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


    for(var i = 0; i < numPlayers; i++){

        var name = $("input[name='pName"+i+"']").val();


        if(name === ""){

            name = "Player " + (i+1);

        }


        scores[name] = 0;

    }


    currentCustomer = 0;


    quickAnimHide("#MainPage","fadeOutLeft");


    setTimeout(function(){

        $("#GamePage").show();

        roundStart();

    },1000);

}

function fitCardText(element){

    var fontSize = 18;

    $(element).css("font-size", fontSize + "px");


    while(
        element.scrollWidth > element.clientWidth &&
        fontSize > 10
    ){

        fontSize--;

        $(element).css(
            "font-size",
            fontSize + "px"
        );

    }

}


/***********************
 * ROUND START
 ***********************/


function roundStart(){

    clearRound();


    $("#pickWinner").hide();

    $("#playerHand").show();


    var customer = playerName(currentCustomer);


    $("#customerName")
        .text("Customer: " + customer);



    currentCustomerCard = drawCustomer();


    $("#customerCard")
        .text(currentCustomerCard);



    $(".job-card").removeClass("flipped");


    setTimeout(function(){

        $(".job-card").addClass("flipped");

    },500);



    currentPlayer = 0;


    showNextPlayer();

}




function showNextPlayer(){


    while(currentPlayer == currentCustomer){

        currentPlayer++;

    }


    if(currentPlayer >= numPlayers){

        showWinnerSelection();

        return;

    }



    var player = playerName(currentPlayer);


    $("#currentPlayerName")
        .text(player);



    dealHand(player);


    displayHand(player);


}




/***********************
 * CARD HAND
 ***********************/


function displayHand(player){


    $("#wordCards").empty();


    selectedWords = [];


    $("#submitWords")
        .prop("disabled",true);



    playerHands[player].forEach(function(word){


        var card = $("<button>");

        card
        .addClass("word-card")
        .text(word)
        .attr("data-word", word);



        card.click(function(){

            selectWord(word,this);

        });



        $("#wordCards").append(card);


        var delay = $("#wordCards .word-card").length * 150;


        setTimeout(function(){

        card.addClass("dealing");

}, delay);
        fitCardText(card[0]);


    });


}



function selectWord(word,element){


    if(selectedWords.includes(word)){


        selectedWords =
        selectedWords.filter(function(x){

            return x !== word;

        });


        $(element).removeClass("selected");


    }

    else{


        if(selectedWords.length >= 2){

            return;

        }


        selectedWords.push(word);


        $(element).addClass("selected");

    }



    $("#submitWords")
        .prop(
            "disabled",
            selectedWords.length !== 2
        );


}




function submitPitch(){


    var player = playerName(currentPlayer);



    submittedProducts[player] = {


        cards:[
            selectedWords[0],
            selectedWords[1]
        ],


        product:
        selectedWords[0]
        +" "
        +selectedWords[1]

    };



    currentPlayer++;


    showNextPlayer();


}



/***********************
 * WINNER
 ***********************/


function showWinnerSelection(){


    $("#playerHand").hide();


    $("#pickWinner")
        .empty()
        .show();



    $("#pickWinner")
        .append("<h2>Choose the best invention!</h2>");



    for(var player in submittedProducts){


        var product =
        submittedProducts[player].product;



        var button = $("<button>");



        button.text(
            player +
            ": " +
            product
        );



        button.click(function(){


            var winner =
            $(this)
            .text()
            .split(":")[0];


            pickedWinner(winner);


        });



        $("#pickWinner")
        .append(button);



    }


}




function pickedWinner(player){


    scores[player]++;



    $("#ScorePage h1")
    .text(
        player +
        " wins!"
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

            "<h3>"+
            player+
            ": "+
            scores[player]+
            "</h3>"

        );


    });

}



/***********************
 * ROUND CONTROL
 ***********************/


function nextRound(){


    quickAnimHide(
        "#ScorePage",
        "fadeOutLeft"
    );


    setTimeout(function(){

        $("#ScorePage h3").remove();


        nextCustomer();


        $("#GamePage").show();


        roundStart();


    },1000);


}




function endGame(){


    quickAnimHide(
        "#ScorePage",
        "fadeOutLeft"
    );


    setTimeout(function(){


        $("#ScorePage h3").remove();



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



/***********************
 * HOW TO
 ***********************/


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




/***********************
 * ANIMATIONS
 ***********************/


function quickAnim(selector,animName){

$(selector)
.addClass(animName+" animated")
.show()
.one(
"animationend",
function(){

$(this)
.removeClass(animName+" animated");

});

}



function quickAnimHide(selector,animName){

$(selector)
.addClass(animName+" animated")
.one(
"animationend",
function(){

$(this)
.hide()
.removeClass(animName+" animated");

});

}



animateTitle();