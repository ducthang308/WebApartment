import { useState } from 'react';
import './Register.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Đăng ký với:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="name" placeholder="Họ tên" onChange={handleChange} required />
            <input type="text" className="phone" placeholder="Số điện thoại" onChange={handleChange} required />
            <input type="password" className="password" placeholder="Mật khẩu" onChange={handleChange} required />
            
            <div className="account-type">
                    <label className="account-label"><strong>Loại tài khoản</strong></label>
                    <div className="radio-group">
                        {['timkiem', 'chinhchu', 'moigioi'].map(role => (
                        <label key={role} className="radio-option">
                            <input type="radio" name="role" value={role} onChange={handleChange} />
                            {role === 'timkiem' ? 'Tìm kiếm' : role === 'chinhchu' ? 'Chính chủ' : 'Môi giới'}
                        </label>
                        ))}
                    </div>
            </div>

            <button type="submit" className="login-btn">Tạo tài khoản</button>
            
            <div className="site-footer">
                <p>
                    Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các
                    <a href="#"> quy định sử dụng</a> cũng như
                    <a href="#"> chính sách bảo mật</a> của chúng tôi
                </p>
                <p>Bản quyền © 2015 - 2025 PhongtroHuyThang.com</p>
            </div>
         </form>
    );
};

export default RegisterForm;
