// dependencies ==========================================================
const inquirer = require("inquirer");
const mysql = require("mysql");

//connection ===========================================
const connection = mysql.createConnection({
  hest: "localhost",

  //your port ==========================================================
  port: 3306,

  //username ==========================================================
  user: "root",

  //password and database reference ==========================================================
  password: "Gradybum33!",
  database: "employee_db"
});
// define the start function
const start = () => {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "what would you like to do?",
      choices: [
        "view all employees",
        "view all employees by department",
        "view employee by manager",
        "add employee",
        "remove employee",
        "update employee role",
        "update employee manager"
      ]
    })
    // a switch case to run through functions depending on which choice was made
    .then(({ choices }) => {
      switch (choices) {
        case "view all employees":
          viewAllEmployees();
          break;
        case "view all employees by department":
          employeeByDept();
          break;
        case "view employee by manager":
          employeeByManager();
          break;
        case "add employee":
          addEmployee();
          break;
        case "remove employee":
          removeEmployee();
          break;
        case "update employee role":
          updateEmployeeRole();
          break;
        case "update employee manager":
          updateEmployeemanager();
          break;
        default:
          console.log("something went wrong");
      }
    });
};

const viewAllEmployees = () => {
  // select all employees
  connection.query("SELECT * FROM employees", (err, employeeList) => {
    if (err) throw err;
    // print them onto a table
    console.table(employeeList);
    start();
  });
};
const employeeByDept = () => {
  connection.query("SELECT * FROM department", (err, departmentList) => {
    if (err) throw err;
    const departments = departmentList.map((department) => {
      return department.name;
    });
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          message: "please select a department",
          choices: departments
        }
      ])
      .then(({ department }) => {
        connection.query(
          "select * from department inner join role_table on department.id = role_table.department_id inner join employees on role_table.id = employees.role_id where department.name =?;",
          department ,
          (err) => {
            if (err) throw err;

            console.log(department);
            start();
          }
        );
      });
  });
};
// to be finished
const employeeByManager = () => {
  console.log("employees by manager");
};
const addEmployee = () => {
  console.log("you chose: add employee");
  // run inquirer to enter in the new employee
  inquirer
    .prompt([
      {
        name: "employeeFirstName",
        type: "input",
        message: "please enter the first name of the employee"
      },
      {
        name: "employeeLastName",
        type: "input",
        message: "please enter the last name of the employee"
      },
      {
        name: "employeeRole",
        type: "list",
        message: "what is the role for this employee?",
        choices: [
          "orderfilling",
          "PE driver",
          "shipping",
          "RSR",
          "yard driver",
          "receiving",
          "breakpack",
          "batching"
        ]
      }
    ])
    .then(({ employeeFirstName, employeeLastName, employeeRole }) => {
      // grabbing response and inserting into table
      connection.query(
        "INSERT INTO employees  SET ? , manager_id=1, role_id=(SELECT id FROM role_table WHERE role_table.title=?)",
        [
          {
            first_name: employeeFirstName,
            last_name: employeeLastName
          },

          employeeRole
        ],
        // if an error has occured throw err. otherwise log success
        (err) => {
          if (err) throw err;
          console.log("employee added!");
          // back to main menu
          viewAllEmployees();
        }
      );
    });
};
const removeEmployee = () => {
  // create connection to database and grab all values from employee table
  connection.query("SELECT * FROM employees", (err, employeeList) => {
    //map employees table into an array
    const employees = employeeList.map((employee) => {
      // return only the first name and last name of employee
      return `${employee.first_name} ${employee.last_name}`;
    });
    if (err) throw err;
    // create prompt to
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "please select the employee",
          choices: employees
        }
      ])
      .then(({ employeeName }) => {
        connection.query(
          "DELETE FROM employees WHERE first_name=? AND last_name=?",
          employeeName.split(" "),

          (err, res) => {
            if (err) throw err;

            console.log(employeeName, " removed");
            viewAllEmployees();
          }
        );
      });
  });
};
// to be finished
const updateEmployeeRole = () => {
  console.log("update employee role");
};
// to be finished
const updateEmployeemanager = () => {
  console.log("update employee manager");
};

//connect to the server in mysql
connection.connect((err) => {
  if (err) throw err;

  start();
});
