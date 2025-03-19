import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import '../../style/home.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    // otros campos relevantes
}

const Home: React.FC = () => {
    const location = useLocation();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let allProducts: Product[] = [];
                const queryparams = new URLSearchParams(location.search);
                const searchItem = queryparams.get('search');

                if (searchItem) {
                    const response = await ApiService.searchProducts(searchItem);
                    allProducts = response.productList || [];
                } else {
                    const response = await ApiService.getAllProducts();
                    allProducts = response.productList || [];
                }

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error: any) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch products');
            }
        };

        fetchProducts();
    }, [location.search, currentPage]);

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

export default Home;