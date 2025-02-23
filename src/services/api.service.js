import axios from "./axios.customize"

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
    }
    return axios.put(URL_BACKEND, data)
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
        avatar: avatar,
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    // console.log(">>> check api", { fullName, email, password, phone });
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    }
    return axios.post(URL_BACKEND, data)
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND)
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

    return axios.get(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {

    const URL_BACKEND = "/api/v1/file/upload";

    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data",
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)

    return axios.post(URL_BACKEND, bodyFormData, config);
}

export {
    createUserAPI,
    fetchAllUserAPI,
    updateUserAPI,
    deleteUserAPI,
    handleUploadFile,
    updateUserAvatarAPI,
    registerUserAPI,


}