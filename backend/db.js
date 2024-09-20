const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");

db.run(
    "CREATE TABLE IF NOT EXISTS portfolio_entries ( ID INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT, type TEXT, creation_date INTEGER, thumbnail_image_path TEXT, additional_image_path TEXT, additional_description TEXT )"
  );

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
    thumbnailImagePath,
    additionalImagePath,
    additionalDescription,
    callback
  ) {
    const currentTime = new Date();
    const postDate = currentTime.getTime();
    const query =
      "INSERT INTO portfolio_entries (title, description, creation_date, type, thumbnailImagePath, additionalImagePath, additionalDescription) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, description, postDate, type, thumbnailImagePath, additionalImagePath, additionalDescription];
    db.run(query, values, function (error) {
      callback(error);
    });
  };

  exports.selectPortfolioEntry = function (id, callback) {
    const query = "SELECT * FROM portfolio_entries WHERE ID = ? ";
    const values = [id];
    db.get(query, values, function (error, entry) {
      callback(error, entry);
    });
  };

  exports.updatePortfolioEntry = function (
    title,
    description,
    type,
    thumbnailImagePath,
    additionalImagePath,
    additionalDescription,
    callback
  ) {
    let query;
    let values;
    if (thumbnailImagePath == undefined) {
      query =
        "UPDATE portfolio_entries SET title = ?, description = ?, type = ?, additional_description = ? WHERE ID = ?";
      values = [title, description, type, additionalDescription, id];
    } else {
      query =
        "UPDATE portfolio_entries SET title = ?, description = ?, type = ?, additional_description = ?, thumbnail_image_path = ? WHERE ID = ?";
      values = [title, description, type, additionalDescription, thumbnailImagePath, id];
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