const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const IS_LOGGED_IN_BACKEND = true;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./frontend/public/images/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + " - " + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image file"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.get("/portfolioEntries", (req, res) => {
  db.getAllPortfolioEntries((error, portfolioEntries) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve portfolio entries." });
    } else {
      res.status(200).json(portfolioEntries);
      console.log("Successfully retrieved portfolio entries.");
      console.log(portfolioEntries);
    }
  });
});

app.get("/Entry/:ID", (req, res) => {
  console.log("lets get the entry");
  const ID = req.params.ID;
  db.getPortfolioEntryByID(ID, (error, portfolioEntryData) => {
    if (error) {
      res.status(500).json({ error });
    } else if (portfolioEntryData.length === 0) {
      res.status(404).json({ error: "Portfolio entry not found." });
    } else {
      console.log(portfolioEntryData);
      const portfolioEntry = {
        ID: portfolioEntryData[0].portfolio_id, // Take portfolio data from the first entry
        title: portfolioEntryData[0].title,
        description: portfolioEntryData[0].description,
        portfolio_type: portfolioEntryData[0].portfolio_type,
        creation_date: portfolioEntryData[0].creation_date,
        thumbnail_id: portfolioEntryData[0].thumbnail_id,
        additional_description: portfolioEntryData[0].additional_description,
        link: portfolioEntryData[0].link,
        images: portfolioEntryData.map((entry) => ({
          ID: entry.image_id,
          image_path: entry.image_path,
          alt_text: entry.alt_text,
          type: entry.image_type,
          display_order: entry.display_order,
        })), // Map over all entries to collect images
      };

      res.status(200).json(portfolioEntry);
      console.log("Successfully retrieved portfolio entry.");
      console.log(portfolioEntry);
    }
  });
});

app.get("/images", (req, res) => {
  db.getAllImages((error, images) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve images." });
    } else {
      res.status(200).json(images);
      console.log("Successfully retrieved images.");
      console.log(images);
    }
  });
});

app.get("/imagesByEntry/:ID", (req, res) => {
  const ID = req.params.ID;
  db.getImagesByEntryID(ID, (error, images) => {
    if (error) {
      res.status(500).json({ error: "Failed to retrieve images." });
    } else {
      res.status(200).json(images);
      console.log("Successfully retrieved images.");
      console.log(images);
    }
  });
});

app.get("/thumbnailByEntry/:ID", (req, res) => {
  //TODO: change name of function, cause we are using it for both images and thumbnails
  const ID = req.params.ID;
  console.log("lets get the thumbnail");
  db.getThumbnailByEntryID(ID, (error, thumbnail) => {
    console.log(thumbnail);
    if (error) {
      res.status(500).json({ error: "Failed to retrieve thumbnail." });
    } else {
      res.status(200).json(thumbnail);
      console.log("Successfully retrieved thumbnail.");
      console.log(thumbnail);
    }
  });
});

app.post("/Entry/:ID/Edit", upload.none(), (req, res) => {
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }
  const ID = req.params.ID;
  const changes = {
    ID,
    title: req.body.title,
    description: req.body.description,
    portfolio_type: req.body.portfolio_type,
    creation_date: req.body.creation_date,
    thumbnail_id: req.body.thumbnail_id,
    additional_description: req.body.additional_description,
    link: req.body.link,
  };
  db.updatePortfolioEntry(changes, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to update portfolio entry." });
    } else {
      res.status(200).json({ success: true, ID });
    }
  });
});

app.post("/Entry/:ID/Delete", (req, res) => {
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }
  const ID = req.params.ID;
  db.deletePortfolioEntry(ID, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to delete portfolio entry." });
    } else {
      res.status(200).json({ success: true, ID });
    }
  });
});

app.post("/Entry", upload.none(), (req, res) => {
  //rename the path to /Entry/Create for consistency
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }
  const newEntry = {
    title: req.body.title,
    description: req.body.description,
    portfolio_type: req.body.portfolio_type,
    creation_date: req.body.creation_date,
    thumbnail_id: req.body.thumbnail_id,
    additional_description: req.body.additional_description,
    link: req.body.link,
  };
  db.createPortfolioEntry(newEntry, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to add portfolio entry." });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

app.post("/Image/:ID/Edit", upload.none(), (req, res) => {
  console.log("editing image");
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }
  const ID = req.params.ID;
  const changes = {
    ID,
    alt_text: req.body.alt_text,
    image_type: req.body.image_type,
    display_order: req.body.display_order,
    associated_entry_ID: req.body.associated_entry_ID,
  };
  console.log(changes);
  db.updateImage(changes, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to update image." });
    } else {
      res.status(200).json({ success: true, ID });
    }
  });
});

app.post("/Image/Create", upload.single("upload"), (req, res) => {
  console.log("creating image");
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageFilePath = req.file.path;

  const newImage = {
    image_path: path.basename(imageFilePath),
    alt_text: req.body.alt_text,
    image_type: req.body.image_type,
    display_order: req.body.display_order,
    associated_entry_ID: req.body.associated_entry_ID,
  };
  db.createImage(newImage, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add image." });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

app.post("/Image/:ID/Delete", (req, res) => {
  if (!IS_LOGGED_IN_BACKEND) {
    console.log("Not logged in.");
    return res.status(401).json({ error: "Not logged in." });
    //TODO: give better feedback to user. error doesn't display on frontend
  }
  fs.unlink(
    path.join(
      __dirname,
      "..",
      "frontend",
      "public",
      "images",
      req.body.image_path
    ),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  const ID = req.params.ID;
  db.deleteImage(ID, (error) => {
    if (error) {
      res.status(500).json({ error: "Failed to delete portfolio entry." });
    } else {
      res.status(200).json({ success: true, ID });
    }
  });
});

app.listen(5000);
console.log("running");
