import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css';

interface FormData {
    email: string;
    name: string;
    phoneNumber: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        phoneNumber: '',
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
            const response = await ApiService.registerUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Registered");
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        } catch (error: any) {
            setMessage(error.response?.data.message || error.message || "Unable to register a user");
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
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

                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Phone Number: </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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

                <button type="submit">Register</button>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;