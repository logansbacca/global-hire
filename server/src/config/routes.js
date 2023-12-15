//ROUTES
var userRouter = require("../user/user.router");
var workerRouter = require("../workers/workers.router");
var Worker = require("../workers/workers.model");
var User = require("../user/user.model");
const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = (app) => {
  
  app.get("/user/login", async (req, res) => {
    res.json({message:"login"})
  });

  app.get("/user/registration", async (req, res) => {
    res.json({message:"register yourself"})
  });

  app.get("/hirenow", async (req, res) => {
    try {
      let token = req.query.token;
      let decoded = await jwt.verify(token, config.secret);
      let user;
      if (decoded.params.id) {
        user = await User.find({id_: req.params.id});
        if (user) {
          try {
            const workers = await Worker.find();
            console.log("Workers:", workers);
            res.json({ message: user.userName + " can view workers"});
          } catch (error) {
            console.error("Error fetching workers:", error);
          }
        } else {
          res.json({message: "user not allowed"})
        }
      }
    } catch (e) {
      res.json({message: "user not allowed"})
    } 
  });


  app.get("/addfreelancer", async (req, res) => {
    try {
      res.render("addfreelancer");
    } catch (e) {
      console.error(e);
    }
  });


  app.get("/user/profile/:id", async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      res.render("user", { user });  
    } catch (e) {
      console.error(e);
    }
  });

  app.get("/", (req, res) => {
    res.json({message: "homepage"})
  });

  app.use("/api/user", userRouter);
  app.use("/api/workers", workerRouter);
};


