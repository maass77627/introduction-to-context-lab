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

