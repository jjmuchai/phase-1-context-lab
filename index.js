// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a TimeIn event
function createTimeInEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    this.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
    return this;
}

// Function to create a TimeOut event
function createTimeOutEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return this;
}

// Function to compute hours worked on a specific date
function hoursWorkedOnDate(targetDate) {
    let inEvent = this.timeInEvents.find(e => e.date === targetDate);
    let outEvent = this.timeOutEvents.find(e => e.date === targetDate);
    return (outEvent.hour - inEvent.hour) / 100;
}

// Function to compute wages earned on a specific date
function wagesEarnedOnDate(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

// Function to find an employee by first name
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(emp => emp.firstName === firstNameString);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

