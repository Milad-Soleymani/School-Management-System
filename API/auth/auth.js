const jwt = require('jsonwebtoken');

/**
 * Authentication and Authorization Middleware
 * میان‌افزار برای احراز هویت و بررسی سطح دسترسی کاربران
 * @param {Array} roles - allowed user roles (e.g., ['STUDENT', 'TEACHER', 'ADMIN'])
 * @returns middleware function
 */
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            // Get token from Authorization header
            // دریافت توکن از هدر Authorization
            const token = req.header("Authorization")?.replace("Bearer ", "");

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided. Authorization denied. | توکن ارائه نشده است، دسترسی غیرمجاز.'
                });
            }

            // Verify token
            // بررسی اعتبار توکن
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user info to request object
            // افزودن اطلاعات کاربر به شیء درخواست
            req.user = decoded;

            // Check if user's role is allowed
            // بررسی اینکه نقش کاربر مجاز هست یا نه
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access Denied. | دسترسی غیرمجاز.'
                });
            }

            // All checks passed, continue to next middleware
            // همه بررسی‌ها انجام شد، انتقال به میان‌افزار بعدی
            next();
        } catch (error) {
            // Handle invalid token or any other errors
            // مدیریت خطاهای مربوط به توکن یا سایر خطاها
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Authorization failed. | توکن نامعتبر است، احراز هویت ناموفق.'
            });
        }
    };
};

module.exports = authMiddleware;
