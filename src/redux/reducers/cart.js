import { TOGGLE_CART_HIDDEN, ADD_CART_ITEM } from '../actions/types'
import { addItemToCart } from '../utils'
const INITIAL_STATE = {
    cartHidden: true,
    cartItems: []
}


const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case TOGGLE_CART_HIDDEN:
        return {
            ...state,
            cartHidden: !state.cartHidden
        }
        case ADD_CART_ITEM:
        return {
            ...state,
            cartItems: addItemToCart(state.cartItems, action.payload)
        }    
        default:
            return state
    }
}

export default cartReducer