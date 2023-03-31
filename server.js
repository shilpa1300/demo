const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("../Demo/models")



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Demo." });
});

// routes
require('../Demo/routes/auth.routes')(app);
require('../Demo/routes/user.routes')(app);


// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

const categorieRouter = require('./routes/categorieRouter.js')
app.use('/api/categories', categorieRouter)




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


 



