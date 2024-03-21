const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {

    console.log("Connected to MongoDB");
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
})
.catch((error) => console.log(`${error} did not connect`));



  
  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));


app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use("/api/posts", postRoute);


  app.listen(process.env.PORT, () => {
    console.log("Backend server is running on port",PORT);
  });
 
  