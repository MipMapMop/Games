/****************************************************
 HEADLINE MAKER

 script.js

 PART 1
 GAME SETUP
****************************************************/



/****************************************************
 CHANGE PLAYER FORM
****************************************************/


function changeForm(){


    var number =

        parseInt(
            $("#numOfPlayers").val()
        );



    for(var i=0;i<8;i++){


        var box =

            $("input[name='pName"+i+"']");



        if(i < number){


            box.show();


        }
        else{


            box.hide();


        }


    }


}







/****************************************************
 START GAME
****************************************************/


function startGame(){

    loadVocabulary(
        $("#vocabPack").val()
    );


    numPlayers = parseInt(
        $("#numOfPlayers").val()
    );


    scores = {};

    playerHeadlines = {};


    for(var i=0;i<numPlayers;i++){



        var name =

            $("input[name='pName"+i+"']")
            .val();



        if(name.trim()===""){


            name =
                "Reporter "+(i+1);


        }

       if(scores[name]){

       name += " "+(i+1);

    }

        scores[name]=0;



    }




    currentEditor = 0;



    $("#MainPage")
        .hide();



    $("#GamePage")
        .show();



    startEdition();



}







/****************************************************
 START NEW EDITION
****************************************************/


function startEdition(){


    playerHeadlines = {};


    currentNewspaper = drawNewspaper();


    $("#WinnerPage").hide();

    $("#ScorePage").hide();

    $("#chooseHeadline").hide();



    $("#GamePage").show();



    var editor =

        getPlayerName(currentEditor);



    $("#editorName")
        .text(

            "Editor: "+editor

        );




    currentReporter = 0;



    nextReporter();



}







/****************************************************
 FIND PLAYER NAME
****************************************************/


function getPlayerName(number){


    var name =

        $("input[name='pName"+number+"']")
        .val();



    if(name.trim()===""){


        name =
            "Reporter "+(number+1);


    }



    return name;


}







/****************************************************
 NEXT REPORTER
****************************************************/


function nextReporter(){



    while(
        currentReporter === currentEditor
    ){


        currentReporter++;


    }




    if(currentReporter >= numPlayers){



        showHeadlineSelection();



        return;


    }





    $("#currentReporter")
        .text(

            "Reporter: "+

            getPlayerName(currentReporter)

        );



    clearHeadline();

dealHeadlineCards();


window.scrollTo({

    top:0,

    behavior:"smooth"

});


}


/****************************************************
 RESET CURRENT HEADLINE
****************************************************/


function clearHeadline(){



    currentHeadline.person = null;

    currentHeadline.action = null;

    currentHeadline.object = null;

    currentHeadline.place = null;



    $("#generatedHeadline")
        .text(

            "Choose cards to create your headline..."

        );



    $("#submitHeadline")
        .prop(
            "disabled",
            true
        );



}

/****************************************************
 SHOW RANDOM HEADLINE CARDS
****************************************************/

function dealHeadlineCards(){


    $("#personCards").empty();

    $("#actionCards").empty();

    $("#objectCards").empty();

    $("#placeCards").empty();



    randomItems(people,20)
    .forEach(function(word){

        createWordCard(
            word,
            "#personCards",
            "person"
        );

    });



    randomItems(actions,20)
    .forEach(function(word){

        createWordCard(
            word,
            "#actionCards",
            "action"
        );

    });



    randomItems(objects,20)
    .forEach(function(word){

        createWordCard(
            word,
            "#objectCards",
            "object"
        );

    });



    randomItems(places,20)
    .forEach(function(word){

        createWordCard(
            word,
            "#placeCards",
            "place"
        );

    });


}

/****************************************************
 PICK MULTIPLE RANDOM ITEMS
****************************************************/

function randomItems(array, amount){


    var shuffled = array.slice();


    shuffled.sort(function(){

        return Math.random() - 0.5;

    });


    return shuffled.slice(0,amount);


}

/****************************************************
 CREATE WORD CARD
****************************************************/


function createWordCard(word, container, type){



    var card =

        $("<div>");



    card.addClass(
        "word-card"
    );



    card.text(word);




    card.click(function(){



        selectWord(

            word,

            type,

            $(this)

        );



    });




    $(container)
        .append(card);



}







/****************************************************
 SELECT WORD
****************************************************/


function selectWord(word,type,card){



    card
        .siblings()
        .removeClass("selected");



    card.addClass("selected");



    var row = card.parent();



    row.animate({

        scrollLeft:

            card.position().left +

            row.scrollLeft() -

            (row.width()/2) +

            (card.width()/2)


    },500);




    if(type === "person"){

        currentHeadline.person = word;

    }


    if(type === "action"){

        currentHeadline.action = word;

    }


    if(type === "object"){

        currentHeadline.object = word;

    }


    if(type === "place"){

        currentHeadline.place = word;

    }



    updateHeadline();


}


/****************************************************
 BUILD HEADLINE
****************************************************/


function updateHeadline(){



    var headline = "";



    if(currentHeadline.person){

        headline += currentHeadline.person;

    }



    if(currentHeadline.action){

        headline += " " + currentHeadline.action;

    }



    if(currentHeadline.object){

        headline += " " + currentHeadline.object;

    }



    if(currentHeadline.place){

    headline += " " + currentHeadline.place;

   }



    $("#generatedHeadline")
        .text(headline);



    $("#submitHeadline")
        .prop(

            "disabled",

            !(

                currentHeadline.person &&

                currentHeadline.action &&

                currentHeadline.object &&

                currentHeadline.place

            )

        );


}

/****************************************************
 RANDOM WORD PICKER
****************************************************/


function randomItem(array){


    return array[

        Math.floor(

            Math.random()*array.length

        )

    ];


}

function drawNewspaper(){

    return randomItem(newspapers);

}

/****************************************************
 RANDOM SELECTION OF CARDS
****************************************************/

function randomSelection(array, number){

    var copy = array.slice();

    copy.sort(function(){

        return Math.random() - 0.5;

    });

    return copy.slice(0, number);

}


/****************************************************
 SUBMIT HEADLINE
****************************************************/

function submitHeadline(){


    var reporter =

        getPlayerName(currentReporter);




    var headline =

        $("#generatedHeadline")
        .text();




    playerHeadlines[reporter] = {


        headline:headline,


        person:currentHeadline.person,


        action:currentHeadline.action,


        object:currentHeadline.object,


        place:currentHeadline.place


    };



    currentReporter++;



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



    setTimeout(function(){

        nextReporter();

    },400);


}

/****************************************************
 EDITOR CHOOSES WINNER
****************************************************/


function showHeadlineSelection(){



    $("#GamePage")
        .hide();



    $("#chooseHeadline")
        .show();



    $("#headlineCards")
        .empty();




    for(var reporter in playerHeadlines){



        var story =

            playerHeadlines[reporter];




        var card =

            $("<div>");



        card.addClass(

            "newspaper-card"

        );



        card.data(

            "reporter",

            reporter

        );




        card.html(


            "<div class='mini-masthead'>"+

            currentNewspaper+

            "</div>"+



            "<div class='breaking'>"+

                "BREAKING NEWS"+

            "</div>"+



            "<div class='mini-headline'>"+

                story.headline+

            "</div>"+



            "<div class='mini-byline'>"+

                "Reporter: "+

                reporter+

            "</div>"


        );





        card.click(function(){



            var winner =

                $(this)
                .data("reporter");



            chooseWinner(winner);



        });




        $("#headlineCards")
            .append(card);



    }



}







/****************************************************
 CHOOSE WINNER
****************************************************/


function chooseWinner(reporter){



    scores[reporter]++;



    var story =

        playerHeadlines[reporter];




    $("#chooseHeadline")
        .hide();



    $("#WinnerPage")
        .show();


    $("#winningNewspaper")
    .text(
        currentNewspaper
    );



    $("#winningHeadline")
        .text(

            story.headline

        );




    $("#winningStory")
    .html(

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Vestibulum vitae augue nec sapien tincidunt faucibus. " +
        "Integer posuere, lorem at tincidunt tincidunt, neque " +
        "urna tincidunt libero, vitae consequat justo lacus sed erat. " +

        "<br><br>" +

        "Curabitur feugiat magna nec velit placerat, sed luctus " +
        "massa interdum. Nulla facilisi. Praesent eget neque velit. " +
        "Sed euismod, justo at tristique consequat, erat augue " +
        "interdum massa, vel posuere sapien nisl ut odio. " +

        "<br><br>" +

        "Aliquam erat volutpat. Donec malesuada, nisl at volutpat " +
        "faucibus, sapien lacus tincidunt mauris, vitae fermentum " +
        "ipsum ligula nec augue. " +

        "<br><br>" +

        "More details are expected as this developing story " +
        "continues to unfold."

    );




    $("#winningReporter")
        .text(

            reporter

        );




    updateLeaderboard();




}







/****************************************************
 LEADERBOARD
****************************************************/


function updateLeaderboard(){



    $("#leaderboard")
        .empty();




    for(var player in scores){



       $("#leaderboard")
.append(

"<div class='score-card'>" +

"<span class='player-name'>" +

player +

"</span>" +

"<span class='player-score'>" +

scores[player] +

"</span>" +

"</div>"



            );



    }



}

/****************************************************
 SHOW SCOREBOARD
****************************************************/


function showScores(){


    $("#WinnerPage")
        .hide();


    $("#ScorePage")
        .show();


    updateLeaderboard();


}

/****************************************************
 NEXT EDITION
****************************************************/


function nextRound(){


    $("#WinnerPage").hide();

    $("#ScorePage").hide();

    $("#chooseHeadline").hide();



    $("#headlineCards").empty();

    $("#winningHeadline").text("");

    $("#winningStory").empty();

    $("#winningReporter").text("");



    currentEditor++;


    if(currentEditor >= numPlayers){

        currentEditor = 0;

    }



    $("#GamePage").show();


    startEdition();


}


/****************************************************
 END GAME
****************************************************/


function endGame(){



    $("#WinnerPage")
        .hide();



    $("#ScorePage")
        .hide();



    $("#GamePage")
        .hide();



    $("#chooseHeadline")
        .hide();




    $("#MainPage")
        .show();



    scores = {};

    playerHeadlines = {};



}







/****************************************************
 HOW TO PLAY
****************************************************/


function howTo(){



    $("#MainPage")
        .hide();



    $("#HowTo")
        .show();



}







/****************************************************
 RETURN TO MAIN PAGE
****************************************************/


function goBack(){



    $("#HowTo")
        .hide();



    $("#MainPage")
        .show();



}