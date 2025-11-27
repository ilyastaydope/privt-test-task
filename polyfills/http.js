// Polyfill for Node.js http module using fetch
// This is a minimal implementation for jose package

export const request = (options, callback) => {
  const url = `${options.protocol || 'https:'}//${options.hostname || options.host}${options.path || '/'}`;
  
  fetch(url, {
    method: options.method || 'GET',
    headers: options.headers || {},
  })
    .then(async (response) => {
      const data = await response.text();
      callback(null, {
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        on: (event, handler) => {
          if (event === 'data') handler(data);
          if (event === 'end') handler();
        },
        setEncoding: () => {},
      });
    })
    .catch((error) => {
      callback(error);
    });
};

export default { request };

