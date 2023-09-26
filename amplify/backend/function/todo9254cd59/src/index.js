
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: '', 
    secretAccessKey: '',
    region: 'us-east-1', 
});

const ses = new AWS.SES();

exports.handler = async (event) => {
 
  try {
    const { to, subject, message, from } = JSON.parse(event.body);
    const emailParams = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: message },
        },
        Subject: { Data: subject },
      },
      Source: from,
    };
     let key = await ses.sendEmail(emailParams).promise();
    return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "*",
         
      },
      body: JSON.stringify('sending...'),
  };
} catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "*",
         
      },
      body: JSON.stringify('Error sending email'),
  };
}

};