const { webcrypto } = require('crypto');

if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: webcrypto,
  });
}
