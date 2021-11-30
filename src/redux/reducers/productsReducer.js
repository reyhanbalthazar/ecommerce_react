const INITIAL_STATE = {
    productsList: []
}

export const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, productsList: action.payload };
        default:
            return state;
    }
}