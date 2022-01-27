import axios from "axios"
import { API_URL } from "../../helper"

export const getProductsAction = (search = null) => {
    return async (dispatch) => {
        try {
            let res;
            // cara 1
            console.log("cek SEARCH NAMA", search)
            // console.log("cek MINIMUM", minimum)
            // console.log("cek MAXIMUM", maximum)
            if(search){
                if(search.name){
                    if(search.maximum > 0 && search.minimum) {
                        res = await axios.get(`${API_URL}/products?minimum=${search.minimum}&maximum=${search.maximum}&name=${search.name}`)
                    } else {
                        res = await axios.get(`${API_URL}/products?name=${search.name}`)
                    }
                } else {
                    res = await axios.get(`${API_URL}/products?minimum=${search.minimum}&maximum=${search.maximum}`)
                }
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            // if (search) {
            //     res = await axios.get(`${API_URL}/products?name=${search.name}`)
            // } if (minimum, maximum) {
            //     res = await axios.get(`${API_URL}/products?minimum=${minimum}&maximum=${maximum}`)
            // } else {
            //     console.log("cek")
            //     res = await axios.get(`${API_URL}/products`)
            // }

            // if (search) {
            //     if (search.hargaAsc === "harga-asc") {
            //         console.log("cek", search.hargaAsc)
            //         res = await axios.get(`${API_URL}/products?_sort=price&_order=asc`)
            //     }
            //     if (search.hargaDesc) {
            //         console.log("cek", search.hargaDesc)
            //         res = await axios.get(`${API_URL}/products?_sort=price&_order=desc`)
            //     }
            //     if (search.namaAsc) {
            //         console.log("cek", search.hargaAsc)
            //         res = await axios.get(`${API_URL}/products?_sort=name&_order=asc`)
            //     }
            //     if (search.namaDesc) {
            //         console.log("cek", search.hargaDesc)
            //         res = await axios.get(`${API_URL}/products?_sort=name&_order=desc`)
            //     }
            // }

            // cara 2
            // res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ``}`)
            console.log("resdata", res.data)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data.dataProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getBrandCategory = () => {
    return async (dispatch) => {
        try {
            let resBrand = await axios.get(`${API_URL}/products/getbrand`);
            let resCategory = await axios.get(`${API_URL}/products/getcategory`);

            dispatch({
                type: "GET_DATA_BRAND_CATEGORY",
                payload: { brand: resBrand.data.brandList, category: resCategory.data.categoryList }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export const getProductAction = (search, minimum, maximum) => {
//     return async (dispatch) => {
//         try {
//             let res;
//             if (search) {
//                 res = await axios.get(${API_URL}/products?nama=${search})
//             } else if (minimum, maximum) {
//                 res = await axios.get(${API_URL}/products?harga_gte=${minimum}&harga_lte=${maximum})
//             } else {
//                 res = await axios.get(${API_URL}/products)
//             }
//             dispatch({
//                 type: "GET_DATA_PRODUCTS",
//                 payload: res.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }