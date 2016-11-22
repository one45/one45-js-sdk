'use strict';

import rest from '../src/rest';

describe('The Rest module', () => {

  describe('The get params serialization function', () => {

    it('should generate an empty string when params is empty', () => {
      expect(rest._serializeParams({})).to.equal('');
    });

    // TODO: write a test for non-empty params
    // expected result is in format: ?param1=val1&param2=val2

    // TODO: write a test to check that empty params (e.g. null, undefined, '')
    // are not part of the result string
    // WRONG: {param1: '', param2: 'test'} => ?param1=&param2=test
    // RIGHT: {param1: '', param2: 'test'} => ?param2=test

  });

});
