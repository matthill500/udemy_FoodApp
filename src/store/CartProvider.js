import {useReducer} from 'react';
import CartContext from './cart-context';

const initialState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const newTotalAmount = state.totalAmount + action.item.price * 1;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
       
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };
    }
    if (action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return initialState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

    const addItemToCartHandler = item => {dispatchCartAction({type: 'ADD', item})};
    const removeItemFromCartHandler = id => {dispatchCartAction({type: 'REMOVE', id})};

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
       <CartContext.Provider value={cartContext}>
           {props.children}
       </CartContext.Provider> 
    )
};

export default CartProvider;