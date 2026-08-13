/**Used to store cards & scores/players & Basic Functions**/
var jobs = [
    'Astronaut',
    'Zoo Keeper',
    'Detective',
    'Magician',
    'Game Designer',
    'Inventor',
    'Chef',
    'Firefighter',
    'Pilot',
    'Teacher',
    'Archaeologist',
    'Robot Engineer',
    'Wildlife Photographer',
    'Movie Director',
    'News Reporter',
    'Park Ranger',
    'Treasure Hunter',
    'Circus Performer',
    'Comic Artist',
    'Toy Designer',
    'Weather Presenter',
    'Veterinarian',
    'Race Car Driver',
    'Librarian',
    'Superhero',
    'Secret Agent',
    'Pirate',
    'Dragon Trainer',
    'Theme Park Designer',
    'Ice Cream Maker',
    'Professional Gamer',
    'Wildlife Explorer',
    'Mountain Guide',
    'Stunt Performer',
    'Time Traveller',
    'Space Tourist',
    'Inventor',
    'Storyteller',
    'Treasure Map Maker',
    'Animal Trainer',
    'Sports Coach',
    'Film Producer',
    'Cartoonist',
    'Puppeteer',
    'Museum Curator',
    'Music Producer',
    'Rock Star',
    'Dance Teacher',
    'Book Illustrator',
    'Garden Designer',
    'Cake Designer',
    'Race Commentator',
    'Island Explorer',
    'Toy Tester',
    'Puzzle Designer',
    'Amusement Designer',
    'Train Driver',
    'Ship Captain',
    'Helicopter Pilot',
    'Film Stuntman',
    'Science Teacher',
    'Inventor',
    'Wildlife Rescuer',
    'Cave Explorer',
    'Volcano Expert',
    'Cloud Watcher',
    'Treasure Diver',
    'Robot Trainer',
    'Monster Hunter',
    'Alien Expert',
    'Dinosaur Expert',
    'Space Chef',
    'Castle Builder',
    'Toy Inventor',
    'Jungle Guide',
    'Beach Lifeguard',
    'Circus Ringmaster',
    'Game Show Host',
    'TV Presenter',
    'Radio Host',
    'Comic Writer',
    'Fantasy Author',
    'Music Teacher',
    'Sports Reporter',
    'Film Critic',
    'Art Teacher',
    'Science Inventor',
    'Puzzle Master',
    'Escape Artist',
    'Fortune Teller',
    'Magic Teacher',
    'Supervillain',
    'Knight',
    'Wizard',
    'Fairy',
    'Elf',
    'Dragon Rider',
    'Mermaid'
];

var allJobs = [...jobs];
var jobs_used = [];

var quals = [
    'Magic Wand',
    'Jet Pack',
    'Rubber Boots',
    'Quick Reflexes',
    'Amazing Memory',
    'Loud Voice',
    'Good Listener',
    'Fast Runner',
    'Great Dancer',
    'Sharp Eyes',
    'Brave Heart',
    'Big Imagination',
    'Juggling Skills',
    'Puzzle Skills',
    'Animal Knowledge',
    'Science Skills',
    'Art Skills',
    'Music Skills',
    'Cooking Skills',
    'Map Reading',
    'Night Vision',
    'Super Strength',
    'X-Ray Vision',
    'Invisibility',
    'Lucky Socks',
    'Secret Map',
    'Golden Key',
    'Treasure Map',
    'Cool Sunglasses',
    'Fancy Hat',
    'Cape',
    'Backpack',
    'Magnifying Glass',
    'Walkie Talkie',
    'Rubber Duck',
    'Toy Hammer',
    'Foam Sword',
    'Plastic Crown',
    'Magic Boots',
    'Rainbow Cape',
    'Dragon Whistle',
    'Alien Dictionary',
    'Time Machine',
    'Robot Friend',
    'Pet Dragon',
    'Tiny Horse',
    'Giant Umbrella',
    'Banana Phone',
    'Silly Walk',
    'Funny Voice',
    'Perfect Timing',
    'Great Hair',
    'Excellent Manners',
    'Team Spirit',
    'Calm Nature',
    'Strong Memory',
    'Quick Thinking',
    'Big Smile',
    'Steady Hands',
    'Sharp Ears',
    'Keen Nose',
    'Brilliant Ideas',
    'Creative Mind',
    'Kind Heart',
    'Fearless Attitude',
    'Good Balance',
    'Amazing Stories',
    'Secret Password',
    'Lucky Charm',
    'Magic Button',
    'Golden Shoes',
    'Super Speed',
    'Rubber Gloves',
    'Raincoat',
    'Swimming Skills',
    'Climbing Skills',
    'Flying Skills',
    'Singing Skills',
    'Dancing Skills',
    'Drawing Skills',
    'Building Skills',
    'Acting Skills',
    'Writing Skills',
    'Counting Skills',
    'Memory Tricks',
    'Joke Book',
    'Compass',
    'Binoculars',
    'Flashlight',
    'Camping Gear',
    'First Aid',
    'Toolbox',
    'Walkie Talkie',
    'Lunchbox',
    'Water Bottle',
    'Sleeping Bag',
    'Party Tricks',
    'Card Tricks',
    'Magic Tricks',
    'Great Hair',
    'Hero Pose',
    'Victory Dance',
    'Secret Recipe'
];

var allQuals = [...quals];
var quals_used = [];

//counters
var scores = {}; //example, will populate with function later
var numPlayers = 0;
var currentBoss = 0;
var currentPlayer = 1; //tracks which player/employee is going up for quals
var qualCounter = 1;

//Helper Functions
function getJob(){
	if(jobs.length === 0){
		jobs = jobs.concat(jobs_used);
		jobs_used = [];
	}
	var index = Math.floor(Math.random() * jobs.length); //random var
	var result = jobs[index]; //returns result later
	jobs_used = jobs_used.concat(jobs.splice(index, 1)); //puts the jobs into used arr
	return result; //returns result
}
function getQual(){
	if(quals.length === 0){
		quals = quals.concat(quals_used);
		quals_used = [];
	}
	var index = Math.floor(Math.random() * quals.length); //random var
	var result = quals[index]; //returns result later
	quals_used = quals_used.concat(quals.splice(index, 1)); //puts the quals into used arr
	return result; //returns result
}
function nextBoss(){
	return (currentBoss+1 == numPlayers)?0:currentBoss+1; // basically cycles through the players properly
}
function pName(x){
	return Object.keys(scores)[x]; //return dictionary entry using index
}


/***********Animations*************/
//Animate Functions
function animateTitle(){
	$("#MainPage .select").hide();
	$('#MainPage .boxes').hide();
	$('#MainPage .startgame').hide();
	$('#MainPage .howPlay').hide();
	for(i=0;i<3;i++){
		var nSelector = "input[name='pName" + i + "']";
		$(nSelector).hide();
	}
	quickAnim("#MainPage .title", "zoomIn");
	setTimeout(quickAnim, 400, '#MainPage .select', 'zoomIn',);
	setTimeout(quickAnim, 800, '#MainPage .boxes', 'zoomIn',);
	for(i=0;i<3;i++){
		var nSelector = "input[name='pName" + i + "']";
		setTimeout(quickAnim, 750+(75*i), nSelector, 'zoomIn',);
	}
	setTimeout(quickAnim, 1200, '#MainPage .startgame', 'zoomIn');
	setTimeout(quickAnim, 1250, '#MainPage .howPlay', 'zoomIn');
}
function roundStartAnim(){
	setTimeout(quickAnim, 1100, "#GamePage", "slideInDown");
	
	$("#GamePage").children().hide();
	$("#GamePage h1").show();
	var timeoutCounter = 2100;
	var timeoutInterval = 500;
	$("#GamePage").children().each(function () {
	  	if(!$(this).is("h1") && !$(this).is("div#pickWinner")){
	  		setTimeout(quickAnimObj, timeoutCounter, $(this), "slideInRight");
	  		timeoutCounter+=timeoutInterval;
	  	}
	});
	
}

//Animate Helper Functions
function quickAnim(selector, animName){
  $(selector).addClass(animName + ' animated').show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass(animName + ' animated');
    $(this).show();
  });
};
function quickAnimObj(Obj, animName){
  Obj.addClass(animName + ' animated').show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    Obj.removeClass(animName + ' animated');
    Obj.show();
  });
};

function quickAnimHide(selector, animName){
  $(selector).addClass(animName + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  	$(this).hide();
    $(this).removeClass(animName + ' animated');
  });
};

animateTitle();

