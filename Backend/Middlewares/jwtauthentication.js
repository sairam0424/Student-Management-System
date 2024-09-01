/**
 * The function extracts the user ID from the authorization header using JWT verification.
 * @returns The `context` function is returning an object with the `userId` property if the
 * `authorization` header is present in the request. If the `authorization` header is present, it
 * decodes the JWT token from the header using the `JWT_SECRET` from the environment variables and
 * extracts the `userId` from it. The function then returns an object with the `userId` property. If
 * the `
 */
const context = ({ req }) => {
    const { authorization } = req.headers;
  
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
  
      return { userId };
    }
  };

export default context