const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
      return res.status(401).json({
         success: false,
         message: 'Not Authorized. Please log in again.'
      });
   }

   try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user ID to the request object for further use
      req.user = decoded.id;

      // Continue to the next middleware/route handler
      next();
   } catch (error) {
      console.error('JWT Error:', error.message);  // Log error message for debugging

      return res.status(401).json({
         success: false,
         message: 'Invalid or expired token. Please log in again.'
      });
   }
};

module.exports = { authMiddleware };
