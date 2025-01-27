import commonAPI from "./CommonAPI";
import SERVER_BASE_URL from "./serverURL";

// registerAPI
export const addAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-stocks`,reqBody)
}

export const getAllStocksAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-stocks`,{})
}

export const updateStockAPI = async (id,reqBody)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/stock/${id}/edit`,reqBody)
}

export const searchedProductsAPI = async (searchKey)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/search?search=${searchKey}`,{})
}

export const deleteStockAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/delete/${id}`,{})
}