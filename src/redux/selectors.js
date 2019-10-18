import { createSelector } from 'reselect'

// User Selectors

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)


// Cart Selectors

const selectCart = state => state.cart

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.cartHidden
)

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems
    .reduce((accumulatedQuantity, cartItem) =>  
    accumulatedQuantity + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems
    .reduce((accumulatedTotal, cartItem) => 
    accumulatedTotal + cartItem.price * cartItem.quantity,0)
)

