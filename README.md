# Acme HR Directory
## Overview
In this workshop you will be building an API which will allow the Acme Human Resource Department mange their employees and departments. A department can have many employees and an employee must belong to a department.
## Directions
The goal of this workshop is to successfully create the following routes:
GET /api/employees - returns array of employees
GET /api/departments - returns an array of departments
POST /api/employees - payload: the employee to create, returns the created employee
DELETE /api/employees/:id - the id of the employee to delete is passed in the URL, returns nothing
PUT /api/employees/:id - payload: the updated employee returns the updated employee
add an error handling route which returns an object with an error property.

Department
  id

  name (STRING)

Employee
  id

  name (STRING)

  created_at (TIMESTAMP)

  updated_at (TIMESTAMP)

  department_id (INTEGER) 

1. Create the departments and employees tables. 

2.Seed the tables with some data. 

3.Create express server.

4.Have express server listen. 

5.Test your routes using curl and/or Postman, again using guided practice as a reference.

6.Submit your work in the space provided. 
