const Place = require("../models/place");
const User = require("../models/user");
const Category = require("../models/category");
const router = require("express").Router();
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");

router.get("/", (req, res) => {
  Place.find({}, (err, Places) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(Places);
  });
});

router.post("/view", (req, res) => {
  let findArgs = {};
  if (req.body.filters) {
    //findArgs = req.body.filters[0];
    if (req.body.filters[0].name)
      findArgs = { name: { $regex: "/*" + req.body.filters[0].name + "/*" } };
    else findArgs = req.body.filters[0];
  }

  let order = "desc";
  let sortBy = "createdAt";
  let limit = 1000;
  if (!findArgs) limit = 5;
  Place.find(findArgs)
    .sort([["createdAt", "desc"]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({
        size: articles.length,
        articles,
      });
    });
});

router.post("/article", auth, (req, res) => {
  let newPlace = {
    author: req.userid,
    name: req.body.name,
    description: req.body.description,
    tag: req.body.category,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    images: req.body.images,
    comments: [],
    likes: 0,
  };
  console.log(newPlace);
  const place = new Place(newPlace);
  place.save((err, doc) => {
    if (err) return res.status(401).json({ addSuccess: false, message: err });
    let tag = req.body.category;
    Category.find({ name: tag }, (err2, ctgry) => {
      if (err2 || ctgry.length === 0) {
        const category = new Category({ name: tag });
        category.save((err, doc2) => {
          if (err) {
            console.log("Error in adding category");
          }
        });
      }
    });

    res.status(200).json({
      addSuccess: true,
      article: doc,
    });
  });
});

router.post("/comment", auth, (req, res) => {
  console.log(req.body);
  const text = req.body.text;
  const uid = req.userid;
  Place.findOneAndUpdate(
    { _id: req.query.id },
    { $push: { comments: { uid: uid, text: text } } },
    { new: true },
    (err, doc) => {
      if (err)
        return res.status(401).json({ editsuccess: false, message: err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

const SaveCategoryToTag = (id, ctgry) => {
  Place.findOneAndUpdate(
    { _id: id },
    { tag: ctgry },
    { new: true },
    (err, doc) => {}
  );
  console.log("new tag added to Place");
};
router.get("/articles", (req, res) => {
  let order = "desc";
  let sortBy = "createdAt";

  Place.find()
    .stream()
    .on("data", function (doc) {
      if (doc.category && !doc.tag) {
        console.log("categoryid", doc.category);
        let ctgryname;
        Category.find({ _id: doc.category }, (err2, ctgry) => {
          if (ctgry.length > 0) {
            ctgryname = ctgry[0].name;
            console.log("category", ctgryname);
            console.log("save category name to tag");
            //SaveCategoryToTag(doc._id, ctgryname)
          }
        });
      } else if (doc.tag) {
        console.log(doc.tag, doc.name);
        //     console.log('tag ',doc.tag)
      }
    })
    .on("error", function (err) {
      console.log("error");
    })
    .on("end", function () {
      //final callback
      console.log("end");
    });
  // each(function(err, item){
  // console.log(item.category)
  //})

  Place.find()
    .populate("category")
    .sort([[sortBy, order]])
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

router.get("/article", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  let id = req.query.id;

  Place.find({ _id: id })
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

router.post("/like", auth, (req, res) => {
  Place.findOneAndUpdate(
    { _id: req.query.id },
    { $inc: { likes: 1 } },
    { new: true },
    (err, doc) => {
      if (err)
        return res.status(401).json({ editSuccess: false, message: err });
      User.findOneAndUpdate(
        { _id: req.userid },
        { $push: { likes: { id: mongoose.Types.ObjectId(req.query.id) } } },
        { new: true },
        (err, doc) => {
          if (err)
            return res.status(401).json({ editsuccess: false, message: err });
          res.status(200).json({ editSuccess: true });
        }
      );
    }
  );
});

router.post("/dislike", auth, (req, res) => {
  Place.findOneAndUpdate(
    { _id: req.query.id },
    { $inc: { likes: -1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Place update error", err);
        return res.status(401).json({ editSuccess: false, message: err });
      }
      console.log("decrimented Place likes");
      User.findOneAndUpdate(
        { _id: req.userid },
        { $pull: { likes: { id: mongoose.Types.ObjectId(req.query.id) } } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("user error", err);
            return res.status(401).json({ editSuccess: false, message: err });
          }
          console.log("decrimented user likes");
          res.status(200).json({
            editSuccess: true,
          });
        }
      );
    }
  );
});

router.post("/update", auth, (req, res) => {
  console.log(req.body);
  if (req.body.author != req.userid) {
    return res.status(401).json({
      editSuccess: false,
      message: "You are not alowwed to edit the tweet",
    });
  }
  Place.findOneAndUpdate(
    { _id: req.query.id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err)
        return res.status(401).json({ editSuccess: false, message: err });

      res.status(200).json({
        tweet: doc,
        editSuccess: true,
      });
    }
  );
});
router.delete("/", auth, (req, res) => {
  if (req.query.author != req.userid) {
    return res.status(401).json({
      editSuccess: false,
      message: "You are not alowwed to delete the tweet",
    });
  }
  Place.findOneAndDelete({ _id: req.query.id }, (err, doc) => {
    if (err) return res.status(401).json({ editSuccess: false, message: err });

    User.find({}, (err, users) => {
      users.map((u) => {
        u.likes.map((l) => {
          if (l.id === req.query.id) {
            User.findOneAndUpdate(
              { _id: u._id },
              {
                $pull: { likes: { id: mongoose.Types.ObjectId(req.query.id) } },
              },
              { new: true },
              (err, doc) => {
                if (err) {
                  console.log("user error", err);
                  return res
                    .status(401)
                    .json({ editSuccess: false, message: err });
                }
                console.log("decrimented user likes");
                res.status(200).json({
                  editSuccess: true,
                });
              }
            );
          }
        });
      });
    });

    res.status(200).json({
      editSuccess: true,
    });
  });
});
module.exports = router;
