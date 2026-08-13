//Contains actual game functions

function changeForm(){

	var selector = parseInt($("#numOfPlayers").val());
	var timeoutCount = 50;

	for(i=0; i<12; i++){

		var nSelector = "input[name='pName" + i + "']";

		if(i < selector){

			if(!$($(nSelector)).is(":visible")){
				setTimeout(quickAnim, timeoutCount, nSelector, 'zoomIn');
				timeoutCount += 50;
			}

		} else {

			if($($(nSelector)).is(":visible")){
				setTimeout(quickAnimHide, timeoutCount, nSelector, 'zoomOut');
				timeoutCount += 50;
			}

		}
	}
}
function startGame(){ //Sets up scores dictionary, displays game
        jobs = [...allJobs];
        quals = [...allQuals];
        jobs_used = [];
        quals_used = [];
	quickAnimHide("#MainPage", "fadeOutLeft");
	numPlayers = parseInt($("#numOfPlayers").val()); //saves number of players from selection
	scores = {}; //reset dicitonary
	currentBoss = 0; //reset boss
	for(i=0;i<numPlayers;i++){ //Put the players names in the dictionary
		playername = $("input[name='pName" + i + "']").val();
		if (playername == ""){			
			scores["Player " + (i + 1)] = 0;
		}else{			
			scores[playername] = 0;
		}
	}
	roundStart();
}

function howTo(){
	quickAnimHide("#MainPage", "fadeOutLeft");
	setTimeout(quickAnim, 1000, "#HowTo", "fadeInLeft");
}
function goBack(){
	quickAnimHide("#HowTo", "fadeOutLeft");
	setTimeout(quickAnim, 1000, "#MainPage", "fadeInLeft");
}

function roundStart(){ //Sets up the html
	roundStartAnim();
	var bossName = pName(currentBoss);
	$("#GamePage h1").text("Employer: " + bossName);
	$("#jobText").text("Wanted: " + getJob());

        $(".job-card").removeClass("flipped");

        setTimeout(function(){
        $(".job-card").addClass("flipped");
},500);

	var table = $("#pastQuals table");
	for(i=0;i<numPlayers;i++){
		if (i==currentBoss){
			continue;
		}
		table.append("<tr><td>" + pName(i) + ": " + "</td></tr>");
	}

	if(currentBoss == 0){
		$("#currentQuals h3").text("Applicant: " + pName(1));
	}else{
		$("#currentQuals h3").text("Applicant: " + pName(0));
	}

	$("#currentQuals h2").text(getQual());
	qualCounter = 1;
	$("#currentQuals h4").text("");
}
function flipCard(){
    $(".qual-card").toggleClass("flipped");
}
function flipJobCard(){
    $(".job-card").toggleClass("flipped");
}
function nextQual(){ //Runs on "Next Qualification" click
	if(qualCounter != 0){ //Show on previous qualifications
		$("#currentQuals h4").append(" | " + $("#currentQuals h2").text());
	}
	revealQualification();
	qualCounter++;
	if(qualCounter == 4){ //If the number of qualifications is reached, change to next employee
		var button = $("#currentQuals button");
		button.text("Next Applicant");
		button.attr("onclick", "nextApplicant();");
	}
}
function revealQualification(){

    var card = $(".qual-card");

    // Flip back to hide old qualification
    card.removeClass("flipped");

    // Wait for the card to finish turning around
    setTimeout(function(){

        $("#qualText").text(getQual());

        // Flip forward to reveal new qualification
        card.addClass("flipped");

    }, 1200);
}
$("#currentQuals button").prop("disabled", true);

setTimeout(function(){
    $("#currentQuals button").prop("disabled", false);
}, 2400);
function nextApplicant(){ //Runs on "Next Employee" click
	//Stores Applicant's qualifications in table
	var temp_quals = $("#currentQuals h4").text().split(" | "); //array of current Applicant's quals
	var table_row = $("#pastQuals table tr:nth-child(" + currentPlayer + ")"); //get table row
	for(i=1;i<temp_quals.length;i++){ //insert qualifications one by one into table row
		table_row.append("<td>"+temp_quals[i]+"</td>");
	}
	table_row.append("<td>"+$("#currentQuals h2").text()+"</td>"); //insert current qual due to split command lol

	//Reset counter, button, and other stuff
	$("#currentQuals h4").text("");
	qualCounter = 0;
	var button = $("#currentQuals button");
	button.text("Next Qualification");
	button.attr("onclick", "nextQual();");

	currentPlayer++;
	//Gets the next qualification (if not finished with turn)
	if(currentPlayer < numPlayers){
		$("#currentQuals h3").text("Applicant: " + pName(currentPlayer));
		//quickAnim("#currentQuals h3", "bounce");
		nextQual();
		return;
	}
	//else, show the other thing
	quickAnimHide("#currentQuals", 'fadeOutLeft');
	setupPickWinner();
	setTimeout(quickAnim, 950, '#pickWinner', 'fadeInRight');
}

function setupPickWinner(){ //Runs when all applicants have interviewed
	//sets up the html for picking the winner
	var div = $("#pickWinner");
	for(i=0;i<numPlayers;i++){
		if (i==currentBoss){
			continue;
		}
		var string = "<button onclick=";
		string+='"pickedWinner(';
		string+="'";
		string+=Object.keys(scores)[i];
		string+="'";
		string+=');">';
		string+=Object.keys(scores)[i];
		string+="</button>"
		div.append(string);
	}
}

function pickedWinner(winner){ //Runs when a winner is picked
	//Displays winner text
	var string = winner + " is the new ";
	string+=$("#GamePage h2:first").text().slice(7);
	string+="!";
	$("#ScorePage h1").text(string);
	//Increments Score
	scores[winner]++;
	//Updates scoretable in ScorePage
	var scoreTable = $("#ScorePage h2");
	for(i=numPlayers-1;i>-1;i--){
		string = "<h3>" + pName(i) + ": " + scores[pName(i)] + "</h3>";
		scoreTable.after(string);
	}
	quickAnimHide("#GamePage", 'fadeOutLeft');
	setTimeout(quickAnim, 1000, '#ScorePage', 'fadeInRight');
}

function nextRound(){ //Runs on Next Round click
	quickAnimHide("#ScorePage", 'fadeOutLeft');
	setTimeout(function(){
	    $("#ScorePage h3").remove(); //resets scoreboard
	}, 1000);
	currentBoss = nextBoss();
	$("#pickWinner button").remove(); //resets pickWinner
	$("#pastQuals table tr").remove(); //resets table rows
	$("#currentQuals").show(); //shows the game
	$("#pickWinner").hide(); //hides the pick section
	currentPlayer=1;
	roundStart();
}
function endGame(){ //Runs on End Game click
	quickAnimHide("#ScorePage", 'fadeOutLeft');

	setTimeout(function(){
	    $("#ScorePage h3").remove(); //resets scoreboard
	}, 1000);

	currentBoss = 0; //resets boss
	$("#pickWinner button").remove(); //resets pickWinner
	$("#pastQuals table tr").remove(); //resets table rows
	$("#currentQuals").show(); //shows the game
	$("#pickWinner").hide(); //hides the pick section
	currentPlayer = 1;

	// Reset player setup
	$("input[name^='pName']").val("");
	$("#numOfPlayers").val("3");
        jobs = [...allJobs];
        quals = [...allQuals];
        jobs_used = [];
        quals_used = [];
	setTimeout(function(){
		changeForm();
		quickAnim("#MainPage", "fadeInDown");
	}, 1000);
}