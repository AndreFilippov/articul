exports.exception = (message, code = 500) => { const error = new Error(); error.status = code; error.message = message; return error; } ;
exports.pageNotFound = () => exports.exception('Page not Found.', 404);
exports.userNotFound = () => exports.exception('Пользователь не найден.', 404);
exports.parseError = (e) => {
    console.log(e);
};