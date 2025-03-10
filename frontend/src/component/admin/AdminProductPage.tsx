import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProduct.css';
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

interface Product {
    id: string;
    name: string;
    // otros campos relevantes
}

const AdminProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProducts();
            const productList = response.productList || [];
            setTotalPages(Math.ceil(productList.length / itemsPerPage));
            setProducts(productList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error: any) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleEdit = (id: string) => {
        navigate(`/admin/edit-product/${id}`);
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            try {
                await ApiService.deleteProduct(id);
                fetchProducts();
            } catch (error: any) {
                setError(error.response?.data?.message || error.message || 'Unable to delete product');
            }
        }
    };

    return (
        <div className="admin-product-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>Products</h2>
                    <button className="product-btn" onClick={() => navigate('/admin/add-product')}>Add Product</button>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <span>{product.name}</span>
                                <button className="product-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                                <button className="product-btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminProductPage;