exports.errorHelper = (res, code, msg) => {
    res.status(code);
    throw new Error(msg);
}