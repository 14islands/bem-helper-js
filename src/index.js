/**
  * BEM helper for generating CSS class names in JS
  * Returns a chainable API
  *
  * @author David Lindkvist
  */

class BEM {
	constructor(block, element, modifiers = [], nonBemClasses = []) {
		this.block = block;
		this.element = element;
		this.modifiers = modifiers;
		this.nonBemClasses = nonBemClasses;
	}

	// Set element scope
	el(elementIdentifier) {
		let newBlock = this.clone()
		if (typeof elementIdentifier !== 'undefined' 
			&& elementIdentifier.toString().length) {
			newBlock.element = elementIdentifier;
		}
		return newBlock;
	}

	// Add BEM modifier
	is(modifier, isOn = true) {
		let modifiers = this.modifiers.slice();
		isOn && typeof modifier !== 'undefined' 
		     && modifier.toString().length
		     && modifiers.push(modifier);
		let newBlock = this.clone({
			modifiers: modifiers,
			nonBemClasses: this.nonBemClasses
		})
		return newBlock
	}

	// Add other non-BEM classname to the mix
	add(className) {
		let nonBemClasses = this.nonBemClasses.slice();
		if (typeof className !== 'undefined' 
			&& className.toString().length) {
			nonBemClasses.push(className);
		}
		let newBlock = this.clone({
			nonBemClasses: nonBemClasses,
			modifiers: this.modifiers
		})
		return newBlock
	}

	// Render BEM chain as full class name string
	toString() {
		let prefix = typeof this.element !== 'undefined' ? this.block + '__' + this.element : this.block;
		const classes = [prefix];
		for (let modifier of this.modifiers) {
			classes.push(prefix + '--' + modifier);
		}
		for (let extraClass of this.nonBemClasses) {
			classes.push(extraClass);
		}
		return classes.join(' ');
	}

	clone(newBlock = {}) {
		return new BEM(this.block, this.element, newBlock.modifiers, newBlock.nonBemClasses)
	}
}

// Creates BEM chain based on context type
export default function(ctx) {
	if (typeof ctx === 'object') {
		if (ctx instanceof BEM) {
			return ctx;
		}
		return new BEM(ctx.constructor.name);
	}
	else if (typeof ctx === 'string') {
		return new BEM(ctx);
	}
	throw "BEM block not of valid type";
}
