import React, { useReducer } from "react";
import OrderContext from './OrderContext';
import orderReducer from './OrderReducer'


const OrderState = props => {
    const initialState = {
        orders: []
    }

    // Add Order

    // Delete Order

    // Update Order
    
    return (
        <OrderContext.Provider value={{ orders: state.orders }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;