DROP DATABASE IF EXISTS employee_db;
-- Create the database wishes_db and specified it for use.
CREATE DATABASE employee_db;
USE employee_db;
-- Create the table tasks.
CREATE TABLE Employees (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(40) NOT NULL,
  last_name varchar(40) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id int(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role_table 
(
  id INT NOT NULL AUTO_INCREMENT, -- primary key column
  title VARCHAR(30) NOT NULL,
  salary INT(30) NOT null,
  department_id INT(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department (name) 
values 
("orderfilling"),
("shipping"),
("receiving"),
("breakpack");

-- insert into role_table 
-- 	set 
-- 		title="orderfilling",
-- 		salary=39000,
-- 		department_id=(
-- 			select id 
-- 			from department 
-- 			where department.name="orderfilling" 
-- 			limit 1
-- 		);
insert into role_table (title, salary, department_id) 
values
("orderfilling", 39000, (select id from department where name="orderfilling")),
("PE driver", 48000, (select id from department where name="receiving")),
("shipping", 39000, (select id from department where name="shipping")),
("RSR", 50000, (select id from department where name="receiving")),
("yard driver", 52000, (select id from department where name="shipping")),
("receiving", 49500, (select id from department where name="receiving")),
("breakpack", 49000, (select id from department where name="breakpack")),
("batching", 39000, (select id from department where name="receiving"));
-- fs