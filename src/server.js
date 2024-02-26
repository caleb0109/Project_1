const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleHead = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } 
  else {
    jsonHandler.notRealMeta(request, response);
  }
};

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addUser') {
    const body = [];
    const resp = response;

    request.on('error', (err) => {
      console.dir(err);
      resp.statusCode = 400;
      resp.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addUsers(request, resp, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } 
  else if (parsedURL.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } 
  else if (parsedURL.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } 
  else {
    jsonHandler.notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } 
  else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } 
  else {
    handleHead(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});