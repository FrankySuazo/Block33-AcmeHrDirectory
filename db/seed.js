const { client } = require("./");
const fakeEmployees = [
  { name: "Name1", department_id: 2 },
  { name: "Name2", department_id: 1 },
  { name: "Name3", department_id: 3 },
  { name: "Name4", department_id: 3 },
  { name: "Name5", department_id: 2 },
  { name: "Name6", department_id: 3 },
  { name: "Name7", department_id: 1 },
];

const deleteTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS employees;
  DROP TABLE IF EXISTS departments;
  `;
  await client.query(SQL);
};

const createTables = async () => {
  const SQL = `
      CREATE TABLE departments(
        id serial PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE employees(
        id serial PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        department_id INTEGER REFERENCES departments(id) NOT NULL
      );
    `;
  await client.query(SQL);
};

const seedDepartments = async () => {
  const SQL = `
      INSERT INTO departments(name) VALUES('HR'), ('IT'), ('FINANCE');
    `;
  await client.query(SQL);
};

const seedEmployees = async () => {
  const queryParams = dummyEmployees
    .map((employee, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
    .join(",");

  const values = dummyEmployees.flatMap((employee) => [
    employee.name,
    employee.department_id,
  ]);
  console.log(values);

  const SQL = `
        INSERT INTO employees(name, department_id) VALUES${queryParams};
      `;
  await client.query(SQL, values);
};

module.exports = async () => {
  await deleteTables();
  console.log(`deleted tables`);
  await createTables();
  console.log(`created tables`);
  await seedDepartments();
  console.log(`seeded departments`);
  await seedEmployees();
  console.log(`seeded employees`);
};
