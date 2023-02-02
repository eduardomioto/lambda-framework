var https = require('https');

exports.handler = async function(event, context) {
  return await doRequest(event, context);  
}

function doRequest(event, context) {
  return new Promise((resolve, reject) => {

  context.callbackWaitsForEmptyEventLoop = false

  console.log(event.body);
  const body = JSON.parse(event.body);

  console.log(body.form_data);
  console.log(body.id);

  var post_data = JSON.stringify(body.form_data);

  // An object of options to indicate where to post to
  var options = {
      protocol: 'https:',
      host: 'localhost',
      port: '443',
      path: `definePath/${body.id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic xpto_token}`
      }
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

  // post the data
  req.write(post_data);
  req.end();

});
}


