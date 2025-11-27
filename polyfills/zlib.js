// Polyfill for Node.js zlib module using pako
import pako from 'pako';
import { promisify } from 'util';
import { Buffer } from 'buffer';

// Create a simple wrapper that matches Node.js zlib API
const inflateRaw = (buffer, callback) => {
  try {
    const input = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const result = pako.inflateRaw(input);
    callback(null, Buffer.from(result));
  } catch (error) {
    callback(error);
  }
};

const deflateRaw = (buffer, callback) => {
  try {
    const input = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const result = pako.deflateRaw(input);
    callback(null, Buffer.from(result));
  } catch (error) {
    callback(error);
  }
};

// Export async versions (matching jose's expected API)
export const inflateRawAsync = promisify(inflateRaw);
export const deflateRawAsync = promisify(deflateRaw);

// Export sync versions for direct use
export { inflateRaw, deflateRaw };

