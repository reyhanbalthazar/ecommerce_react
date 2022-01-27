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
            let response = await axios.post(`${API_URL}/users/login`, {
                email, password
            })
            if (response.data.success) {
                localStorage.setItem("data", response.data.dataLogin.token)
                // dispatch : meneruskan data kereducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.dataLogin
                })
                return { success: response.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data");
            if (token) {
                let res = await axios.get(`${API_URL}/users/keep`, {
                    headers: {
                        'Authorization':`Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                }
                return { success: res.data.success }
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