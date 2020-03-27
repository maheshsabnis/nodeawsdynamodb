const aws = require('aws-sdk');
// the configuration for connecting to AWS DynamoDB local instance
aws.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

// create an instance of DynamoDB provoider
const dynamoDB = new aws.DynamoDB();

// define the table scehma
var params = {
    TableName: 'Employees',
    KeySchema: [{
            AttributeName: 'DepartmentName',
            KeyType: "HASH", // partition Key 
        },
        {
            AttributeName: 'EmpNo',
            KeyType: "RANGE", // Sort Key
        }
    ],

    AttributeDefinitions: [{
            AttributeName: 'DepartmentName',
            AttributeType: "S"
        },
        {
            AttributeName: 'EmpNo',
            AttributeType: "N"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

// create table
dynamoDB.createTable(params, (error, data) => {
    if (error) {
        console.log(`Unable to create table`, JSON.stringify(error));
        return;
    }
    console.log(`Table Created Successfully`, JSON.stringify(data));
});