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
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = decoded;

      
      next();
   } catch (error) {
      console.error('JWT Error:', error.message);  
      return res.status(401).json({
         success: false,
         message: 'Invalid or expired token. Please log in again.'
      });
   }
};

module.exports = { authMiddleware };


