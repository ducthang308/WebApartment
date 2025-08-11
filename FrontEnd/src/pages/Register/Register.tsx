import { useState } from 'react';
import './Register.css';
import { register } from '../../services/UserService';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        password: '',
        retype_pass: '',
        roles_id: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'roles_id' ? Number(value) : value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.retype_pass) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }
        try {
            const res = await register(formData);
            alert('Đăng ký thành công!');
            console.log('User mới:', res);
        } catch (err: any) {
            alert(err.message || 'Đăng ký thất bại');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="full_name"
                placeholder="Họ và tên"
                value={formData.full_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phone_number"
                placeholder="Số điện thoại"
                value={formData.phone_number}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="retype_pass"
                placeholder="Nhập lại mật khẩu"
                value={formData.retype_pass}
                onChange={handleChange}
                required
            />

            <div className="account-type">
                <label className="account-label"><strong>Loại tài khoản</strong></label>
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="roles_id"
                            value="1"
                            checked={formData.roles_id === 1}
                            onChange={handleChange}
                        />
                        Môi giới
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="roles_id"
                            value="2"
                            checked={formData.roles_id === 2}
                            onChange={handleChange}
                        />
                        Chính chủ
                    </label>
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
