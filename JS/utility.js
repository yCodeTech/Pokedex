/**
 * toSentenceCase()
*
 * A custom method on the String Prototype.
 * 
 * ---
 * Converts a string to sentence case, ie. converts the first letter of the
 * string to uppercase.

 * @example const myString = "my string is this";
 * myString.toSentenceCase();
 * // Returns: "My string is this"
 *
 * @returns {string} The sentence cased string.
 */
String.prototype.toSentenceCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
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
export function loadData(url, isSVG, callback) {
	fetch(url)
		.then(function (response) {
			if (!isSVG) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then(function (json) {
			callback(json);
		});
}

export function getId() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("id");
}

export function setDataToSessionStorage(itemName, data) {
	sessionStorage.setItem(itemName, JSON.stringify(data));
}
export function getDataFromSessionStorage(itemName) {
	return JSON.parse(sessionStorage.getItem(itemName));
}
export function sessionStorageExists() {
	if (getDataFromSessionStorage("allPokemon") === null) {
		return false;
	}
	return true;
}
export function getFavouritedPokemon() {
	return JSON.parse(localStorage.getItem("favouritedPokemon"));
}

// Add an id key to the a pokemon object.
export function extractID(pokemon) {
	const urlParts = pokemon.url.split("/");
	pokemon.id = urlParts[6];
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
	} else {
		return imgURL;
	}
}
