const dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
    app.use(helmet());
} else {
    dotenv.config({ path: ".env.development" });
}

const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const helmet = require("helmet");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { startAddCheckInDay } = require("./Functions/AddCheckInDay");
const apiLogger = require("./Middlewares/AppLogger");
const errorHandler = require("./Middlewares/ErrorHandler");
const rateLimiter = new RateLimiterMemory({ points: 20, duration: 1 });
const port = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

app.use("", require("./Routes/index.js"));

app.use("/Uploads", express.static("Uploads"));

app.use(apiLogger);

app.use(async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch {
        res.status(429).send("Too Many Requests");
    }
});

readdirSync("./Routes")
    .filter((file) => file !== "index.js") 
    .forEach((r) => app.use("/api", require("./Routes/" + r)));

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server Is Running On Port " + port);
    startAddCheckInDay();
});
