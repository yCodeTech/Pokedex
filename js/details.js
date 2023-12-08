import * as util from "./utility.js";
import {Card} from "./modules/card.js";

function displayDetails(pokemonDetails) {
	console.log(pokemonDetails);

	const name = document.querySelector("#name");
	const number = document.querySelector("#number");
	const types = document.querySelector("#types");
	const pokemonName = pokemonDetails.species.name;
	name.textContent = pokemonName.toSentenceCase();
	number.textContent = pokemonDetails.id.toString().padStart(4, "0");

	pokemonDetails.types.forEach((type) => {
		const newLi = document.createElement("li");
		newLi.textContent = type.type.name;
		types.appendChild(newLi);
	});

	/**
	 * Image
	 */

	// const card = new Card("div", {
	// 	class: "card animate__animated animate__fadeInUp",
	// });
	// document.querySelector("body").appendChild(card.element);

	const imgURL = util.pokemonImage(pokemonDetails, null, true);

	var svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
	svgimg.setAttributeNS("http://www.w3.org/1999/xlink", "href", imgURL);
	svgimg.setAttributeNS(null, "visibility", "visible");
	svgimg.addClass("pokemon-image animate__animated hidden animate__slow");

	document.querySelector("#top").after(svgimg);

	animateCSS(".pokeball--closed", "wobble").then((message) => {
		animateCSS(".pokeball--closed", "shakeY").then((message) => {
			document.querySelector(".pokeball--open").removeClass("hidden animate__faster");
			document.querySelector(".pokeball--closed").addClass("hidden");
			animateCSS(".pokeball--open", "shakeY").then((message) => {
				animateCSS(".pokemon-image ", "zoomIn").then((message) => {
					animateCSS(".pokeball--open g", "rotateOut");
					animateCSS(".pokeball--open g:last-child", "rotateOut");

					document.querySelectorAll(".pokeball--open g").forEach((el) => {
						el.addClass("hidden");
					});
				});
				document.querySelector(".pokemon-image").removeClass("hidden");
			});
		});
	});

	/**
	 * Stats
	 */

	const stats = [];

	pokemonDetails.stats.forEach((value) => {
		const isHP = value.stat.name === "hp" ? true : false;
		const isShedinja = pokemonName === "shedinja" ? true : false;

		stats[value.stat.name] = {
			name: value.stat.name,
			base_stat: Number(value.base_stat),
			effort: Number(value.effort),
			max: calculateMaxStats(isHP, isShedinja, value.base_stat, value.effort),
		};
	});

	console.log(stats);

	/**
	 * Calculate the maximum a stat can be.
	 * Formalas from https://www.dragonflycave.com/mechanics/stats
	 *
	 * Formula for Attack, Defense, Special Attack, Special Defense, Speed:
	 * Math.floor(Math.floor((2 * BaseStat + IV + Effort) * Level / 100 + 5) * Nature)
	 *
	 * Formula for HP
	 * Math.floor((2 * BaseStat + IV + Effort) * Level / 100 + Level + 10)
	 *
	 * Stat can be manually verified by this online calculator https://pycosites.com/pkmn/stat.php
	 *
	 */
	function calculateMaxStats(isHP, isShedinja, baseStat, effort) {
		const level = 100;
		const nature = 1;
		const iv = 0;

		if (!isHP) {
			return Math.floor(Math.floor(((2 * baseStat + iv + effort) * level) / 100 + 5) * nature);
		} else {
			if (isShedinja) {
				return 1;
			}

			return Math.floor(((2 * baseStat + iv + effort) * level) / 100 + level + 10);
		}
	}
}

function init() {
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	// Update the title tag of the page.
	const name = urlParams.get("name");
	document.title = `${name.toSentenceCase()} | Pokemon`;

	util.loadData(`https://pokeapi.co/api/v2/pokemon/${id}`, false, displayDetails);
}

const animateCSS = (element, animation, prefix = "animate__") =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		const node = document.querySelector(element);

		node.classList.add(`${prefix}animated`, animationName);

		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd(event) {
			event.stopPropagation();
			node.classList.remove(`${prefix}animated`, animationName);
			resolve("Animation ended");
		}

		node.addEventListener("animationend", handleAnimationEnd, {once: true});
	});

init();
