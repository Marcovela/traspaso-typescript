
import axios, { AxiosResponse } from "axios"; // for making http requests
import { Category, CategoryApiResponse, orderItemList } from '../tipado';
interface Registration {
    username: string;
    password: string;
    email: string;
}

interface LoginDetails {
    username: string;
    password: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    // otros campos relevantes
}
// esto es lo que se espera de un producto, por lo que se debe cambiar el tipo de body en createCategory
// por lo que se debe cambiar el tipo de body en createCategory
// pero 
// solo eliminaremos el id, ya que el id es generado por la base de datos
// y no se debe enviar en el body
// control + s para guardar 
// otros campos relevantes
// cambiar si hay tiempo 
interface Category1 {
    name: string;
    // otros campos relevantes
}


interface Order {
    id: string;
    status: string;

}

export default class ApiService {

    static BASE_URL = "http://localhost:2424";

    static getHeader(): { Authorization: string; "Content-Type": string } {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTh && USERS API */
    static async registerUser(registration: Registration): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails: LoginDetails): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    static async getLoggedInUserInfo(): Promise<any> {
        const response: AxiosResponse = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**PRODUCT ENDPOINT */
    static async addProduct(formData: FormData): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/product/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateProduct(formData: FormData): Promise<any> {
        const response: AxiosResponse = await axios.put(`${this.BASE_URL}/product/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllProducts(): Promise<Product[]> {
        const response: AxiosResponse<Product[]> = await axios.get(`${this.BASE_URL}/product/get-all`);
        return response.data;
    }

    static async searchProducts(searchValue: string): Promise<Product[]> {
        const response: AxiosResponse<Product[]> = await axios.get(`${this.BASE_URL}/product/search`, {
            params: { searchValue }
        });
        return response.data;
    }

    static async getAllProductsByCategoryId(categoryId: string): Promise<Product[]> {
        const response: AxiosResponse<Product[]> = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`);
        return response.data;
    }

    static async getProductById(productId: string): Promise<Product> {
        const response: AxiosResponse<Product> = await axios.get(`${this.BASE_URL}/product/get-by-product-id/${productId}`);
        return response.data;
    }

    static async deleteProduct(productId: string): Promise<any> {
        const response: AxiosResponse = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**CATEGORY */
    static async createCategory(body: Category1): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllCategory(): Promise<CategoryApiResponse> {
        const response: AxiosResponse<CategoryApiResponse> = await axios.get(`${this.BASE_URL}/category/get-all`);
        return response.data;
    }

    static async getCategoryById(categoryId: string): Promise<Category> {
        const response: AxiosResponse<Category> = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`);
        return response.data;
    }

    static async updateCategory(categoryId: string, body: Category): Promise<any> {
        const response: AxiosResponse = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteCategory(categoryId: string): Promise<any> {
        const response: AxiosResponse = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**ORDER */
    static async createOrder(body: Order): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllOrders(): Promise<Order[]> {
        const response: AxiosResponse<Order[]> = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getOrderItemById(itemId: string): Promise<orderItemList> {
        const response: AxiosResponse<orderItemList> = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { itemId }
        });
        return response.data;
    }

    static async getAllOrderItemsByStatus(status: string): Promise<Order[]> {
        const response: AxiosResponse<Order[]> = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    static async updateOrderitemStatus(orderItemId: string, status: string): Promise<any> {
        const response: AxiosResponse = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, {}, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    /**ADDRESS */
    static async saveAddress(body: any): Promise<any> {
        const response: AxiosResponse = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /***AUTHENTICATION CHECKER */
    static logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin(): boolean {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }
}