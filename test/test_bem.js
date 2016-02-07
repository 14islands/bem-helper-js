import chai from 'chai';
import BEM from '../src/index';

const assert = chai.assert;


suite('BEM block class names', () => {

  test('correct block declaration from string', () => {
    const b = BEM('block');
    assert.equal(b, 'block');
  });

  test('correct block declaration from another BEM object', () => {
    const b = BEM('block');
    const b2 = BEM(b);
    assert.equal(b2, 'block');
  });

  test('correct block declaration from ES6 class', () => {
    class TestComponent {
      constructor() {
        const b = BEM(this);
        assert.equal(b, 'TestComponent');
      } 
    }
    new TestComponent();
  });

  test('correct block declaration from ES5 class', () => {
    function TestComponent() {
      const b = BEM(this);
      assert.equal(b, 'TestComponent');
    }
    new TestComponent();
  });

});


suite('BEM element class names', () => {

  test('correct element declaration', () => {
    const b = BEM('block').el('part');
    assert.equal(b.toString(), 'block__part');
  });

  test('ignore duplicate element declaration', () => {
    const b = BEM('block').el('part1').el('part2');
    assert.equal(b.toString(), 'block__part2');
  });

});


suite('BEM modifier class names', () => {
  
  test('correct block modfifier', () => {
    const b = BEM('block').is('active');
    assert.equal(b.toString(), 'block block--active');
  });

  test('correct element modfifier', () => {
    const b = BEM('block').el('part').is('active');
    assert.equal(b.toString(), 'block__part block__part--active');
  });

  test('correct multiple block modifiers', () => {
    const b = BEM('block').is('active').is('selected');
    assert.equal(b.toString(), 'block block--active block--selected');
  });

  test('correct multiple element modfifiers', () => {
    const b = BEM('block').el('part').is('active').is('selected');
    assert.equal(b.toString(), 'block__part block__part--active block__part--selected');
  });

});


suite('conditional modifiers', () => {
  
  test('correctly added conditional block modfifier', () => {
    const b = BEM('block').is('active', true);
    assert.equal(b.toString(), 'block block--active');
  });

  test('correctly ignored conditional block modfifier', () => {
    const b = BEM('block').is('active', false);
    assert.equal(b.toString(), 'block');
  });

  test('correctly added conditional element modfifier', () => {
    const b = BEM('block').el('part').is('active', true);
    assert.equal(b.toString(), 'block__part block__part--active');
  });

  test('correctly ignored conditional element modfifier', () => {
    const b = BEM('block').el('part').is('active', false);
    assert.equal(b.toString(), 'block__part');
  });

});


suite('Mix with non BEM classes', () => {

  test('correct non BEM class added', () => {
    const b = BEM('block').add('another-class');
    assert.equal(b.toString(), 'block another-class');
  });

  test('correct multiple non BEM class added', () => {
    const b = BEM('block').add('another-class').add('yet-another-class');
    assert.equal(b.toString(), 'block another-class yet-another-class');
  });

  test('correct non BEM class added to element', () => {
    const b = BEM('block').el('part').add('another-class');
    assert.equal(b.toString(), 'block__part another-class');
  });

  test('correct non BEM class added to modifier', () => {
    const b = BEM('block').is('active').add('another-class');
    assert.equal(b.toString(), 'block block--active another-class');
  });

  test('correct non BEM class added to element modifier', () => {
    const b = BEM('block').el('part').is('active').add('another-class');
    assert.equal(b.toString(), 'block__part block__part--active another-class');
  });

});


suite('Empty class names', () => {

  test('should ignore empty element name correctly', () => {
    const b = BEM('block').el();
    assert.equal(b.toString(), 'block');
    const b2 = BEM('block').el('');
    assert.equal(b2.toString(), 'block');
  });

  test('should ignore empty modifier name correctly', () => {
    const b = BEM('block').is();
    assert.equal(b.toString(), 'block');
    const b2 = BEM('block').is('');
    assert.equal(b2.toString(), 'block');
  });

  test('should ignore empty non-BEM class name correctly', () => {
    const b = BEM('block').add();
    assert.equal(b.toString(), 'block');
    const b2 = BEM('block').add('');
    assert.equal(b2.toString(), 'block');
  });
});


suite('Integer class names', () => {

  test('should add weird but valid integer element name correctly', () => {
    const b = BEM('block').el(0);
    assert.equal(b.toString(), 'block__0');
  });

  test('should add integer modifier name correctly', () => {
    const b = BEM('block').is(0);
    assert.equal(b.toString(), 'block block--0');
  });

});
