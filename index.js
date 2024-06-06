function createEmployeeRecord(newEmployee){
    return {firstName:newEmployee[0],
            familyName:newEmployee[1],
            title:newEmployee[2],
            payPerHour:newEmployee[3],
            timeInEvents:[],
            timeOutEvents:[]}
//Behavior: Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
}


function createEmployeeRecords(employees) {
    let employeeRecords = []
    employees.forEach((employee) => employeeRecords.push(createEmployeeRecord(employee)))
    
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
   
    let hour = parseInt(dateStamp.split(" ")[1])
    let date = dateStamp.split(" ")[0]
    let timestamp = {type: "TimeIn", hour: hour, date: date,}
    employeeRecord.timeInEvents.push(timestamp)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let hour = parseInt(dateStamp.split(" ")[1])
    let date = dateStamp.split(" ")[0]
    let timestamp = {type: "TimeOut", hour: hour, date: date,}
    employeeRecord.timeOutEvents.push(timestamp)
    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date) {
   let timeout = employeeRecord.timeOutEvents.find((timestamp) => timestamp.date == date)
    let timein = employeeRecord.timeInEvents.find((timestamp) => timestamp.date == date)
    let outtime = timeout.hour
    let intime = timein.hour
    let hoursworked = (outtime - intime) / 100
    return hoursworked
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let pay = employeeRecord.payPerHour
    let wages = pay * hours
    return wages
}

function allWagesFor(employeeRecord) {
    let payOwed = []
  let dates = employeeRecord.timeInEvents.map((timeInEvent) => {return timeInEvent.date})
    for (const date of dates) {
      let wages =  wagesEarnedOnDate(employeeRecord, date)
        payOwed.push(wages)
    }
   let answer = payOwed.reduce((accumulator, wage) => accumulator + wage, 0)
    return answer
}

function calculatePayroll(employeeRecords) {
let wages = employeeRecords.map((employeeRecord) => {return allWagesFor(employeeRecord)})
 let totalwages = wages.reduce((accumulator, wage) => accumulator + wage, 0)
    return totalwages
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(entry => entry.firstName === firstName)
}


// function createEmployeeRecords(employees){
    /*let employeeRecords = [];
    for (const employee of employees) {
        employeeRecords.push(createEmployeeRecord(employee))
    }
return employeeRecords*/
    // return employees.map(employee => createEmployeeRecord(employee)) //that's actually better
//Behavior: Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
// }

// function createTimeInEvent(employee, dateTime){
    // let newTimeIn = {type: "TimeIn",
                    // hour: parseInt(dateTime.slice(11)),
                    // date: dateTime.slice(0,10)}
    // employee.timeInEvents.push(newTimeIn);
// return employee;
//Behavior: Add an Object with keys to the timeInEvents Array on the record Object:
// }

// function createTimeOutEvent(employee, dateTime){
    // let newTimeOut = {type: "TimeOut",
                    // hour: parseInt(dateTime.slice(11)),
                    // date: dateTime.slice(0,10)}
    // employee.timeOutEvents.push(newTimeOut);
// return employee;
// Behavior: Add an Object with keys to the timeOutEvents Array on the record Object:
// }

// function hoursWorkedOnDate(employee, date){ //this one was hard!
    // let start = employee.timeInEvents.indexOf(employee.timeInEvents.find(entry => entry.date === date));
    // let end = employee.timeOutEvents.indexOf(employee.timeOutEvents.find(entry => entry.date === date));
// return (employee.timeOutEvents[end].hour - employee.timeInEvents[start].hour) / 100;
//Behavior: Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
// }

// function wagesEarnedOnDate(employee, date){
    // return hoursWorkedOnDate(employee,date) * employee.payPerHour;
//Behavior: Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
// }

// function allWagesFor(employee){
    /*let hoursWorked = 0;
    for (const day of employee.timeInEvents) {
        hoursWorked += wagesEarnedOnDate(employee, day.date);
    }*/
    // return employee.timeInEvents.reduce((total, num) => total + wagesEarnedOnDate(employee, num.date), 0) //redid it as a reduce, but I think it's less readable!
//Behavior: Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...
// }

// function findEmployeeByFirstName(employees, firstName){
    // return employees.find(entry => entry.firstName === firstName)
//Behavior: Test the firstName field for a match with the firstName argument
// }

// function calculatePayroll(employees){
    /*let sumOwed = 0;
    for (const employee of employees) {
        sumOwed += allWagesFor(employee)
    }*/

// return employees.reduce((total, employee) => total + allWagesFor(employee), 0); //redid this as reduce, I still think the commented out part is easier to read, but it's not as bad as the reduce in allWagesFor()
//Behavior: Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
// }