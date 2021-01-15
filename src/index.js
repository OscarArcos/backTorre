const express = require("express");
const app = express();
const morgan = require("morgan");

//setings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 2);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST");
    return res.status(200).json({});
  }
  next();
});

//routes
app.use('/api/bio', require("./routes/bio"));
app.use('/api/jobs', require("./routes/jobs"));

//starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
