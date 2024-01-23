import * as util from "./utility.js";
import {Card} from "./modules/card.js";
import {types, addTypeIcon} from "./modules/display.js";
import {favourite, setIconForFavourited} from "./modules/favouriting.js";

init();

function init() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	// Update the title tag of the page.
	const name = urlParams.get("name");
	document.title = `${name.toSentenceCase()} | Pokemon`;

	util.loadData(`https://pokeapi.co/api/v2/pokemon/${id}`, false, displayDetails);

	const favBtn = document.querySelector(".favourite-btn");
	favBtn.addEventListener("click", favourite, true);
}

function displayDetails(pokemonDetails) {
	console.log("Pokemon Details:", pokemonDetails);

	util.loadData(pokemonDetails.species.url, false, extraSpeciesInfo);

	const name = document.querySelector(".top-bar__pokemon-details__name");
	const number = document.querySelector(".top-bar__pokemon-details__number");
	const pokemonName = pokemonDetails.species.name;
	name.textContent = pokemonName.toSentenceCase();
	number.textContent = pokemonDetails.id.addLeadingZeros();

	/**
	 * Add the main type as a class to the top bar and details container.
	 */
	const topBar = document.querySelector(".top-bar");
	const body = document.querySelector("body");
	const mainType = pokemonDetails.types[0].type.name;
	topBar.addClass(`box-shadow-none ${mainType}--opacity`);
	body.addClass(`${mainType}`).id = pokemonName;

	/**
	 * Back Button
	 */
	const backBtn = document.querySelector(".back-btn");
	backBtn.addEventListener("click", goBack);

	function goBack() {
		util.setDataToSessionStorage("backToSearchResults", true);

		history.back();
	}

	/**
	 * Favourite Icon
	 */
	const favIcon = document.querySelector(".favourite-btn i");
	setIconForFavourited(pokemonName, favIcon);

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

	const pokeballClosed = document.querySelector(".pokeball--closed");
	const pokeballOpen = document.querySelector(".pokeball--open");
	const pokeballOpenG = pokeballOpen.querySelectorAll("g");

	document.querySelector("#top").after(svgimg);

	animateCSS(".pokeball--closed", "wobble").then((message) => {
		animateCSS(".pokeball--closed", "shakeY").then((message) => {
			pokeballOpen.removeClass("hidden animate__faster");
			pokeballClosed.addClass("hidden");
			animateCSS(".pokeball--open", "shakeY").then((message) => {
				pokeballOpenG.forEach((el) => {
					el.addClass("animate__delay-2s");
				});

				animateCSS(".pokemon-image ", "zoomIn").then((message) => {
					pokeballOpen.style.transform = "scale(1.3) translateY(-20px)";
				});
				animateCSS(".pokeball--open g", "rotateOut");
				animateCSS(".pokeball--open g:last-child", "rotateOut");

				pokeballOpenG.forEach((el) => {
					el.addClass("hidden");
				});
				document.querySelector(".pokemon-image").removeClass("hidden");
			});
		});
	});

	/**
	 * Types
	 */
	const typesElement = types(pokemonDetails);
	// Replace the span placeholder with the types element.
	const detailsElement = document.querySelector(".details span");
	detailsElement.replaceWith(typesElement);

	/**
	 * Basic Info
	 */

	const itemPrefix = "basic-info__item";
	const contentClass = `${itemPrefix}__content`;

	const heightEl = document.querySelector(`.${itemPrefix}--height .${contentClass}`);
	const weightEl = document.querySelector(`.${itemPrefix}--weight .${contentClass}`);
	const abilityEl = document.querySelector(`.${itemPrefix}--ability .${contentClass} ul`);
	const genderEl = document.querySelector(`.${itemPrefix}--gender .${contentClass}`);
	const categoryEl = document.querySelector(`.${itemPrefix}--category .${contentClass}`);

	/**
	 * Height
	 */

	// API height is in Decimeters, so we need to divide it by 10 to get Meters.
	const height = pokemonDetails.height / 10;
	heightEl.textContent = `${height}m`;

	/**
	 * Weight
	 */

	// API weight is in Hectograms, so we need to divide it by 10 to get Kilograms.
	const weight = pokemonDetails.weight / 10;
	weightEl.textContent = `${weight}kg`;

	/**
	 * Ability
	 */

	// Create an array with just the ability names.
	let abilities = [];
	pokemonDetails.abilities.forEach((item) => {
		abilities.push(item.ability.name);
	});

	// Remove all duplicate values
	// Code from https://stackoverflow.com/a/9229821/2358222
	abilities = [...new Set(abilities)];

	abilities.forEach((ability) => {
		const li = document.createElement("li");
		li.textContent = ability.toSentenceCase();
		abilityEl.appendChild(li);
	});

	const firstAbilityEl = abilityEl.querySelector("li:first-child");
	firstAbilityEl.addClass(`main-ability ${mainType}--light`);

	/**
	 * Get some details from the main species API.
	 */
	function extraSpeciesInfo(species) {
		console.log("Extra Species Info:", species);

		/**
		 * Gender
		 */

		const genderRate = species.gender_rate;

		const genderlessIcon = genderEl.querySelector("#genderless");
		const femaleIcon = genderEl.querySelector("#female");
		const maleIcon = genderEl.querySelector("#male");

		switch (genderRate) {
			case -1: // Genderless
				genderlessIcon.removeClass("d-none");

				femaleIcon.addClass("d-none");
				maleIcon.addClass("d-none");
				break;
			case 0: // Female
				femaleIcon.addClass("d-none");
				genderlessIcon.addClass("d-none");
				break;
			case 8: // Male
				maleIcon.addClass("d-none");
				genderlessIcon.addClass("d-none");
				break;
			default: // Either
				genderlessIcon.addClass("d-none");
		}

		/**
		 * Category
		 */

		const genera = species.genera;

		genera.forEach((item) => {
			if (item.language.name === "en") {
				let category = item.genus;

				// Remove the last part of the category string.
				const categoryParts = category.split("Pokémon");
				category = categoryParts[0].trim();

				categoryEl.textContent = category;
			}
		});

		/**
		 * Legendary or Mythical status
		 */

		const isLegendary = species.is_legendary;
		const isMythical = species.is_mythical;

		const legendaryStatusEl = document.querySelector(".basic-info__item--legendary-status");
		const mythicalStatusEl = document.querySelector(".basic-info__item--mythical-status");

		if (isLegendary) {
			legendaryStatusEl.querySelector("#false").addClass("d-none");
			legendaryStatusEl.querySelector("#true").removeClass("d-none");
		}
		if (isMythical) {
			mythicalStatusEl.querySelector("#false").addClass("d-none");
			mythicalStatusEl.querySelector("#true").removeClass("d-none");
		}

		/**
		 * Description
		 */

		const descriptionEl = document.querySelector(".section--description .section__content");

		// Filter the descriptions to only get the English versions.
		// Note: In the future, this would be changed depending on the locale.
		const englishDescriptions = species.flavor_text_entries.filter((item) => {
			if (item.language.name === "en") {
				const description = item.flavor_text;
				// Remove special character gibberish, make sure it's sentence cased,
				// and capitalise the word "pokémon" and the pokémon's name.
				item.flavor_text = description
					.replace(/(\r\n|\n|\r|\f)/gm, " ")
					.toSentenceCase()
					.replace("pokémon", "Pokémon")
					.replace(pokemonName, pokemonName.toSentenceCase());

				return item;
			}
		});

		// Add only the first description in the array.
		descriptionEl.textContent = englishDescriptions[0].flavor_text;

		/**
		 * Evolution
		 */
		util.loadData(species.evolution_chain.url, false, evolutions);
	} // End extraSpeciesInfo.

	//! Evolutions is not complete.
	//? Future feature.
	function evolutions(data) {
		console.log("Evolution Chain:", data);
		const evolutionChain = data.chain;

		// Object
		var evolutions = {};

		flatten(evolutionChain.evolves_to, evolutions);
		console.log(evolutions);

		const evolutionContainerEl = document.querySelector(".section--evolution");
		const evolutionEl = evolutionContainerEl.querySelector(".evolutions");

		// If the evolutions object is empty, remove the evolution section.
		if (Object.keys(evolutions).length === 0) {
			evolutionContainerEl.remove();
		}

		for (const evolution in evolutions) {
			let evolutionName = evolutions[evolution].name;
			console.log(evolutionName);

			const item = createDiv();
			const imgContainer = createDiv();
			const img = document.createElement("img");
			const name = document.createElement("p");

			item.addClass("evolutions__item");
			imgContainer.addClass("evolutions__item__img-container");

			const imgurl = util.pokemonImage(pokemonDetails, null, true);
			img.setAttribute("src", imgurl);
			name.textContent = evolutionName;

			imgContainer.appendChild(img);
			item.appendChild(imgContainer);
			item.appendChild(name);

			// evolutionEl.appendChild(item);
		}
	}
	/**
	 * Loop through an array recursively, and create a new array that is 1 deep,
	 * ie: flatten the array.
	 *
	 * Code from https://stackoverflow.com/a/40787928/2358222
	 */
	function flatten(data, outputArray) {
		data.forEach(function (element) {
			// outputArray[element.species.name] = {
			// 	name: element.species.name,
			// 	evolution_details: element.evolution_details,
			// };

			if (Array.isArray(element.evolves_to)) {
				// outputArray.push(element.species.name);
				// outputArray.evolution_details.push(element.evolution_details);
				// outputArray[element.species.name] = element.evolution_details;

				outputArray[element.species.name] = {
					name: element.species.name,
					evolution_details: element.evolution_details,
				};
				flatten(element.evolves_to, outputArray);
			}
		});
	}

	/**
	 * Weak Against
	 */
	let weaknesses = [];
	let resists = [];

	// Each type load it's typing data and build the weaknesses.
	pokemonDetails.types.forEach((item, index) => {
		const type = item.type.name;

		util.loadData(`https://pokeapi.co/api/v2/type/${type}`, false, buildWeaknesses, index);
	});

	/**
	 * Build the Pokemon weaknesses.
	 *
	 * @param {object} data The type data.
	 * @param {number} index The index of the outer loop.
	 */
	function buildWeaknesses(data, index) {
		// Double damage from means the specific type will take the most damage from these types,
		// ie weak against these types.
		const doubleDamageFrom = data.damage_relations.double_damage_from;
		// Half/no damage from means the specific type will take the least/no damage from these types,
		// ie resists these types.
		const halfDamageFrom = data.damage_relations.half_damage_from;
		const noDamageFrom = data.damage_relations.no_damage_from;

		// Push the half and no damage arrays into resists to merge them.
		// resists.push(halfDamageFrom);
		// resists.push(noDamageFrom);
		// Flatten the arrays by 1 array, so all items are on the same level.
		// resists = resists.flat();

		// Each double damage type...
		doubleDamageFrom.forEach((item, i) => {
			// Push the name into weaknesses array to merge them.
			weaknesses.push(item.name);
		});
		// Each double damage type...
		halfDamageFrom.forEach((item, i) => {
			// Push the name into weaknesses array to merge them.
			resists.push(item.name);
		});
		// Each double damage type...
		noDamageFrom.forEach((item, i) => {
			// Push the name into weaknesses array to merge them.
			resists.push(item.name);
		});

		// Only run this next block of code if the outer loop from the pokemonDetails.types.forEach
		// is the last iteration.
		if (index === pokemonDetails.types.length - 1) {
			// console.log(data);
			let filteredWeaknesses = [];

			// Each resist element, filter the weaknesses...
			// Note: This makes sure that any resisted type in a dual type pokemon isn't
			// added to the weaknesses.
			//? Caveat: There's some sort of bug that sometimes doesn't filter properly,
			//? and it lets through unwanted types, or removes the types that we want.

			resists.forEach((resistType) => {
				filteredWeaknesses = weaknesses.filter((weakType) => {
					// If resists array does NOT include a weak type,
					// then add the weak type to the filtered array.
					return !resists.includes(weakType);
				});
			});

			// Remove all duplicate values
			// Code from https://stackoverflow.com/a/9229821/2358222
			let weakAgainst = [...new Set(filteredWeaknesses)];

			// Set the weaknesses in to the pokemonDetails object so that it's easier to get them later.
			pokemonDetails.weak_against = weakAgainst;

			// We need to wait some milliseconds so that the final weaknesses array is added to the pokemonDetails array.
			setTimeout(displayWeakneses, 100);
		}
	}

	function displayWeakneses() {
		const weakAgainstEl = document.querySelector(".section--weak-against .section__content");

		// console.log(pokemonDetails.weak_against);

		// Get the newly added weak_against from the pokemonDetails,
		// and add the types to the page.
		pokemonDetails.weak_against.forEach((type) => {
			const div = document.createElement("div").addClass(`types__item ${type}`);

			let typeIcon = addTypeIcon(type, div, true);

			typeIcon.setAttribute("title", type);

			weakAgainstEl.append(typeIcon);
		});
	}

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
	console.log("Stats:", stats);
	for (const stat in stats) {
		let statName = stats[stat].name;
		let statMax = stats[stat].max;
		let statBase = stats[stat].base_stat;

		const statsEl = document.querySelector(".section--stats .stats");
		const statsBtnBase = document.querySelector(".section--stats .stat-btns__base");
		const statsBtnMax = document.querySelector(".section--stats .stat-btns__max");
		const statsBtnBoth = document.querySelector(".section--stats .stat-btns__both");
		statsBtnMax.addClass(`${mainType}--dark`);

		const container = createDiv();
		const title = createDiv();
		const barContainer = createDiv();
		const baseBar = createDiv();
		const maxBar = createDiv();

		container.addClass(`stats__item ${statName}`);

		statName = statName.replace("-", " ");

		if (statName === "hp") {
			statName = statName.toUpperCase();
		}
		else {
			statName = statName.toTitleCase();
		}

		title.addClass("stats__item__title").textContent = statName;
		barContainer.addClass("stats__item__barContainer");
		baseBar.addClass(`bar bar--base`).textContent = statBase;
		maxBar.addClass(`bar bar--max ${mainType}--dark`).textContent = statMax;

		container.appendChild(title);

		barContainer.appendChild(baseBar);
		barContainer.appendChild(maxBar);
		container.appendChild(barContainer);

		statsEl.appendChild(container);

		// Get the main type background colour as RGB.
		const bgColour = window.getComputedStyle(maxBar).backgroundColor;
		// Set the stats btn
		statsBtnBoth.style.background = `linear-gradient(90deg, rgba(80, 80, 80, 1) 35%, ${bgColour} 80%)`;

		statsBtnBase.addEventListener("click", function () {
			baseBar.removeClass("d-none");
			maxBar.addClass("d-none");
		});
		statsBtnMax.addEventListener("click", function () {
			maxBar.removeClass("d-none");
			baseBar.addClass("d-none");
		});
		statsBtnBoth.addEventListener("click", function () {
			maxBar.removeClass("d-none");
			baseBar.removeClass("d-none");
		});

		// Calculate width percentages from the stat base and stat max respectively
		// against the parent's width.
		let baseStatWidth = (100 * statBase) / barContainer.offsetWidth;
		let maxStatWidth = (100 * statMax) / barContainer.offsetWidth;

		const minWidth = 20; // 20%

		// If basewidth is less than min width,
		// then we need to add the min width to both the base width and max stat width,
		// so they scale correctly.
		if (baseStatWidth < minWidth) {
			baseStatWidth = baseStatWidth + minWidth;
			maxStatWidth = maxStatWidth + minWidth;
		}
		// If max stat width is more than 100%, then cap it at 100%.
		if (maxStatWidth > 100) {
			maxStatWidth = 100;
		}

		baseBar.style.width = `${baseStatWidth}%`;
		maxBar.style.width = `${maxStatWidth}%`;
	}
	// End for stats

	function createDiv() {
		return document.createElement("div");
	}

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
		}
		else {
			if (isShedinja) {
				return 1;
			}

			return Math.floor(((2 * baseStat + iv + effort) * level) / 100 + level + 10);
		}
	}
}

// From animate.css
// https://animate.style/#javascript
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
