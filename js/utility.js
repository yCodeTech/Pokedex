/**
 * toSentenceCase()
 *
 * A custom method on the String Prototype.
 * 
 * ---
 * Converts a string to sentence case, 
 * ie. converts the first letter of the each sentence of the string to uppercase.

 * @example const myString = "my string is this";
 * myString.toSentenceCase();
 * // Returns: "My string is this"
 *
 * const sentences = "this is a sentence. this is another sentence."
 * sentences.toSentenceCase();
 * // Returns: "This is a sentence. This is another sentence."
 *
 * @returns {string} The sentence cased string.
 */
String.prototype.toSentenceCase = function () {
	let sentences = this.toLowerCase().split(". ");
	sentences.forEach((sentence, i) => {
		sentences[i] = sentence.charAt(0).toUpperCase() + sentence.slice(1);
	});
	return sentences.join(". ");
};

/**
 * toTitleCase()
 *
 * A custom method on the String Prototype.
 *
 * ---
 * Converts a string to title case,
 * ie. converts the first letter of each word of the string to uppercase.
 *
 * Code from https://stackoverflow.com/a/196991/2358222
 *
 * @example const myString = "my string is this";
 * myString.toTitleCase();
 * // Returns: "My String Is This"
 *
 * @returns {string} The title cased string.
 */
String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

/**
 * addLeadingZeros()
 *
 * A custom method on the String Prototype.
 *
 * ---
 * Adds leading zeros if necessary to the number to make it 4 digits.
 *
 * @example const num = "4";
 * const largeNum = "230";
 *
 * num.addLeadingZeros();
 * // Returns: "0004"
 *
 * largeNum.addLeadingZeros();
 * // Returns: "0230"
 *
 * @returns {string} The string of a number (made up of 4 digits) with the leading zeros.
 */
String.prototype.addLeadingZeros = function () {
	return this.padStart(4, "0");
};

/**
 * addLeadingZeros()
 *
 * A custom method on the Number Prototype.
 *
 * ---
 * Converts a number to a string and adds leading zeros if necessary to make the number 4 digits.
 *
 * @example
 * const num = 5;
 * const largeNum = 230;
 *
 * num.addLeadingZeros();
 * // Returns: "0005"
 *
 * largeNum.addLeadingZeros();
 * // Returns: "0230"
 *
 * @returns {string} The string of a number (made up of 4 digits) with the leading zeros.
 */
Number.prototype.addLeadingZeros = function () {
	return this.toString().padStart(4, "0");
};

/**
 * addClass()
 *
 * A custom method on the Element Prototype. Inspired by
 * the jQuery method of the same name.
 *
 * ---
 * A shorter way to add a class to an element.
 *
 * @param {string} className A single class name or multiple separate by a space.
 *
 * @example myElement.addClass("newClass");
 * myElement.addClass("newClass anotherClass");
 *
 * @returns {Element} The element, enabling it to be chained, eg:
 * @example myElement.addClass("newClass").setAttribute("id", "someId");
 */
Element.prototype.addClass = function (className) {
	const element = this;
	const classes = className.split(" ");
	classes.forEach(function (name) {
		element.classList.add(name);
	});

	return element;
};

/**
 * removeClass()
 *
 * A custom method on the Element Prototype. Inspired by
 * the jQuery method of the same name.
 *
 * ---
 * A shorter way to remove a class from an element.
 *
 * @param {string} className A single class name or multiple separate by a space.
 *
 * @example myElement.removeClass("class");
 * myElement.removeClass("class anotherClass");
 *
 * @returns {Element} The element, enabling it to be chained, eg:
 * @example myElement.removeClass("class").setAttribute("id", "someId");
 */
Element.prototype.removeClass = function (className) {
	const element = this;

	const classes = className.split(" ");
	classes.forEach(function (name) {
		element.classList.remove(name);
	});

	return element;
};

/**
 * loadData
 * @param {string} url
 * @param {function} callback
 */
export function loadData(url, isSVG, callback, index = null) {
	fetch(url)
		.then(function (response) {
			if (!isSVG) {
				return response.json();
			}
			else {
				return response.text();
			}
		})
		.then(function (json) {
			callback(json, index);
		});
}

export function setDataToSessionStorage(itemName, data) {
	if (itemName === "allPokemon") {
		addPokemonIds(data);
	}
	sessionStorage.setItem(itemName, JSON.stringify(data));
}
export function getDataFromSessionStorage(itemName) {
	return JSON.parse(sessionStorage.getItem(itemName));
}
export function sessionStorageExists(name) {
	if (getDataFromSessionStorage(name) === null) {
		return false;
	}
	return true;
}
export function getFavouritedPokemon() {
	return JSON.parse(localStorage.getItem("favouritedPokemon"));
}

// Add an id key to the pokemon object.

/**
 * Add the IDs to each pokemon array element.
 * Because the original API array result doesn't have it set as a key and
 * only part of the URL. So we'll extract it from the URL and add it manually for
 * ease of use later.
 *
 * @param {array} pokemon The individual pokemon array element.
 */
export function addPokemonIds(data) {
	// Each pokemon...
	data.forEach((pokemon) => {
		// Split the pokemon url into parts.
		const urlParts = pokemon.url.split("/");
		// Get the ID from the url parts and set it into the pokemon array element.
		pokemon.id = urlParts[6];
	});
}

export function pokemonImage(data, card, returnable = false) {
	const imgSprites = data.sprites;
	const img3D = imgSprites.other["home"].front_default;
	const imgOfficialArt = imgSprites.other["official-artwork"].front_default;
	const imgBasic = imgSprites.front_default;

	let imgURL = img3D;

	if (img3D === null) {
		imgURL = imgOfficialArt;

		if (imgOfficialArt === null) {
			imgURL = imgBasic;
		}
	}
	if (returnable === false) {
		card.createImg(imgURL);
	}
	else {
		return imgURL;
	}
}

/**
 * Remove all displayed pokemon from the container.
 */
export function removeAll() {
	const pokemonContainer = document.querySelector(".pokemon");
	// Remove all child elements
	while (pokemonContainer.firstChild) {
		pokemonContainer.removeChild(pokemonContainer.firstChild);
	}
	// Remove some classes
	pokemonContainer.removeClass("all-pokemon favourited-pokemon");
}

/**
 * Is the current page the home page?
 * @returns {bool} true/false
 */
export function isHomePage() {
	return document.URL.includes("index.html") || window.location.pathname === "/";
}

/**
 * Is the current page the favourites page?
 * @returns {bool} true/false
 */
export function isFavouritesPage() {
	return document.URL.includes("favourites.html");
}

/**
 * Is the current page the favourites page?
 * @returns {bool} true/false
 */
export function isDetailsPage() {
	return document.URL.includes("details.html");
}
