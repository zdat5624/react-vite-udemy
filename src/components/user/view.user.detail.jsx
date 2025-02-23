import { Drawer, notification } from "antd";
import { Button } from 'antd';
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {


    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUsers } = props;
    // console.log(">>> check props: ", props);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {

        if (!event.target.files || event.target.files.length == 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }

    }

    const handleUpdateUserAvatar = async () => {
        // step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");

        if (resUpload.data) {
            //  success
            const newAvatar = resUpload.data.fileUploaded;
            // step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUpdateAvatar.data) {
                notification.success({
                    message: "Update user avatar",
                    description: "Update avatar success",
                })
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUsers();
            } else {
                notification.error({
                    message: "Update avatar error",
                    description: JSON.stringify(resUpload.message)
                })
            }

        } else {
            notification.error({
                message: "Upload file error",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }



    }

    return (
        <>
            <Drawer
                title="Detail"
                onClose={() => {
                    setIsDetailOpen(false);
                    setDataDetail(null);
                }}
                open={isDetailOpen}>

                {dataDetail ? <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>

                    <div style={{ marginTop: "15px", marginBottom: "20px", width: "150px", height: "100px", border: "1px solid #ccc", }}>
                        <img
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                            alt=""
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="btnUpload"
                            style={{ cursor: "pointer", marginTop: "20px", padding: "10px 15px", background: "orange", borderRadius: "5px", }}
                        >
                            Upload avatar
                        </label>
                        <input
                            type="file"
                            hidden
                            id="btnUpload"
                            onChange={(event) => { handleOnChangeFile(event) }}
                        />
                    </div>

                    {preview &&
                        <>

                            <div style={{ marginTop: "15px", marginBottom: "20px", width: "150px", height: "100px", border: "1px solid #ccc", }}>
                                <img
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    src={preview}
                                    alt=""
                                />
                            </div>

                            <Button
                                type='primary'
                                onClick={() => { handleUpdateUserAvatar() }}
                            >Save</Button>
                        </>
                    }

                </>
                    :
                    <>
                        <p>No data</p>
                    </>
                }

            </Drawer >
        </>
    );
};

export default ViewUserDetail