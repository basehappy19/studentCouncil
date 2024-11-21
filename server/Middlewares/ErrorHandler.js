require("dotenv").config();

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            error: {
                status: statusCode,
                message: message,
                stack: err.stack, 
            },
        });
    } else {
        res.status(statusCode).json({
            success: false,
            error: {
                status: statusCode,
                message: statusCode === 500 ? "Something went wrong!" : message, // ซ่อนรายละเอียดใน production
            },
        });
    }
};

module.exports = errorHandler;
