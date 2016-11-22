'use strict';

import core from '../src/core';

describe('The Core module', () => {

  let keys = [
    'SERVER_URL', 'CLIENT_KEY', 'CLIENT_SECRET',
    'ACCESS_TOKEN', 'REFRESH_TOKEN', 'CURRENT_USER'
  ];

  let forIn = (obj, fn) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) { fn(key, obj[key], obj); }
    }
  };

  beforeEach(() => {
    core.keys.forEach(key => core[key] = null);
  });

  it('contains all the properties needed for authentication', () => {
    keys.forEach(key =>
      expect(core.keys).to.include(key)
    );
  });

  describe('The isValid function', () => {
    it('should return false for invalid keys', () => {
      expect(core.isValid('banana')).to.be.false;
      expect(core.isValid({})).to.be.false;
    });

    it('should return true for valid keys', () => {
      keys.forEach(key => expect(core.isValid(key)).to.be.true);
    });
  });

  describe('The set function', () => {

    it('ignores any attempts to set properties that are invalid', () => {
      core.set('banana', 'apple');
      expect(core.get('banana')).to.be.null;
    });

  });

  describe ('The get function', () => {

    let mockData = {
      SERVER_URL: 'test.url.com',
      CLIENT_KEY: 'clientkey',
      CLIENT_SECRET: 'clientsecret',
      ACCESS_TOKEN: 'accesstoken',
      REFRESH_TOKEN: 'refreshtoken'
    };

    beforeEach(() =>
      forIn(mockData, (key, val) => core.set(key, val))
    );

    it('returns null for any non-existing keys', () => {
      expect(core.get('potato')).to.be.null;
    });

    it('returns back the expected values for valid keys', () => {
      forIn(mockData, (key, val) =>
        expect(core.get(key)).to.equal(mockData[key])
      );
    });

  });

});
