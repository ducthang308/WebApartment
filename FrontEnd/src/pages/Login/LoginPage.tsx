import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import Register from '../Register/Register.tsx';
import { login } from '../../services/UserService';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(phone, password);

            if (data?.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data.id.toString());
                localStorage.setItem('phone', data.phone_number);
            }

            navigate('/'); // đường dẫn viết thường
        } catch (err: any) {
            console.error('Lỗi đăng nhập:', err);
            alert(err.message || 'Đăng nhập thất bại');
        }
    };

    const handleGoogleLogin = () => {
        alert('Google login chưa tích hợp.');
    };

    const handleFaceBookLogin = () => {
        alert('FaceBook login chưa tích hợp');
    };

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <div className="login-tabs">
                    <span
                        className={activeTab === 'login' ? 'active-tab' : 'inactive-tab'}
                        onClick={() => setActiveTab('login')}
                    >
                        Đăng nhập
                    </span>
                    <span
                        className={activeTab === 'register' ? 'active-tab' : 'inactive-tab'}
                        onClick={() => setActiveTab('register')}
                    >
                        Đăng ký tài khoản
                    </span>
                </div>

                {activeTab === 'login' ? (
                    <>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="login-btn">
                                Đăng nhập
                            </button>
                        </form>

                        <a href="#" className="forgot-password">
                            Quên mật khẩu?
                        </a>

                        <div className="divider">
                            <span>hoặc đăng nhập bằng</span>
                        </div>

                        <div className="social-login-button">
                            <button onClick={handleGoogleLogin} className="google-btn">
                                <img
                                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                                    alt="Google"
                                />
                                Google
                            </button>
                            <button onClick={handleFaceBookLogin} className="facebook-btn">
                                <img
                                    src="https://img.icons8.com/color/24/000000/facebook-new.png"
                                    alt="Facebook"
                                />
                                Facebook
                            </button>
                        </div>
                    </>
                ) : (
                    <Register />
                )}
            </div>
        </div>
    );
};

export default LoginPage;