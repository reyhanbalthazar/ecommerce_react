import axios from "axios"
import { API_URL } from "../../helper"

// CONFIGURE WITH REDUX THUNK
// export const loginAction = (email, password) => {
//     return (dispatch) => {
//         axios.get(`${API_URL}/dataUser?=${email}&password=${password}`)
//             .then((response) => {
//                 if (response.data.length > 0) {
//                     localStorage.setItem("data", JSON.stringify(response.data[0]))
//                     dispatch({
//                         type: "LOGIN_SUCCESS",
//                         payload: response.data[0]
//                     })
//                 }
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
// }

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await axios.get(`${API_URL}/dataUser?email=${email}&password=${password}`)
            if (response.data.length > 0) {
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                // dispatch : meneruskan data kereducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// CONFIGURE WITHOUT REDUX THUNK 
// export const loginAction = (data) => {
//     console.log("DATA DARI UI/COMPONENT ==>>", data)
//     return {
//         type: "LOGIN_SUCCESS",
//         payload: data
//     }
// }  

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const updateUserCart = (data) => {
    return {
        type: "UPDATE_CART_USER",
        payload: data
    }
}