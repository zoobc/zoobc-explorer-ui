import CryptoJS from 'crypto-js'

const keySize = 256;
const iterations = 100;
const secretKey = process.env.REACT_APP_GRAPHQL_CLIENT_SECRET || 'client-secret-key';

function hmacEncrypt(message, key) {
  const encrypted = CryptoJS.HmacSHA256(message, key);
  return encrypted.toString(CryptoJS.enc.Base64);
}

function encrypt(payload) {
  if (!payload) {
    return null;
  }

  if (isObject(payload)) {
    payload = JSON.stringify(payload);
  }

  let salt = CryptoJS.lib.WordArray.random(128 / 8);
  let iv = CryptoJS.lib.WordArray.random(128 / 8);
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
  let encrypted = CryptoJS.AES.encrypt(payload, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return salt.toString() + iv.toString() + encrypted.toString();
}

function decrypt(payload) {
  if (!payload) {
    return null;
  }

  let salt = CryptoJS.enc.Hex.parse(payload.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(payload.substr(32, 32));
  let encrypted = payload.substring(64);
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
  let result = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8);

  return result ? (isObject(result) ? JSON.parse(result) : result) : null;
}

function isObject(val) {
  return val && {}.toString.call(val) === "[object Object]";
}

const encryption = {
  hmacEncrypt,
  encrypt,
  decrypt,
}

export default encryption
