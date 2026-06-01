const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const logFilePath = path.join(__dirname, "../logs/api-log.json");

router.get("/", (req, res) => {
    const welcomeFilePath = path.join(__dirname, "../public/welcome.html");
    res.sendFile(welcomeFilePath, (err) => {
        if (err) {
            console.error("Error sending welcome.html:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

const validateKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"]; 
    const validKey = `kaB%bJ~2+dSVDw@@^4}\e%}MJ"e81IU]X$Sf>v28]pugu`;

    if (!apiKey || apiKey !== validKey) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    next();
};

router.get("/api-docs", validateKey, (req, res) => {
    fs.readFile(logFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Cannot read log file" });
        }

        const logs = data
            .trim()
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line) => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    console.error("Error parsing log line:", e);
                    return null;
                }
            })
            .filter((log) => log !== null);

        res.json({
            success: true,
            logs: logs,
        });
    });
});

module.exports = router;
