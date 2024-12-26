const fs = require("fs");
const path = require("path");

const logFilePath = "./logs/api-log.json";

const ensureLogDirectoryExists = () => {
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

const writeLogToFile = (logData) => {
    ensureLogDirectoryExists(); 

    fs.readFile(logFilePath, "utf-8", (err, data) => {
        let logs = [];
        if (!err && data) {
            try {
                logs = JSON.parse(data);
            } catch (parseError) {
                console.error(
                    "Invalid JSON in log file. Resetting logs:",
                    parseError
                );
                logs = [];
            }
        }

        logs.push(logData);

        fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing log:", writeErr);
            }
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
                body: (() => {
                    try {
                        return JSON.parse(responseBody);
                    } catch {
                        return responseBody;
                    }
                })(),
            },
        };
        writeLogToFile(logData);
    });

    next();
};

module.exports = apiLogger;
