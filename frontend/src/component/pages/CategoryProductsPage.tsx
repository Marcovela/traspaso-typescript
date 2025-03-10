import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import '../../style/home.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    // otros campos relevantes
}

interface ApiResponse {
    productList: Product[];
}

const CategoryProductsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProducts();
    }, [categoryId, currentPage]);

    const fetchProducts = async () => {
        try {
            const response: ApiResponse= await ApiService.getAllProductsByCategoryId(categoryId!);
            const allProducts = response.productList || [];
            setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
            setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error: any) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch products by category id');
        }
    };

    return (
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
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

export default CategoryProductsPage;