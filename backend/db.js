const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./backend/database.db");

db.run(
  "CREATE TABLE IF NOT EXISTS portfolio_entries ( ID INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT, portfolio_type TEXT, creation_date INTEGER, thumbnail_id INTEGER, additional_description TEXT, link TEXT, FOREIGN KEY(thumbnail_ID) REFERENCES images(ID) )"
);

db.run(
  "CREATE TABLE IF NOT EXISTS images ( ID INTEGER NOT NULL PRIMARY KEY, associated_entry_ID	INTEGER NOT NULL, image_path TEXT NOT NULL, alt_text TEXT, image_type TEXT, FOREIGN KEY(associated_entry_ID) REFERENCES portfolio_entries(ID) )"
);

// db.run(
//   'INSERT INTO images (associated_entry_ID, image_path, alt_text, type) VALUES (1, "images/funkyImage.png", "a funky image", "normal")'
// );

exports.getAllPortfolioEntries = function (callback) {
  const query =
    "SELECT * FROM portfolio_entries LEFT JOIN images ON portfolio_entries.thumbnail_id = images.ID;";
  db.all(query, function (error, portfolio_entries) {
    callback(error, portfolio_entries);
  });
};

exports.createPortfolioEntry = function (
  title,
  description,
  portfolio_type,
  thumbnail_id,
  additionalDescription,
  link,
  callback
) {
  const currentTime = new Date();
  const postDate = currentTime.getTime();
  const query =
    "INSERT INTO portfolio_entries (title, description, creation_date, portfolio_type, thumbnail_id, additionalDescription, link) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    title,
    description,
    postDate,
    portfolio_type,
    thumbnail_id,
    additionalDescription,
    link,
  ];
  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.getPortfolioEntryByID = function (id, callback) {
  console.log("im in the database");
  const query =
    "SELECT p.ID as portfolio_id, p.title, p.description, p.portfolio_type, p.creation_date, p.thumbnail_id, p.additional_description, p.link, i.ID as image_id, i.image_path, i.alt_text, i.image_type FROM portfolio_entries AS p LEFT JOIN images AS i ON p.ID = i.associated_entry_id WHERE p.ID = ?;";
  const values = [id];
  db.all(query, values, function (error, entry) {
    callback(error, entry);
  });
};

exports.updatePortfolioEntry = function (entry, callback) {
  let query;
  let values;
  if (entry.thumbnail_id == undefined) {
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, portfolio_type = ?, additional_description = ?, link = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.portfolio_type,
      entry.additionalDescription,
      entry.link,
      entry.ID,
    ];
  } else {
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, portfolio_type = ?, additional_description = ?, link = ?, thumbnail_id = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.portfolio_type,
      entry.additionalDescription,
      entry.link,
      entry.thumbnail_id,
      entry.ID,
    ];
  }
  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.deletePortfolioEntry = function (id, callback) {
  const query = "DELETE FROM portfolio_entries WHERE ID = ?";
  const values = [id];
  db.get(query, values, function (error) {
    callback(error);
  });
};

exports.getAllImages = function (callback) {
  const query = "SELECT * FROM images";
  db.all(query, function (error, images) {
    callback(error, images);
  });
};

exports.getImagesByEntryID = function (id, callback) {
  const query = "SELECT * FROM images WHERE associated_entry_ID = ?";
  const values = [id];
  db.all(query, values, function (error, images) {
    callback(error, images);
  });
};
