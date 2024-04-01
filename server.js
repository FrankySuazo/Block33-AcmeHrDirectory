const express = require("express");
const app = express();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/notes2"
);
const { client } = require("./db");
const seed = require("./db/seed.js");
const API = require("./API");
client.connect();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = 8000;

app.use("/api", api);
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Something's Wrong" });
});

const init = async () => {
  await client.connect();
  console.log("connected to db");

  await seed();

  app.listen(port, () => {
    console.log(`Listening on port ${port} and database is seeded`);
  });
};

init();

//const init = async () => {//
// const SQL = `
//  DROP TABLE IF EXIST notes;
//  DROP TABLE IF EXIST categories;
//  CREATE TABLE categories(
//     id serial PRIMARY KEY,
//     name VARCHAR(255) NOT NULL
//  );

//  CREATE TABLE notes(
//      id serial PRIMARY KEY,
//      name VARCHAR(255),
//      txt VARCHAR(255) NOT NULL,
//      created_at TIMESTAMP DEFAULT now(),
//      updated_at TIMESTAMP DEFAULT now(),
//      ranking INTEGER DEFAULT 5 NOT NULL,
//      category_id INTEGER REFERENCES categories(id) NOT NULL
//  );

//  INSERT INTO categories(name) VALUES('SQL');
//  INSERT INTO categories(name) VALUES('Shopping');
//  INSERT INTO categories(name) VALUES('Expres');

//  INSERT INTO notes(name, ranking, txt, category_id) VALUES('note1', 1, 'learn express', (SELECT id FROM categories WHERE name = 'SQL'));
//  INSERT INTO notes(name, txt, ranking, category_id) VALUES('note2', 'write SQL queries', 3, (SELECT id FROM categories WHERE name = 'Express'));
//  INSERT INTO notes(name, txt, category_id) VALUES('note3', 'create routes', (SELECT id FROM categories WHERE name = 'Express'));
//  INSERT INTO notes(name, txt. ranking, category_id) VALUES('note4', 'Hello', 4, (SELECT id FROM categories WHERE name = 'Shopping'));
//  INSERT INTO notes(name, txt, ranking, category_id) VALUES('note5', 'goodbye', 5, (SELECT id FROM categories WHERE name = 'SQL'));
//   `;
// const response = await client.query(SQL);
// app.listen(port, () => {
//   console.log(
///     "I am listening at port " + port + " and connected to the database"
//   );
// });
//};
//
//app.get("/api/categories", async (req, res, next) => {//
//  try {
//    const SQL = `
//        SELECT * FROM  categories
//        WHERE id = $1;
//        `;
//    const response = await client.query(SQL);
//   const category_id = response.rows;
//  } catch (error) {
//   next(error);
///  }
//});
//
//app.get("/api/notes", async (req, res, next) => {//
// try {
//   const SQL = `
//      SELECT * FROM  notes
//       `;
//   const response = await client.query(SQL);
//   res.send(response.rows);
//   next(error);
// } catch (error) {
//  next(error);
//  }
//});
//
//app.post("/api/notes", async (req, res, next) => {
//  try {
//   const SQL = `
//       INSERT INTO notes(name, txt, ranking, category_id)
//        VALUES($1, $2, $3, (SELECT id from categories where name = $4))
//       RETURN *;
//        `;
//    const response = await client.query(SQL, [
//      req.body.name,
//      req.body.txt,
//      req.body.ranking,
//      req.body.categories_id,
//    ]);
//    res.send(response.rows[0]);
//  } catch (error) {
//    next(error);
//  }
//});
//
//app.put("/api/notes/:id", async (req, res, next) => {
//  try {
//    const SQL = `
//        UPDATE notes
//        SET txt=$1, ranking=$2, name=$3, category_id = (SELECT id from categories where name = $4), updated_at=now()
//        WHERE id = $5
//        RETURNING *;
//        `;
//    const response = await client.query(SQL, [
//      req.body.txt,
//      req.body.ranking,
//      req.body.name,
//      req.bodycategories_id,
//      req.params.id,
//    ]);
//    res.send(response.rows[0]);
//  } catch (error) {
//    next(error);
//  }
//});
//
//app.delete("/api/notes/:id", async (req, res, next) => {
//  try {
//   const SQL = `
//      DELETE FROM  notes
//      WHERE id = $1
//      `;
//   const response = await client.query(SQL, [req.params.id]);
//   res.send({ result: response.rows, mssg: "Successfully Deleted" });
//  } catch (error) {
//    next(error);
// }
//});
//init();
