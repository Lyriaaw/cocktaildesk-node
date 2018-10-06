const assert = require('assert');
import {
   search,
   multiply
 } from '../src/cocktails';

describe('Cocktails', function() {
  describe('search', function() {
    it('should return the same value', function() {
      assert.equal(search('hello'), 'hello');
    });

    it('Should return 25 when feed with 5', () => {
      assert.equal(multiply(5), 25)
    })
  });
});
