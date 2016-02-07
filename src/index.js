/**
  * BEM helper for generating CSS class names in JS
  * Returns a chainable API
  *
  * @author David Lindkvist
  */

class BEM {
	constructor(block) {
		this.block = block;
		this.element = undefined;
		this.modifiers = [];
		this.nonBemClasses = [];
	}

	// Set element scope
	el(elementIdentifier) {
		if (typeof elementIdentifier !== 'undefined' 
			&& elementIdentifier.toString().length) {
			this.element = elementIdentifier;
		}
		return this;
	}

	// Add BEM modifier
	is(modifier, isOn = true) {
		isOn && typeof modifier !== 'undefined' 
		     && modifier.toString().length
		     && this.modifiers.push(modifier);
		return this;
	}

	// Add other non-BEM classname to the mix
	add(className) {
		if (typeof className !== 'undefined' 
			&& className.toString().length) {
			this.nonBemClasses.push(className);
		}
		return this;
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