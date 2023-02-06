var https = require('https');
require('dotenv').config()

exports.handler = async function(event, context) {
  return await doRequest(event, context);  
}

function doRequest(event, context) {
  return new Promise((resolve, reject) => {

  context.callbackWaitsForEmptyEventLoop = false

  const token = process.env.CALENDARIFIC_TOKEN;

  console.log('token:', token);

  // An object of options to indicate where to post to
  var options = {
      protocol: 'https:',
      host: 'calendarific.com',
      port: '443',
      path: `/api/v2/holidays?api_key=${token}&country=BR&year=2023`,
      method: 'GET'
  };

  console.log(options);
  // Set up the request
  
  var req = https.request(options, function(res) {
      console.log(`${new Date().toISOString()} ${options.method} ${options.protocol}//${options.host}${options.path}`);
      console.log(`statusCode: ${res.statusCode}`);
      console.log('headers:', res.headers);

      res.setEncoding('utf8');

      let responseBody = '';
      res.on('data', function (chunk) {
        responseBody += chunk;
      });

      res.on('error', function (e) {
        console.log("Got error: " + e.message);
        reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
      });

      res.on('end', function () {
        console.log('Good to Go. Response: ' + responseBody);
        resolve({
          statusCode: 200,
          body: JSON.stringify(JSON.parse(responseBody), null, 4)
        });
      });

  });

  req.end();

});
}


