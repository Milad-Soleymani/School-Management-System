/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 📝 کامپوننت ProtectedRoute برای محافظت از مسیرها | ProtectedRoute component to guard routes
export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, authenticated } = useContext(AuthContext); // 📝 استفاده از context برای دریافت وضعیت کاربر و احراز هویت | Using context to get user and authentication status
    const [checked, setChecked] = useState(false); // 📝 وضعیت بررسی اعتبار کاربر | State to check if the authentication status has been evaluated

    useEffect(() => {
        setChecked(true); // 📝 زمانی که کامپوننت بارگذاری می‌شود، وضعیت بررسی اعتبار تغییر می‌کند | Setting checked to true once component is loaded
    }, []);

    // 📝 اگر کاربر وارد نشده باشد، به صفحه ورود هدایت می‌شود | Redirect to login page if not authenticated
    if (checked && !authenticated) return <Navigate to={'/login'} />;

    // 📝 اگر کاربر نقش مجاز ندارد، به صفحه ورود هدایت می‌شود | Redirect to login if user does not have allowed role
    if (checked && allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={'/login'} />;

    // 📝 اگر وضعیت بررسی شده باشد، فرزند را رندر می‌کند | Render children if the checked state is true
    if (checked) {
        return children;
    }

    // 📝 در صورتی که هنوز بررسی انجام نشده باشد، چیزی نمایش داده نمی‌شود | Nothing is rendered until the check is complete
}
