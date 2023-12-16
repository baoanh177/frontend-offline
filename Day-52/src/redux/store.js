import { legacy_createStore as createStore } from "redux";

const cart = JSON.parse(localStorage.getItem('cart')) || []

const initState = {
    cart
}

const setCartData = data => {
    localStorage.setItem('cart', JSON.stringify(data.cart))
    return data
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'cart/add': {
            const result = state.cart.filter(product => product.id == action.payload.id)
            if(result.length) {
                result[0].quantity++
                return setCartData({...state, cart: [...state.cart]})
            }

            return setCartData({...state, cart: [...state.cart, action.payload]})
        }
            
        case 'cart/increment': {
            state.cart.find(product => {
                if(product.id == action.payload) {
                    ++product.quantity
                }
            })

            return setCartData({...state, cart: [...state.cart]})
        }

        case 'cart/decrement': {
            state.cart.find(product => {
                if(product.id == action.payload) {
                    --product.quantity
                }
            })

            return setCartData({...state, cart: [...state.cart]})
        }

        case 'cart/delete': {
            const newCart = state.cart.filter(product => product.id != action.payload)
            
            return setCartData({...state, cart: [...newCart]})
        }

        case 'cart/checkout': {
            return setCartData({...state, cart: []})
        }
            
        default:
            return state
    }
}

export const store = createStore(rootReducer)