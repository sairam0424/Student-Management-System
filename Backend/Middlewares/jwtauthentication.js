const context = ({ req }) => {
    const { authorization } = req.headers;
  
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
  
      return { userId };
    }
  };

export default context