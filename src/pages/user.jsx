import UserForm from "../components/user/user.form"
import UserTable from "../components/user/user.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const res = await fetchAllUserAPI()
        setDataUsers(res.data)
    }

    return (
        <div>

            <UserForm loadUsers={loadUsers} />
            <UserTable dataUsers={dataUsers} />

        </div>
    )
}

export default UserPage