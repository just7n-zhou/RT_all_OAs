export const lagMiddleware = (req, res, next) => {
  setTimeout(next, 1500);
};