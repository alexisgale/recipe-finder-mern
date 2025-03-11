import jwt from "jsonwebtoken";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Invalid token",
  TOKEN_VERIFICATION_FAILED: "Token verification failed",
};

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.NO_TOKEN });
    }

    // Verify token asynchronously
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Handle token errors with appropriate messages
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          message:
            error instanceof jwt.JsonWebTokenError
              ? ERROR_MESSAGES.INVALID_TOKEN
              : ERROR_MESSAGES.TOKEN_VERIFICATION_FAILED,
        });
      }

      // Attach user info from the token payload to the request object
      req.user = decoded.user; // Assuming decoded token has a 'user' field
      next(); // Continue to the next middleware or route handler
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(HTTP_STATUS.FORBIDDEN)
      .json({ message: ERROR_MESSAGES.TOKEN_VERIFICATION_FAILED });
  }
};
