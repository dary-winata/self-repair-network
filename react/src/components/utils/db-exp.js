import axios from "axios";

const urlUser = "http://192.168.1.15:3000/v1/user"

const accessDb = async (requestData, method, url) => {
    return await axios({
        method: method,
        url: url,
        data: requestData
    })
}

export const loginUser = async (username, password) => {
    const requestData = {
        username: username,
        password: password
    }
    
    return await accessDb(requestData, "POST", urlUser + "/login")
}

export const registerUser = async (username, password, email) => {
    const requestData = {
        username: username,
        password: password,
        email: email
    }

    return await accessDb(requestData, "POST", urlUser + "/register")
}

