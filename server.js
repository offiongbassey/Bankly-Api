const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const authRoute = require("./routes/authRoute");
const savingsRoute = require("./routes/savingsRoute");
const agencyRoute = require("./routes/agencyRoute");
const sequelize = require('./config/database');
const User = require("./models/userModel");
const Token = require("./models/tokenModel");
const Savings = require("./models/savingsModel");
const User_Savings = require("./models/userSavingsModel");
const Agency = require("./models/agencyModel");
const Transaction = require("./models/transactionModel");
const app = express();
app.use(cors({
    origin: ["htt[://localhost:3000"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

//auth route
app.use('/api/auth', authRoute);
app.use("/api/savings", savingsRoute);
app.use("/api/agency", agencyRoute);

app.get('/', (req, res) => {
    res.send("Backend Connected");
});

User.hasMany(Savings);
User.hasMany(Transaction);
User.hasMany(Token);
Savings.hasMany(User_Savings);

Token.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
Savings.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User_Savings.belongsTo(Savings, {constraints: true, onDelete: "CASCADE"});
Agency.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
Transaction.belongsTo(User, {constraints: true, onDelete: "CASCADE"});


sequelize.sync()
.then(() => {
    console.log("Database Synced");
})
.catch((err) => {
    console.log(`Database failed to sync ${err.message}`);
});

app.use(errorHandler);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

