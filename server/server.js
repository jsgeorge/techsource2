const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();

const mongoose = require("mongoose");
const async = require("async");

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/react/techsource2"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
//Models
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Product } = require("./models/product");
const { Category } = require("./models/category");

//=================================
//             PRODUCTS
//=================================
app.post("/api/products/article", (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ addSuccess: false, err });
    res.status(200).json({
      addSuccess: true,
      article: doc
    });
  });
});

app.get("/api/products/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    //Product.find({ _id: items })
    .populate("brand")
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

//Get Products
//
//SORT PRODUCTS
//By Arrival
// /articles?sortBy=createdAt&order=desc&limit=5

//By Sell date
// /articles?sortBy=sold&order=Desc&limit=5

app.post("/api/products/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        //price range
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        //other filters
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  Product.find(findArgs)
    .populate("brand")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles
      });
    });
});

app.get("/api/products/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("brand")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});
//filter by category
// /articles?category=phones

//=================================
//             BRANDS
//=================================

app.post("/api/products/brand", (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ addSuccess: false, err });
    res.status(200).json({
      addSuccess: true,
      brand: doc
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

//=================================
//             CATEGORY
//=================================

app.post("/api/products/category", (req, res) => {
  const category = new Category(req.body);
  console.log(category);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc
    });
  });
});

app.get("/api/product/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

app.get("/api/product/categories/id", (req, res) => {
  let category = req.body.category;
  console.log(category);

  Category.find({ name: category }, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

//default
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
