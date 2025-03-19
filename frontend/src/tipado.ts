// Interfaz para Categoría
export interface Category {
    id: string;
    name: string;
    // otros campos relevantes
}
export interface CategoryApiResponse {
    categoryList: Category[];
}
// Interfaz para Producto
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: string;
    // otros campos relevantes
}



// Interfaz para Dirección
export interface Address {
    country: string;
    state: string;
    city: string;
    street: string;
    zipcode: string;
}

// Interfaz para Ítem de Orden
export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    status: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
        phoneNumber: string;
        role: string;
        address?: {
            country: string;
            state: string;
            city: string;
            street: string;
            zipcode: string;
        };
    };
    product: {
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };
}
// Interfaz para Usuario
export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    address?: Address;
    // otros campos relevantes
}
export interface orderItemList {
    Orders: Order[];
}
// Interfaz para Orden

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: string;
    user: User;
}