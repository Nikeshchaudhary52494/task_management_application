const app = require("./app")
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

// congig
dotenv.config({ path: "config.env" })

// connecting to dataBase
connectDatabase();


app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})