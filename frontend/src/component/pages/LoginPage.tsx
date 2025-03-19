import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Logged in");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate("/profile");
                }, 4000);
            }
        } catch (error: any) {
            setMessage(error.response?.data.message || error.message || "Unable to login a user");
        }
    };

    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;