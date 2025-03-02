import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";

// Define la interfaz para los ítems del carrito
interface CartItem {
    id: string;
    quantity: number;
    // otros campos relevantes
}

// Define la interfaz para el estado del carrito
interface CartState {
    cart: CartItem[];
}

// Define la interfaz para las acciones del carrito
interface CartAction {
    type: string;
    payload: CartItem;
}

// Define la interfaz para las propiedades del contexto del carrito
interface CartContextProps {
    cart: CartItem[];
    dispatch: React.Dispatch<CartAction>;
}

// Crea el contexto del carrito
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define el estado inicial del carrito
const initialState: CartState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

// Define el reducer del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            // Identifica el ítem existente
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            let newCart;

            if (existingItem) {
                newCart = state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, cart: newCart };
        }

        case 'REMOVE_ITEM': {
            const newCart = state.cart.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, cart: newCart };
        }

        case 'INCREMENT_ITEM': {
            const newCart = state.cart.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, cart: newCart };
        }

        case 'DECREMENT_ITEM': {
            const newCart = state.cart.map(item =>
                item.id === action.payload.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, cart: newCart };
        }

        case 'CLEAR_CART': {
            localStorage.removeItem('cart');
            return { ...state, cart: [] };
        }
        default:
            return state;
    }
};

// Define la interfaz para las propiedades del proveedor del carrito
interface CartProviderProps {
    children: ReactNode;
}

// Define el componente proveedor del carrito
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ cart: state.cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Define el hook personalizado para acceder al contexto del carrito
export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};