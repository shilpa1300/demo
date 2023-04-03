const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
var checkAuth = require('../middleware/auth.js')



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/admin/signin", controller.signinforAdmin);

    app.get("/api/auth/getUserProfile/:id", controller.getOneProfile);
    app.put("/api/auth/updateProfile/:id", controller.updateProfile)

};
 

