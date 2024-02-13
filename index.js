// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let newEmployee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee;
}

function createEmployeeRecords(arrayOfEmployees) {
    let employeeRecord = []
    for (let employeeArray of arrayOfEmployees) {
        employeeRecord.push(createEmployeeRecord(employeeArray));
    }
    return employeeRecord;
}

function createTimeInEvent(employeeRecordObject, dateStamp="YYYY-MM-DD HHMM") {
    let timeInEvent = {
        type: `TimeIn`,
        hour: parseInt(dateStamp.substring(11)),
        date: `${dateStamp.substring(0, 10)}`
    }
    employeeRecordObject.timeInEvents.push(timeInEvent);
    return employeeRecordObject;
}

function createTimeOutEvent(employeeRecordObject, dateStamp="YYYY-MM-DD HHMM") {
    let timeOutEvent = {
        type: `TimeOut`,
        hour: parseInt(dateStamp.substring(11)),
        date: `${dateStamp.substring(0, 10)}`
    }
    employeeRecordObject.timeOutEvents.push(timeOutEvent);
    return employeeRecordObject;
}

function hoursWorkedOnDate(employeeRecordObject, dateStamp="YYYY-MM-DD") {
    let arrayIn = employeeRecordObject.timeInEvents;
    let arrayOut = employeeRecordObject.timeOutEvents;
    let stamps = [];
    for (let i = 0; i < arrayIn.length; i++) {
        if (arrayIn[i]['date'] === dateStamp) {
            stamps.push(arrayIn[i]['hour']);
            stamps.push(arrayOut[i]['hour']);
        } else if (arrayIn[i]['date'] === undefined) {
            alert(`Error: missing time-in punch for this date for ${arrayOut[i]['date']}`);
            break;
        }
    }
    return (stamps[1] - stamps[0]) / 100;
}

function wagesEarnedOnDate(employeeRecordObject, dateStamp="YYYY-MM-DD") {
    let hoursWorked = hoursWorkedOnDate(employeeRecordObject, dateStamp);
    return hoursWorked * employeeRecordObject.payPerHour;
}

function allWagesFor(employeeRecordObject) {
    let dates = employeeRecordObject.timeInEvents;
    let total = 0;
    for (let date of dates) {
        total += wagesEarnedOnDate(employeeRecordObject, date['date'])
    }
    return total;
}

function calculatePayroll(arrayOfEmployeeObjects) {
    let total = 0;
    for (let employee of arrayOfEmployeeObjects) {
        total += allWagesFor(employee);
    }
    return total;
}