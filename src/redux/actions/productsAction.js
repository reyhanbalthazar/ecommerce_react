import axios from "axios"
import { API_URL } from "../../helper"

export const getProductsAction = (search = null, minimum, maximum) => {
    return async (dispatch) => {
        try {
            let res;
            // cara 1
            console.log("cek SEARCH NAMA", search)
            console.log("cek MINIMUM", minimum)
            console.log("cek MAXIMUM", maximum)
            if (search) {
                res = await axios.get(`${API_URL}/products?nama=${search}`)
            } else if (minimum, maximum) {
                res = await axios.get(`${API_URL}/products?harga_gte=${minimum}&harga_lte=${maximum}`)
            } else {
                console.log("cek")
                res = await axios.get(`${API_URL}/products`)
            }

            if (search) {
                if (search.hargaAsc == "harga-asc") {
                    console.log("cek", search.hargaAsc)
                    res = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)
                }
                if (search.hargaDesc) {
                    console.log("cek", search.hargaDesc)
                    res = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)
                }
                if (search.namaAsc) {
                    console.log("cek", search.hargaAsc)
                    res = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
                }
                if (search.namaDesc) {
                    console.log("cek", search.hargaDesc)
                    res = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)
                }
            }

            // cara 2
            // res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ``}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


// export const getProductsAction = (data) => {
//     return {
//         type: "GET_DATA_PRODUCTS",
//         payload:data
//     }
// }