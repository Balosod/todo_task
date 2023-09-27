
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {

    try {
        const { to, subject, message, from } = JSON.parse(event.body);
        let accesskey;
        let secretkey;

        try {
            // Retrieve the secret by its name
            const secretName = 'tolu_ses_secret';
            const secret = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        
            // Access the secret values
            const secretData = JSON.parse(secret.SecretString);
            accesskey = secretData.accessKeyId;
            secretkey = secretData.secretAccessKey

          } catch (error) {
            console.error('Error retrieving secret:', error);
          }
          
        AWS.config.update({
            accessKeyId: `${accesskey}`, 
            secretAccessKey: `${secretkey}`,
            region: 'us-east-1', 
        });
        const ses = new AWS.SES();

        console.log("working...............")
        
        
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

        console.log("good........................")

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "*",
               
            },
            body: JSON.stringify("sent"),
        };
        } catch (error) {
            console.error('Error retrieving secret:', error);
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "*",
                
                },
                body: JSON.stringify("Error Sending Mail"),
            };   
      }
 

};