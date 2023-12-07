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
 * Converts a string to sentence case, ie. converts the first letter of the
 * string to uppercase.

 * @example const myString = "my string is this";
 * myString.toSentenceCase();
 * // Returns: "My string is this"
 *
 * @returns {string} The sentence cased string.
 */
	toSentenceCase(): string;
}
