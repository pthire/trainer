//=============================================================================
// CARD DECK SIMULATOR
//=============================================================================

"use strict";

//-----------------------------------------------------------------------------
// cards OBJECT
//-----------------------------------------------------------------------------

var cards = {
	images : ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "th",
	          "jh", "qh", "kh", "1d", "2d", "3d", "4d", "5d", "6d", "7d",
			  "8d", "9d", "td", "jd", "qd", "kd", "1c", "2c", "3c", "4c",
			  "5c", "6c", "7c", "8c", "9c", "tc", "jc", "qc", "kc", "1s",
			  "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "ts", "js",
			  "qs", "ks"],

	french : ["as de coeur", "2 de coeur", "3 de coeur", "4 de coeur",
	        "5 de coeur", "6 de coeur", "7 de coeur", "8 de coeur",
			"9 de coeur", "10 de coeur", "valet de coeur", "dame de coeur",
			"roi de coeur", "as de carreau", "2 de carreau",
			"3 de carreau", "4 de carreau", "5 de carreau",
			"6 de carreau", "7 de carreau", "8 de carreau",
			"9 de carreau", "10 de carreau", "valet de carreau",
			"dame de carreau", "roi de carreau", "as de trèfle",
			"2 de trèfle", "3 de trèfle", "4 de trèfle", "5 de trèfle",
			"6 de trèfle", "7 de trèfle", "8 de trèfle", "9 de trèfle",
			"10 de trèfle", "valet de trèfle", "dame de trèfle",
			"roi de trèfle", "as de pique", "2 de pique", "3 de pique",
			"4 de pique", "5 de pique", "6 de pique", "7 de pique",
			"8 de pique", "9 de pique", "10 de pique", "valet de pique",
			"dame de pique", "roi de pique"],

	english : ["Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts",
	        "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts",
			"9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts",
			"King of Hearts", "Ace of Diamondds", "2 of Diamondds",
			"3 of Diamondds", "4 of Diamondds", "5 of Diamondds",
			"6 of Diamondds", "7 of Diamondds", "8 of Diamondds",
			"9 of Diamondds", "10 of Diamondds", "Jack of Diamondds",
			"Queen of Diamondds", "King of Diamondds", "Ace of Clubs",
			"2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs",
			"6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs",
			"10 of Clubs", "Jack of Clubs", "Queen of Clubs",
			"King of Clubs", "Ace of Spades", "2 of Spades", "3 of Spades",
			"4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades",
			"8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades",
			"Queen of Spades", "King of Spades"],

	image : function(no) {
		return "cards/" + this.images[no] + ".svg";
	},

	transparent : "images_cards/transparent_card.gif",

	desc : function(no) {
		return this.english[no];
	},

	code : function(no) {
		return this.images[no];
	}

}

//-----------------------------------------------------------------------------
// deck OBJECT
//-----------------------------------------------------------------------------

var deck = {

	current : "",

	card : "",

	position : "",

	bicycle : "1h2h3h4h5h6h7h8h9hthjhqhkh1c2c3c4c5c6c7c8c9ctcjcqckckdqdjdtd9d8d7d6d5d4d3d2d1dksqsjsts9s8s7s6s5s4s3s2s1s",
	fournier : "1s2s3s4s5s6s7s8s9stsjsqsks1h2h3h4h5h6h7h8h9hthjhqhkhkdqdjdtd9d8d7d6d5d4d3d2d1dkcqcjctc9c8c7c6c5c4c3c2c1c",
	aronson : "jskc5c2h9s1s3h6c8d1cts5h2dkd7d8c3s1d7s5sqd1h8s3d7hqh5d7c4hkh4dtdjcjhtcjd4sth6h3c2s9hks6s4c8h9cqs6dqc2c9d",
	tamariz : "4c2h7d3c4h6d1s5h9s2sqh3dqc8h6s5s9hkc2djh3s8s6htc5dkd2c3h8d5cksjd8ctskhjc7sth1d4s7h4d1c9cjsqd7cqstd6c1h9d",
	siStebbins : "1c4h7stdkc3h6s9dqc2h5s8djc1h4s7dtckh3s6d9cqh2s5d8cjh1s4d7cthks3d6c9hqs2d5c8hjs1d4c7htskd3c6h9sqd2c5h8sjd",
	stay : "4h4ctdjstcjh5s3d5h3c9dqs9cqh6s2d6h2c8dks8ckh7s1d7h1c1s7d1h7ckd8skc8h2s6d2h6cqd9sqc9h3s5d3h5cjdtsjcth4s4d",
	joyal : "jh6c6h4ctd1d7c4h9c5dqh1skc7hts4sjs9hkd5s7s2cqc1hth6s9s7dqd5hkh4d3c3htc9dqs3s3d2h8c2sjc2d8h8sks1cjd5c8d6d",
	osterlind : "4htctdjsth9s6c2c7h3h8s4cjdks1s3s7d5hqc1c5sjhjcqd2d8c6skh2h6d3dts8d7c4s9d9c8h5d1d6h1h4dqsqhkc3c9h7s2s5ckd",
	nikola : "6d5ckcjh5s9d9sqh3ctcks1h4djdkdkh2dqc9cth8d2c1c7h7c4s7s9h8s6s6c2h1sjs4c5hts1djc4h2s7dqs3h3s8ctd6h5d3dqd8h",
	eightKings : "8ckh3std2c7h9s5dqc4h1s6djc8hks3dtc2h7s9d5cqh4s1d6cjh8skd3cth2s7d9c5hqs4d1c6hjs8dkc3hts2d7c9h5sqd4c1h6sjd",
	isis : "kstd3h1skc4d2h1cqs2c4h1d2sqc5d1h3sjc6dkh4stc7dqh5s9c8djh6s8c9dthqd7c3d9h8s6cjd8h9s5c7s7hts4c5h2d6hjs3ckd",

	setPosition : function(position) {
		deck.position = position;
	},

	getCard : function() {
		var code;
		code = deck[deck.current].substr(deck.position*2, 2);
		return "cards/" + code + ".svg";
	},

	changeDeck : function(order) {
		this.current = order;
	}

}

//-----------------------------------------------------------------------------
// UI CALL-BACK FUNCTIONS
//-----------------------------------------------------------------------------

var ui = {

	mode : "",

	init : function() {
		document.getElementById("cancel").style.display = "none";
		document.getElementById("choose").style.display = "inline-block";
		document.getElementById("cancel").addEventListener("click", ui.cancel, false);
		["siStebbins", "tamariz", "stay", "aronson", "joyal", "osterlind", "nikola", "eightKings", "isis"]
			.forEach(function(order) {
				document.getElementById(order).addEventListener("click", function() {
					ui.changeDeck(order);
			}, false);
		});

		ui.displayDecks();

		deck.position = Math.floor(Math.random()*52);

		document.getElementById("hCard").addEventListener("click", ui.click_card, false);
		document.getElementById("hPosition").addEventListener("click", ui.click_position, false);

		document.getElementById("currentDeck").addEventListener("click", ui.displayDecks, false);

		deck.setPosition(Math.floor(Math.random()*52));
		document.getElementById("card").src = "cards/blank_card.svg";
		document.getElementById("position").innerHTML = deck.position + 1;
		ui.mode = "queryCard";
	},

	click_card : function() {
		if(ui.mode === "queryCard") {
			document.getElementById("card").src = deck.getCard();
			ui.mode = "showCard";
		} else {
			deck.setPosition(Math.floor(Math.random()*52));
			document.getElementById("card").src = "cards/blank_card.svg";
			document.getElementById("position").innerHTML = deck.position + 1;
			ui.mode = "queryCard";
		}
	},

	click_position : function() {
		if(ui.mode === "queryPosition") {
			document.getElementById("position").innerHTML = deck.position + 1;
			ui.mode = "showPosition";
		} else {
			deck.setPosition(Math.floor(Math.random()*52));
			document.getElementById("position").innerHTML = "?";
			document.getElementById("card").src = deck.getCard();
			ui.mode = "queryPosition";
		}
	},

	displayDecks : function() {
		document.getElementById("decks").style.display = "inline-block";
		document.getElementById("currentDeck").style.display = "none";
	},

	cancel : function() {
		document.getElementById("decks").style.display = "none";
		document.getElementById("currentDeck").style.display = "block";
	},

	changeDeck : function(order) {
		document.getElementById("cancel").style.display = "inline-block";
		document.getElementById("choose").style.display = "none";
		document.getElementById("decks").style.display = "none";
		document.getElementById("currentDeck").style.display = "block";
		deck.changeDeck(order);
		document.getElementById("currentDeck").src = "images/" + order + ".png";
	},


}

//-----------------------------------------------------------------------------
// ALL START HERE
//-----------------------------------------------------------------------------

function init() {
	ui.init();
}
