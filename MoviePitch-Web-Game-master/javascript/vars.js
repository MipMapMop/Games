/****************************************************
 Movie Pitch
 vars.js
 Stores all decks, game state and helper functions
****************************************************/


/***********************
 GENRES
************************/

var genres = [

"Action",
"Adventure",
"Comedy",
"Horror",
"Fantasy",
"Science Fiction",
"Romance",
"Mystery",
"Disaster",
"Western",
"Superhero",
"Spy",
"Musical",
"Sports",
"Christmas",
"Crime",
"Zombie",
"Pirate",
"Monster",
"Animation"

];


/***********************
 HEROES
************************/

var heroes = [

"Pirate",
"Grandma",
"Robot",
"Ninja",
"Teacher",
"Chef",
"Cowboy",
"Alien",
"Wizard",
"Princess",
"Detective",
"Dragon",
"Superhero",
"Zombie",
"Police Officer",
"Firefighter",
"Astronaut",
"Footballer",
"Scientist",
"Vampire",
"Ghost",
"Knight",
"Student",
"Farmer",
"Cat"

];


/***********************
 LOCATIONS
************************/

var locations = [

"Haunted House",
"Castle",
"Shopping Mall",
"Moon",
"Space Station",
"Jungle",
"Volcano",
"Desert",
"School",
"Zoo",
"Museum",
"Airport",
"Cruise Ship",
"Island",
"Hotel",
"Prison",
"Secret Laboratory",
"Theme Park",
"Submarine",
"Ancient Temple"

];


/***********************
 TWISTS
************************/

var twists = [

"Time Loop",
"Alien Invasion",
"Zombie Outbreak",
"Body Swap",
"Evil Twin",
"Lost Treasure",
"Talking Animals",
"Giant Monster",
"Magic Spell",
"Robot Revolution",
"Meteor Strike",
"Haunting",
"Secret Identity",
"World Ends Tomorrow",
"Stuck in a Video Game",
"Everyone Can Fly",
"No One Can Sleep",
"Everything Explodes",
"Memory Loss",
"Invisible Enemy"

];


/***********************
 QUOTES
************************/

var quotes = [

"Run!",
"Trust me.",
"It's behind you.",
"We're too late.",
"Don't open it.",
"This changes everything.",
"I have a plan.",
"You promised.",
"It's alive!",
"Nobody can know.",
"Follow me.",
"Who are you?",
"We only get one shot.",
"I can explain.",
"They're coming.",
"Don't look back.",
"Make it count.",
"I'm not leaving.",
"This isn't over.",
"You have five minutes."

];


/***********************
 ORIGINAL COPIES
************************/

var allGenres=[...genres];
var allHeroes=[...heroes];
var allLocations=[...locations];
var allTwists=[...twists];
var allQuotes=[...quotes];


/***********************
 USED PILES
************************/

var genresUsed=[];
var heroesUsed=[];
var locationsUsed=[];
var twistsUsed=[];
var quotesUsed=[];


/***********************
 GAME STATE
************************/

var scores={};

var numPlayers=0;

var currentProducer=0;

var currentPlayer=0;

var currentGenre="";


/***********************
 PLAYER DATA
************************/

var playerHands={};

var playerIdeas={};


/***********************
 CURRENT SELECTIONS
************************/

var selectedHero=null;
var selectedLocation=null;
var selectedTwist=null;
var selectedQuote=null;


/***********************
 DRAW FUNCTIONS
************************/

function drawCard(deck,used){

    if(deck.length===0){

        while(used.length){

            deck.push(used.pop());

        }

    }

    var index=Math.floor(Math.random()*deck.length);

    var card=deck.splice(index,1)[0];

    used.push(card);

    return card;

}


function drawGenre(){

    return drawCard(genres,genresUsed);

}

function drawHero(){

    return drawCard(heroes,heroesUsed);

}

function drawLocation(){

    return drawCard(locations,locationsUsed);

}

function drawTwist(){

    return drawCard(twists,twistsUsed);

}

function drawQuote(){

    return drawCard(quotes,quotesUsed);

}


/***********************
 PLAYER HELPERS
************************/

function playerName(index){

    return Object.keys(scores)[index];

}


function nextProducer(){

    currentProducer++;

    if(currentProducer>=numPlayers){

        currentProducer=0;

    }

}


/***********************
 DEAL CARDS
************************/

function dealHand(player){

    playerHands[player]={

        heroes:[],
        locations:[],
        twists:[],
        quotes:[]

    };

    for(var i=0;i<3;i++){

        playerHands[player].heroes.push(drawHero());

        playerHands[player].locations.push(drawLocation());

        playerHands[player].twists.push(drawTwist());

        playerHands[player].quotes.push(drawQuote());

    }

}


/***********************
 RESET FUNCTIONS
************************/

function resetDecks(){

    genres=[...allGenres];
    heroes=[...allHeroes];
    locations=[...allLocations];
    twists=[...allTwists];
    quotes=[...allQuotes];

    genresUsed=[];
    heroesUsed=[];
    locationsUsed=[];
    twistsUsed=[];
    quotesUsed=[];

}


function resetGame(){

    resetDecks();

    playerHands={};

    playerIdeas={};

    selectedHero=null;
    selectedLocation=null;
    selectedTwist=null;
    selectedQuote=null;

}