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

const employees = [{
        EmpNo: 101,
        EmpName: 'Mahesh',
        DepartmentName: 'IT',
        Designation: 'Manager',
        Salary: 12000
    },
    {
        EmpNo: 102,
        EmpName: 'Ajay',
        DepartmentName: 'HR',
        Designation: 'Manager',
        Salary: 32000
    },
    {
        EmpNo: 103,
        EmpName: 'Nitin',
        DepartmentName: 'SL',
        Designation: 'Manager',
        Salary: 22000
    }
];
// iterate over the Employee Array and put (insert) each record
// in the Employees table
employees.forEach((e, i) => {
    // Item : Represents the JSON document (record) in Table
    documentClient.put({
        TableName: 'Employees',
        Item: {
            "EmpNo": e.EmpNo,
            "EmpName": e.EmpName,
            "DepartmentName": e.DepartmentName,
            "Designation": e.Designation,
            "Salary": e.Salary
        }
    }, (error, result) => {
        if (error) {
            console.log(`Unable to add record ${error.message}`);
        } else {
            console.log(`Data Inserted Successfully ${result}`)
        }
    });
});