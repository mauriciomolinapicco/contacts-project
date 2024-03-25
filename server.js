const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//middleware passer. Por esto puedo recibir el body de las requests
app.use(express.json());

//digo que cuando se vaya a http://localhost:5001/api/contacts se manda a contactRoutes
//es el middleware (creo que seria el equivalente a urls.py)
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => {
    console.log('Server running on port '+ port);
})