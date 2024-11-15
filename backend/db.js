const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./backend/database.db");

db.run(
  "CREATE TABLE IF NOT EXISTS portfolio_entries ( ID INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT, portfolio_type TEXT, creation_date INTEGER, thumbnail_id INTEGER, additional_description TEXT, link TEXT, FOREIGN KEY(thumbnail_ID) REFERENCES images(ID) )"
);

db.run(
  "CREATE TABLE IF NOT EXISTS images ( ID INTEGER NOT NULL PRIMARY KEY, associated_entry_ID	INTEGER NOT NULL, image_path TEXT NOT NULL, alt_text TEXT, image_type TEXT, display_order INTEGER, FOREIGN KEY(associated_entry_ID) REFERENCES portfolio_entries(ID) )"
);

exports.getAllPortfolioEntries = function (callback) {
  const query =
    "SELECT p.ID as portfolio_id, p.title, p.description, p.portfolio_type, p.creation_date, p.thumbnail_id, p.additional_description, p.link, i.ID as image_id, i.image_path, i.alt_text, i.image_type, i.display_order FROM portfolio_entries AS p LEFT JOIN images AS i ON p.thumbnail_id = i.ID;";
  db.all(query, function (error, portfolio_entries) {
    callback(error, portfolio_entries);
  });
};

exports.createPortfolioEntry = function (newEntry, callback) {
  const query =
    "INSERT INTO portfolio_entries (title, description, portfolio_type, creation_date, thumbnail_id, additional_description, link) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    newEntry.title,
    newEntry.description,
    newEntry.portfolio_type,
    newEntry.creation_date,
    newEntry.thumbnail_id,
    newEntry.additional_description,
    newEntry.link,
  ];
  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.getPortfolioEntryByID = function (id, callback) {
  console.log("we're in the database");
  const query =
    "SELECT p.ID as portfolio_id, p.title, p.description, p.portfolio_type, p.creation_date, p.thumbnail_id, p.additional_description, p.link, i.ID as image_id, i.image_path, i.alt_text, i.image_type, i.display_order FROM portfolio_entries AS p LEFT JOIN images AS i ON p.ID = i.associated_entry_id WHERE p.ID = ?;";
  const values = [id];
  db.all(query, values, function (error, entry) {
    console.log(error);
    console.log(entry);
    callback(error, entry);
  });
};

exports.updatePortfolioEntry = function (entry, callback) {
  let query;
  let values;
  if (entry.thumbnail_id == undefined) {
    //TODO: this code is quite old, it should probably be refactored
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, portfolio_type = ?, creation_date = ?, additional_description = ?, link = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.portfolio_type,
      entry.creation_date,
      entry.additional_description,
      entry.link,
      entry.ID,
    ];
  } else {
    query =
      "UPDATE portfolio_entries SET title = ?, description = ?, portfolio_type = ?, creation_date = ?, additional_description = ?, link = ?, thumbnail_id = ? WHERE ID = ?";
    values = [
      entry.title,
      entry.description,
      entry.portfolio_type,
      entry.creation_date,
      entry.additional_description,
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

exports.getThumbnailByEntryID = function (id, callback) {
  //TODO: change name of function, cause we are using it for both images and thumbnails
  const query = "SELECT * FROM images WHERE ID = ?";
  const values = [id];
  db.get(query, values, function (error, thumbnail) {
    callback(error, thumbnail);
  });
};

exports.createImage = function (newImage, callback) {
  let query;
  let values;
  if (!newImage.order) {
    //the order is optional
    query =
      "INSERT INTO images (associated_entry_ID, image_path, alt_text, image_type) VALUES (?, ?, ?, ?)";
    values = [
      newImage.associated_entry_ID,
      newImage.image_path,
      newImage.alt_text,
      newImage.image_type,
    ];
  } else {
    query =
      "INSERT INTO images (associated_entry_ID, image_path, alt_text, image_type, order) VALUES (?, ?, ?, ?, ?)";
    values = [
      newImage.associated_entry_ID,
      newImage.image_path,
      newImage.alt_text,
      newImage.image_type,
      newImage.order,
    ];
  }

  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.updateImage = function (image, callback) {
  //TODO: should i verify if order is declared? it will become null if not
  const query =
    "UPDATE images SET associated_entry_ID = ?, alt_text = ?, image_type = ?, order = ? WHERE ID = ?";
  const values = [
    image.associated_entry_ID, //TODO: standardise capitalisation.
    image.alt_text,
    image.image_type,
    image.order,
    image.ID,
  ];
  db.run(query, values, function (error) {
    callback(error);
  });
};

exports.deleteImage = function (id, callback) {
  //TODO: how do i delete it from the files as well?
  const query = "DELETE FROM images WHERE ID = ?";
  const values = [id];
  db.get(query, values, function (error) {
    callback(error);
  });
};
