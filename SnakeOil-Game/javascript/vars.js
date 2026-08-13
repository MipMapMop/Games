/****************************************************
 * Snake Oil
 * vars.js
 *
 * Stores decks, game state, and helper functions
 ****************************************************/


/***********************
 * CARD DECKS
 ***********************/

var customers = [

"Alien",
"Astronaut",
"Baby",
"Baker",
"Barbarian",
"Baseball Player",
"Bee",
"Bodybuilder",
"Bookworm",
"Boxer",
"Bride",
"Builder",
"Burglar",
"Bus Driver",
"Butler",

"Captain",
"Caveman",
"Chef",
"Clown",
"Cowboy",
"Dancer",
"Detective",
"Dinosaur",
"Doctor",
"Dog",
"Dragon",
"Explorer",

"Fairy",
"Farmer",
"Firefighter",
"Fisherman",
"Footballer",
"Fortune Teller",
"Ghost",
"Giant",
"Goblin",
"Grandma",
"Grandpa",
"Gymnast",

"Hiker",
"King",
"Knight",
"Librarian",
"Lifeguard",
"Lion",
"Magician",
"Mechanic",
"Mermaid",
"Monster",
"Movie Star",
"Mummy",
"Musician",

"Ninja",
"Nurse",

"Olympian",

"Painter",
"Penguin",
"Pilot",
"Pirate",
"Plumber",
"Police Officer",
"Postman",
"Princess",
"Prisoner",
"Professor",

"Queen",

"Race Car Driver",
"Robot",
"Rock Star",

"Samurai",
"Santa Claus",
"Scientist",
"Shark",
"Sheep",
"Shopkeeper",
"Singer",
"Skeleton",
"Skateboarder",
"Snowman",
"Soldier",
"Spy",
"Student",
"Superhero",
"Supervillain",
"Surfer",

"Teacher",
"Taxi Driver",
"Time Traveller",
"Tourist",
"Train Driver",
"Treasure Hunter",

"Unicorn",

"Vampire",
"Veterinarian",
"Viking",

"Waiter",
"Werewolf",
"Whale",
"Witch",
"Wizard",

"Yeti",

"Zombie",

"Archaeologist",
"Artist",
"Author",
"Ballerina",
"Bank Manager",
"Bee Keeper",
"Billionaire",
"Birdwatcher",
"Busker",
"Camping Enthusiast",
"Carpenter",
"Cashier",
"Cat",
"Chess Champion",
"Chicken",
"Circus Performer",
"Comedian",
"Computer Programmer",
"Construction Worker",
"Dentist",
"DJ",
"Dolphin",
"Eagle",
"Electrician",
"Elf",
"Engineer",
"Fashion Designer",
"Film Director",
"Florist",
"Game Show Host",
"Gardener",
"Giraffe",
"Goat",
"Gorilla",
"Hairdresser",
"Horse",
"Inventor",
"Judge",
"Journalist",
"Kangaroo",
"Karate Master",
"Koala",
"Mail Carrier",
"Mayor",
"Monkey",
"Mountain Climber",
"News Reporter",
"Octopus",
"Panda",
"Photographer",
"Pizza Chef",
"Poet",
"Rabbit",
"Ranger",
"Sailor",
"Snake Charmer",
"Soccer Coach",
"Space Tourist",
"Squirrel",
"Tailor",
"Tennis Player",
"Truck Driver",
"Turtle",
"Video Game Streamer",
"Wedding Planner",
"Wolf",
"Zoo Keeper"

];

var words = [

    // Technology
    "Robot",
    "Computer",
    "Phone",
    "Tablet",
    "Camera",
    "Drone",
    "Laser",
    "Battery",
    "Screen",
    "Keyboard",
    "Printer",
    "Scanner",
    "Speaker",
    "Headset",
    "Microphone",
    "Satellite",
    "Rocket",
    "Engine",
    "Machine",
    "Circuit",
    "Chip",
    "Sensor",
    "Helmet",
    "Gadget",
    "Controller",
    "Remote",

    // Food
    "Pizza",
    "Burger",
    "Taco",
    "Cookie",
    "Cake",
    "Chocolate",
    "Candy",
    "Coffee",
    "Tea",
    "Juice",
    "Banana",
    "Apple",
    "Orange",
    "Potato",
    "Pancake",
    "Donut",
    "Sandwich",
    "Cheese",
    "Noodle",
    "Popcorn",
    "Icecream",
    "Pickle",

    // Animals
    "Dog",
    "Cat",
    "Shark",
    "Monkey",
    "Dragon",
    "Tiger",
    "Lion",
    "Bear",
    "Wolf",
    "Snake",
    "Spider",
    "Penguin",
    "Dolphin",
    "Eagle",
    "Horse",
    "Chicken",
    "Frog",
    "Turtle",
    "Butterfly",
    "Whale",

    // Household objects
    "Toothbrush",
    "Chair",
    "Table",
    "Bed",
    "Lamp",
    "Clock",
    "Mirror",
    "Door",
    "Window",
    "Couch",
    "Blanket",
    "Pillow",
    "Bottle",
    "Cup",
    "Plate",
    "Spoon",
    "Fork",
    "Knife",
    "Box",
    "Bag",

    // Clothing
    "Shoe",
    "Boot",
    "Hat",
    "Shirt",
    "Jacket",
    "Sock",
    "Glove",
    "Belt",
    "Scarf",
    "Suit",
    "Pants",
    "Dress",
    "Mask",
    "Costume",

    // Fantasy / Adventure
    "Sword",
    "Shield",
    "Crown",
    "Castle",
    "Treasure",
    "Map",
    "Key",
    "Potion",
    "Wand",
    "Spell",
    "Wizard",
    "Pirate",
    "Robot",
    "Monster",
    "Alien",
    "Zombie",
    "Ghost",
    "Vampire",
    "Ninja",
    "Knight",

    // Sports / Activities
    "Ball",
    "Bat",
    "Racket",
    "Skateboard",
    "Bicycle",
    "Helmet",
    "Goal",
    "Whistle",
    "Trophy",
    "Medal",
    "Camera",
    "Guitar",
    "Drum",
    "Piano",
    "Microphone",

    // Weird/funny product possibilities
    "Toilet",
    "Sock",
    "Moustache",
    "Beard",
    "Eyeball",
    "Brain",
    "Finger",
    "Foot",
    "Nose",
    "Tongue",
    "Bubble",
    "Cloud",
    "Rainbow",
    "Shadow",
    "Moon",
    "Star",
    "Planet",
    "Volcano",
    "Storm",
    "Fire",
    "Ice",
    "Snow",
    "Rock",
    "Tree",
    "Flower",
    "Mushroom"

];


/***********************
 * ORIGINAL DECK COPIES
 ***********************/

var allCustomers = [...customers];

var allWords = [...words];



var customersUsed = [];

var wordsUsed = [];



/***********************
 * GAME STATE
 ***********************/

var scores = {};

var numPlayers = 0;


// Current player acting as customer

var currentCustomer = 0;


// Current salesperson

var currentPlayer = 1;



/***********************
 * ROUND DATA
 ***********************/


// Example:
//
// playerHands = {
//    Sarah:["Rocket","Pizza","Laser"]
// }

var playerHands = {};



// Example:
//
// submittedProducts = {
//    Sarah:{
//       cards:["Rocket","Pizza"],
//       product:"Rocket Pizza"
//    }
// }

var submittedProducts = {};



// Currently selected cards

var selectedWords = [];



// Customer card currently active

var currentCustomerCard = "";



/***********************
 * DRAW FUNCTIONS
 ***********************/


function drawCustomer(){

    if(customers.length === 0){

        customers = [...customersUsed];

        customersUsed = [];

    }


    var index = Math.floor(Math.random() * customers.length);


    var card = customers.splice(index,1)[0];


    customersUsed.push(card);


    return card;

}



function drawWord(){

    if(words.length === 0){

        words = [...wordsUsed];

        wordsUsed = [];

    }


    var index = Math.floor(Math.random() * words.length);


    var card = words.splice(index,1)[0];


    wordsUsed.push(card);


    return card;

}



/***********************
 * PLAYER HELPERS
 ***********************/


function playerName(index){

    return Object.keys(scores)[index];

}



function getPlayerCount(){

    return Object.keys(scores).length;

}



function nextCustomer(){

    currentCustomer++;

    if(currentCustomer >= numPlayers){

        currentCustomer = 0;

    }


}



function dealHand(player){

    playerHands[player] = [];


    for(var i = 0; i < 6; i++){

        playerHands[player].push(drawWord());

    }

}



function clearRound(){

    playerHands = {};

    submittedProducts = {};

    selectedWords = [];

}



/***********************
 * RESET
 ***********************/


function resetDecks(){

    customers = [...allCustomers];

    words = [...allWords];


    customersUsed = [];

    wordsUsed = [];

}



function resetGame(){

    scores = {};

    numPlayers = 0;

    currentCustomer = 0;

    currentPlayer = 1;


    clearRound();

    resetDecks();

}