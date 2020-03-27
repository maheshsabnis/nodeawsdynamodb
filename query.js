const aws = require('aws-sdk');
// the configuration for connecting to AWS DynamoDB local instance
aws.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

// create an instance of DynamoDB provoider
const dynamoDB = new aws.DynamoDB();

// create an instance of DocumentClient() to create JSON Documents
// in DynamoDB

const documentClient = new aws.DynamoDB.DocumentClient();
// KeyConditionExpression --> condition expression with parameter
// ExpressionAttributeNames --> The actual attribute in document
// that will be used to excute as condtion to read data
// ExpressionAttributeValues --> The value of the conditional
// attribute to extract data from document
// select * from Employees where DepartmentName='HR'
documentClient.query({
    TableName: "Employees",
    KeyConditionExpression: "#dname =:deptname",
    ExpressionAttributeNames: {
        "#dname": "DepartmentName"
    },
    ExpressionAttributeValues: {
        ":deptname": "HR"
    }
}, (error, result) => {
    if (error) {
        console.log(`Unable to add record ${error.message}`);
    } else {
        console.log(` ${JSON.stringify(result)}`)
    }
});