const dotenv = require("dotenv");
const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const chalk = require("chalk");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const apiLogger = require("./Middlewares/AppLogger");
const errorHandler = require("./Middlewares/ErrorHandler");
const rateLimiter = new RateLimiterMemory({ points: 20, duration: 1 });
const VerifyToken = require("./Middlewares/Verify");
const AccessControlMiddleware = require("./Middlewares/AccessControlMiddleware.js");
const path = require("path");
const port = process.env.PORT || 8000;
const { startCronJobs } = require("./Functions/AddCheckInDay.js");

const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
} else {
    app.use(morgan("dev"));
}
dotenv.config();

app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Uploads", express.static("Uploads"));

app.use("/", require("./Routes/index.js"));

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
    });

// ใช้ Error Handler
app.use(errorHandler);

startCronJobs();

app.listen(port, () => {
    const env = process.env.NODE_ENV || "development";

    const appStartLog = `
${chalk.green.bold("==============================================")}
${chalk.cyan.bold(" 🚀 Server is starting...")}
${chalk.green.bold("==============================================")}

${chalk.yellow.bold("✔ Environment:")} ${chalk.white(env)}
${chalk.yellow.bold("✔ Port:")}        ${chalk.white(port)}
${chalk.yellow.bold("✔ Static Routes:")}
  ${chalk.white("• /Uploads")}
${chalk.yellow.bold("✔ API Routes:")}
  ${chalk.white("• /")}
  ${chalk.white("• /api (from Routes folder)")}
${chalk.yellow.bold("✔ Middleware:")}
  ${chalk.white("• Helmet (Production Only)")}
  ${chalk.white("• Rate Limiter")}
  ${chalk.white("• Body Parser")}

${chalk.green.bold("==============================================")}
${chalk.cyan.bold(" 🎯 Cron Jobs are starting...")}
`;

    console.log(appStartLog);

    console.log(
        chalk.green.bold("✅ Server and Cron Jobs started successfully!")
    );
});
