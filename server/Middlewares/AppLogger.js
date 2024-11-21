const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/api-log.json");

const writeLogToFile = (logData) => {
    fs.readFile(logFilePath, "utf-8", (err, data) => {
        let logs = [];
        if (!err && data) {
            logs = JSON.parse(data);
        }

        logs.push(logData);

        fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
            if (err) console.error("Error writing log:", err);
        });
    });
};

const apiLogger = (req, res, next) => {
    const startTime = Date.now();

    let oldSend = res.send;
    let responseBody;

    res.send = function (data) {
        responseBody = data;
        oldSend.apply(res, arguments);
    };

    res.on("finish", () => {
        const logData = {
            method: req.method,
            endpoint: req.originalUrl,
            status: res.statusCode,
            responseTime: `${Date.now() - startTime}ms`,
            timestamp: new Date().toISOString(),
            request: {
                headers: req.headers,
                body: req.body,
                query: req.query,
                ip: req.ip,
            },
            response: {
                body: responseBody,
            },
        };
        writeLogToFile(logData);
    });

    next();
};

module.exports = apiLogger;
