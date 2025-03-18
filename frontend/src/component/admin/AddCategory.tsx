import React, { useState, ChangeEvent, FormEvent } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/addCategory.css';


const AddCategory: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {// listo
            const response = await ApiService.createCategory({ name });
            //el tipo de name es string, por lo que no se puede pasar un objeto con name: name
            //se debe pasar un objeto con name: name xd?
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a category");
        }
    };

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Add Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddCategory;