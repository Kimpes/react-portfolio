const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./backend/database.db");

db.run(
  "CREATE TABLE IF NOT EXISTS portfolio_entries ( ID INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT, type TEXT, creation_date INTEGER, thumbnail TEXT, additional_description TEXT, link TEXT)"
);

db.run(
  "CREATE TABLE IF NOT EXISTS images ( ID INTEGER NOT NULL PRIMARY KEY, associated_entry_ID	INTEGER NOT NULL, image_path TEXT NOT NULL, alt_text TEXT, type TEXT, FOREIGN KEY(associated_entry_ID) REFERENCES portfolio_entries(ID) )"
);

// db.run(
//   'INSERT INTO images (associated_entry_ID, image_path, alt_text, type) VALUES (1, "images/funkyImage.png", "a funky image", "normal")'
// );

exports.getAllPortfolioEntries = function (callback) {
  const query = "SELECT * FROM portfolio_entries";
  db.all(query, function (error, portfolio_entries) {
    callback(error, portfolio_entries);
  });
};

exports.createPortfolioEntry = function (
  title,
  description,
  type,
  thumbnail,
  additionalDescription,
  link,
  callback
) {
  const currentTime = new Date();
  const postDate = currentTime.getTime();
  const query =
    "INSERT INTO portfolio_entries (title, description, creation_date, type, thumbnail, additionalDescription, link) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    title,
    description,
    postDate,
    type,
    thumbnail,
    additionalDescription,
    link,
  ];
  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.getPortfolioEntryByID = function (id, callback) {
  const query = "SELECT * FROM portfolio_entries WHERE ID = ? ";
  const values = [id];
  db.get(query, values, function (error, entry) {
    callback(error, entry);
  });
};

exports.updatePortfolioEntry = function (entry, callback) {
  let query;
  let values;
  if (entry.thumbnail == undefined) {
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, type = ?, additional_description = ?, link = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.type,
      entry.additionalDescription,
      entry.link,
      entry.ID,
    ];
  } else {
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, type = ?, additional_description = ?, link = ?, thumbnail = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.type,
      entry.additionalDescription,
      entry.link,
      entry.thumbnail,
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
