
export const productAction = (data) => {
    console.log("DATA DARI UI/COMPONENT ==>>", data)
    return {
        type: "GET_DATA_SUCCESS",
        payload: data
    }
}   