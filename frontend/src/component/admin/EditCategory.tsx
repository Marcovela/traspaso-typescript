import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addCategory.css';

interface Params {
    categoryId: string;
}

const EditCategory: React.FC = () => {
    const { categoryId } = useParams<Params>();
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId]);

    const fetchCategory = async (categoryId: string) => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.category.name);
        } catch (error: any) {
            setMessage(error.response?.data?.message || error.message || "Failed to get a category by id");
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await ApiService.updateCategory(categoryId!, { name });
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
                <h2>Edit Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCategory;