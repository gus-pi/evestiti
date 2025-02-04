import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../types/types'

export interface CartState {
    products: Product[]
    selectedItems: number
    totalPrice: number
    tax: number
    taxRate: number
    grandTotal: number
}

const initialState: CartState = {
    products: <Product[]>[],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const productExists = state.products.find((product) => product._id === action.payload._id)

            if (!productExists) {
                state.products.push({ ...action.payload, quantity: 1 })
            } else {
                console.log('Items already added')
            }
            state.selectedItems = setSelectedItemsQty(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        updateQuantity: (state, action) => {
            state.products.forEach((product) => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === "increment") {
                        product.quantity += 1;
                    } else if (action.payload.type === "decrement" && product.quantity > 1) {
                        product.quantity -= 1;
                    }
                }
            });
            state.selectedItems = setSelectedItemsQty(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload.id)
            state.selectedItems = setSelectedItemsQty(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        clearCart: (state) => {
            state.products = []
            state.selectedItems = 0
            state.totalPrice = 0
            state.tax = 0
            state.grandTotal = 0
        }
    }
})

//utilities functions
export const setSelectedItemsQty = (state: CartState): number => {
    return state.products.reduce((total, product) => total + product.quantity, 0);
};

export const setTotalPrice = (state: CartState) => {
    return state.products.reduce((total, product) => total + product.quantity * product.price, 0);
}

export const setTax = (state: CartState) => setTotalPrice(state) * state.taxRate

export const setGrandTotal = (state: CartState) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate
}

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer