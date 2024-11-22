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

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

// Middleware
const corsOptions = {
    origin: process.env.CLIENT_URL || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Index
app.use("", require("./Routes/index.js"));

// Static files
app.use("/Uploads", cors(corsOptions), express.static("Uploads"));

// Logs
app.use(apiLogger);

// Rate Limiter Middleware
app.use(async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch {
        res.status(429).send("Too Many Requests");
    }
});

// Dynamic route import
readdirSync("./Routes")
    .filter((file) => file !== "index.js") 
    .forEach((r) => app.use("/api", require("./Routes/" + r)));

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server Is Running On Port " + port);
    startAddCheckInDay();
});
