import { createContext, useEffect, useState } from "react";

// 📝 ایجاد Context برای مدیریت وضعیت احراز هویت | Creating context for authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 📝 وضعیت احراز هویت | Authentication state
    const [authenticated, setAuthenticated] = useState(false); // 📝 وضعیت ورود کاربر | User login status
    const [user, setUser] = useState(null); // 📝 اطلاعات کاربر | User information

    // 📝 استفاده از useEffect برای بررسی وضعیت ورود کاربر از localStorage | Using useEffect to check user authentication status from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token'); // 📝 دریافت توکن از localStorage | Getting token from localStorage
        const userStr = localStorage.getItem('user'); // 📝 دریافت اطلاعات کاربر از localStorage | Getting user info from localStorage
        if (token) { setAuthenticated(true); } // 📝 اگر توکن موجود باشد، کاربر احراز هویت شده است | If token exists, user is authenticated
        if (userStr) { setUser(JSON.parse(userStr)); } // 📝 اگر اطلاعات کاربر موجود باشد، آن را تجزیه می‌کنیم | If user info exists, parse it
    }, []);

    // 📝 تابع ورود | Login function
    const login = (credentials) => {
        setAuthenticated(true); // 📝 تنظیم وضعیت ورود کاربر | Setting user authenticated state
        setUser(credentials); // 📝 ذخیره اطلاعات کاربر در وضعیت | Storing user info in state
    }

    // 📝 تابع خروج | Logout function
    const logout = () => {
        setAuthenticated(false); // 📝 تنظیم وضعیت خروج کاربر | Setting user authenticated state to false
        setUser(null); // 📝 پاک کردن اطلاعات کاربر | Clearing user info
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout }}>
            {children} {/* 📝 رندر کردن کامپوننت‌های فرزند | Rendering child components */}
        </AuthContext.Provider>
    )
}
