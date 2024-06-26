import fs from "fs";

export const notFound = (req, res, next) => {
    const error = new Error(`Non trouvé - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Ressource introuvable.";
    }

    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            err
                ? console.log("Error occurred : " + err)
                : console.log("File deleted due to an error.");
        });
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};
