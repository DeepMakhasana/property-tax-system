import { useEffect, useState } from 'react';
import useQuery from '../../hooks/useQuery';
import EditUser from '../../components/user/EditUser';
import { Axios } from '../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const UserManagement = () => {
    const { data: users, isLoading, reFetchData } = useQuery("/auth/users");
    const [editId, setEditId] = useState(null);
    const [success, setSuccess] = useState(1);

    useEffect(() => {
        reFetchData()
    }, [success])

    const deleteUser = (deleteId) => {
        Axios.delete(`/auth/users/${deleteId}`)
            .then((res) => {
                toast.success(res?.data?.message);
                reFetchData();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="container mt-5 p-0">
            <h2 className="pb-2">Registered User</h2>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                    ></span>
                    <span role="status">Loading...</span>
                </div>
            ) : (
                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" style={{ minWidth: "150px" }}>
                                    user ID
                                </th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Name
                                </th>
                                <th scope="col" style={{ minWidth: "150px" }}>
                                    Email
                                </th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Contact Number
                                </th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? (
                                users?.map((user) => (
                                    <tr key={user?._id}>
                                        <td>{user?._id}</td>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.contactNumber}</td>
                                        <td>
                                            <div><span type="button"
                                                className="text-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#userEdit" onClick={() => setEditId(user?._id)}>Edit</span> | <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => { deleteUser(user?._id) }}>Delete</span></div>
                                            <EditUser id={editId} setSuccess={setSuccess} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No Property Tax Records Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Toaster />
                </div>
            )}
        </div>
    )
}

export default UserManagement