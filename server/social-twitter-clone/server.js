var cors = require("cors");
var bodyparser = require("body-parser");
var fileupload = require("express-fileupload");
var db = require("./db/index");

var express = require("express");
const { sequelize } = require("./db/index");
const user = require("./db/user");
const { Op, Sequelize } = require("sequelize");
var app = express();

const PORT = 3001;

app.use(express.static("public"));

app.use(cors());
app.use(bodyparser.json());
app.use(fileupload());

// console.log(sequelize)
db.sequelize.authenticate();
db.sequelize.sync({ alter: true }).then(async () => {
  console.log("database connected");
});

app.post("/Addpost", async function (req, res) {
  // console.log(JSON.stringify(req.body, null, 2));
  // console.log("-----");
  console.log(req.body);
  // console.log(req.body.userId);

  let add = await db.post.create({
    username: req.body.username,
    description: req.body.description,
    userId: req.body.uid,
    postImg: req.body.photoUrl,
  });
  res.send({ data: add, status: "post added" });
});

app.post("/addUser", async function (req, res) {
  let { displayName, photoURL, email, full_name } = req.body;
  try {
    console.log("adding user");
    let user = await db.user.create({
      id: req.body.userId,
      displayName,
      photoURL,
      email,
      full_name,
    });
    res.status(200).send({ user, message: "user added to database" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/Allpost", async function (req, res) {
  console.log(req.body.userId);
  let posts = await db.post.findAll({
    include: [
      { model: db.user, as: "user", attributes: ["photoURL", "displayName"] },
    ],
    order: [["updatedAt", "DESC"]],
    limit: 10,
    offset: 0,
  });
  const [likes, metadata] = await sequelize.query(
    "SELECT id,postId,userId, COUNT(postId) as likesCount FROM likeTables GROUP BY postId "
  );
  let likedPosts = await db.likeTable.findAll({
    where: {
      userId: req.body.userId,
    },
  });
  res.send({ data: posts, likes, likedPosts });
});

app.post("/mypost", async function (req, res) {
  const [likes, metadata] = await sequelize.query(
    "SELECT id,postId,userId, COUNT(postId) as likesCount FROM likeTables GROUP BY postId "
  );
  let follower = await sequelize.query(
    "SELECT followerId, COUNT(followerId) as followersCount FROM follow_tables GROUP BY followerId "
  );
  let mypost;
  console.log(req.body.userName);
  let user = await db.user.findOne({
    where: {
      displayName: req.body.userName,
    },
  });
  if (user) {
    mypost = await db.post.findAll({
      include: [
        { model: db.user, as: "user", attributes: ["photoURL", "displayName"] },
      ],
      order: [["updatedAt", "DESC"]],
      where: {
        userId: user.id,
      },
    });
  } else {
    return res.status(404).send({ message: "user not found " });
  }
  res.send({ data: mypost, likes, follower });
});

app.post("/mylikes", async function (req, res) {
  const allLikes = await db.likeTable.findAll({
    where: { postId: req.body.id, userId: req.body.userId },
  });

  if (allLikes.length <= 0) {
    const likeTable = await db.likeTable.create({
      postId: req.body.id,
      userId: req.body.userId,
    });
    console.log("creating", likeTable);
    return res.send({ data: likeTable });
  } else {
    const deletelike = await db.likeTable.destroy({
      where: {
        postId: req.body.id,
        userId: req.body.userId,
      },
    });
    console.log("deleting", deletelike);
    return res.send({ data: deletelike });
  }
});
// res.send({data:mylike})
// });

// app.post("/totallike", async function (req, res) {
//   let result = await db.like.findAll({
//     include: [
//       {
//         model: db.post,
//         as: "post",
//         required: false,
//       },
//     ],
//     where: {
//       postId: req.body.postId,
//     },
//   });
//   res.send({ data: result });
// });

app.post("/updateUser", async function (req, res) {
  let { displayName, photoURL, password } = req.body;
  try {
    let updateUser = db.user.update(
      {
        displayName,
        photoURL,
        password,
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );
    res.status(200).send({ updateUser, message: "user profile updated" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/follow", async function (req, res) {
  const fId = await db.user.findOne({
    where: {
      displayName: req.body.displayName,
    },
  });
  console.log(fId.id);
  const allfollow = await db.follow_table.findAll({
    where: { userId: fId.id, followerId: req.body.userId },
  });
  if (allfollow.length <= 0) {
    try {
      let follow = await db.follow_table.create({
        userId: fId.id,
        followerId: req.body.userId,
      });
      console.log(follow);
      res.send({ data: follow });
    } catch (err) {
      console.log({ err });
    }
  } else {
    let deletefollow = db.follow_table.destroy({
      where: {
        userId: fId.id,
        followerId: req.body.userId,
      },
    });
    res.send({ data: deletefollow });
  }
});

app.post("/userfollowing", async function (req, res) {
  // console.log(req.body.id);
  let user = await db.user.findOne({
    where: {
      displayName: req.body.userName,
    },
  });
  if (user) {
    let userfollowing = await db.follow_table.findAll({
      include: [
        { model: db.user, as: "user", attributes: ["displayName", "photoURL"] },
      ],
      // include: [{ model: db.post, as: "post", attributes: ["userId"] }],
      where: {
        followerId: user.id,
      },
    });
    console.log(userfollowing);
    res.send({ data: userfollowing });
  }
});

app.post("/userfollower", async function (req, res) {
  let user = await db.user.findOne({
    where: {
      displayName: req.body.userName,
    },
  });
  if (user) {
    let userfollowing = await db.follow_table.findAll({
      include: [
        {
          model: db.user,
          as: "follower",
          attributes: ["displayName", "photoURL"],
        },
      ],

      // include: [{ model: db.post, as: "post", attributes: ["userId"] }],
      where: {
        userId: user.id,
      },
    });
    res.send({ data: userfollowing });
  }
});

app.post("/addcomment", async function (req, res) {
  let addcomment = await db.comment_table.create({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.commentInput,
  });
  res.send({ data: addcomment });
});

app.post("/showcomment", async function (req, res) {
  let showcomment = await db.comment_table.findAll({
    include: [
      {
        model: db.user,
        as: "user",
        attributes: ["displayName", "photoURL"],
      },
    ],
    where: {
      postId: req.body.postId,
    },
  });
  res.send({ data: showcomment });
});

app.post("/suggestion", async function (req, res) {
  let following = await db.follow_table.findAll({
    include: [
      {
        model: db.user,
        as: "user",
        attributes: ["displayName", "photoURL"],
      },
    ],
    where: {
      followerId: req.body.userId,
    },
  });
  let followingIds = following.map((obj) => {
    return obj.userId;
  });
  followingIds.push(req.body.userId);
  console.log(followingIds);
  // let users=await db.user.findAll({})
  let suggestion = await db.user.findAll({
    where: {
      id: {
        [Op.notIn]: followingIds,
      },
    },
    order: Sequelize.literal("rand()"),
    limit: 4,
  });
  // console.log(following[0].dataValues);
  // console.log(JSON.stringify(following, null, 2));
  // console.log(JSON.stringify(suggestion, null, 2));
  console.log(suggestion);
  res.send({ data: suggestion });
});

app.post("/retweet", async function (req, res) {
  let retweet = await db.post.create({
    username: req.body.username,
    description: req.body.discription,
    userId: req.body.userUId,
    postImg: req.body.photoUrl,
  });
  res.send({ data: retweet });
});

app.post("/delete", async function (req, res) {
  let sub = await db.post.destroy({
    where: {
      id: req.body.postId,
    },
  });
  res.send({ data: sub });
});

app.listen(process.env.PORT || PORT, () => {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log(`server running on port ${PORT}`);
});
