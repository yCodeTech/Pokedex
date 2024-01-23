/**
 * Custom typings for the custom methods.
 * This enables VScode's Intellisense for these methods.
 */

interface Element extends ParentNode {
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
	addClass(className: string): Element;

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
	removeClass(className: string): Element;
}

interface String {
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
	toSentenceCase(): string;

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
	toTitleCase(): string;


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
	addLeadingZeros(): string;
}

interface Number {
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
	addLeadingZeros(): string;
}
