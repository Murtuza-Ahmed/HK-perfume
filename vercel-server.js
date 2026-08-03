import handler from './dist/server/server.js';

// Vercel serverless function handler
export default async (req, res) => {
  try {
    // Construct the request URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

    // Create a fetch-style Request
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req;
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    // Call the fetch handler
    const response = await handler.fetch(fetchRequest, {}, {});

    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Set status code
    res.status(response.status);

    // Send the body
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Internal Server Error');
  }
};


