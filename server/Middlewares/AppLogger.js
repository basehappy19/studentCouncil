const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/api-log.json");

const ensureLogDirectoryExists = () => {
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

const writeLogToFile = (logData) => {
    ensureLogDirectoryExists(); 

    const logEntry = JSON.stringify(logData) + "\n";

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        }
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
