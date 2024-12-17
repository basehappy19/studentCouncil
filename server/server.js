const dotenv = require("dotenv");
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
const VerifyToken = require("./Middlewares/Verify");
const AccessControlMiddleware = require("./Middlewares/AccessControlMiddleware.js");
const port = process.env.PORT || 8000;

const app = express();

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
    app.use(helmet());
    app.use(morgan("combined"));
} else {
    dotenv.config({ path: ".env.development" });
    app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/px/Uploads", express.static("Uploads"));
app.use("/Uploads", express.static("Uploads"));

app.use("/px", require("./Routes/index.js"));
app.use("", require("./Routes/index.js"));

app.use(VerifyToken);  
app.use(AccessControlMiddleware);

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
    .forEach((r) => {
        const routePath = path.join(__dirname, "Routes", r);
        const route = require(routePath);
        app.use("/api", route);
        app.use("/px/api", route);
    });

// ใช้ Error Handler
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server Is Running On Port " + port);
    startAddCheckInDay();
});
