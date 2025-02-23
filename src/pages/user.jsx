import UserForm from "../components/user/user.form"
import UserTable from "../components/user/user.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUsers();
    }, [current, pageSize])

    const loadUsers = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);

        }

    }

    return (
        <div>

            <UserForm loadUsers={loadUsers} />
            <UserTable
                dataUsers={dataUsers}
                loadUsers={loadUsers}
                current={current}
                pageSize={pageSize}
                total={total}

                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />

        </div>
    )
}

export default UserPage