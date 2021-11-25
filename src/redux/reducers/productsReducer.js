const INITIAL_STATE={
    id:null,
    nama:"",
    deskripsi:"",
    brand:"",
    kategori:"",
    harga:null,
    stock:[],
    images:[]
}
// Func userReducer :untuk mereturn data dari action.payload agar dapat disimpan oleh STATE REDUCER
export const productsReducer = (state=INITIAL_STATE, action)=>{
    // SWITCH...CASE : digunakan untuk menentukan data dari action.payload untuk disimpan ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "GET_DATA_SUCCESS":
            console.log("DATA DARI ACTION PAYLOAD", action.payload)
            return{
                ...state,
                id:action.payload.id,
                nama:action.payload.nama,
                deskripsi:action.payload.deskripsi,
                brand:action.payload.brand,
                kategori:action.payload.kategori,
                harga:action.payload.harga,
                stock:action.payload.stock,
                images:action.payload.images
            }
        default:
            return state
    }
}