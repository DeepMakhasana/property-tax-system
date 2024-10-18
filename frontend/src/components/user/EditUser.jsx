import { useEffect, useState } from "react"
import useMutation from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { Axios } from "../../utils/axios";

const initialState = { name: "", email: "", contactNumber: "" };
const EditUser = ({ id, setSuccess }) => {
    const [formData, setFormData] = useState(initialState)
    const { mutate, loading } = useMutation()


    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const onSubmitHandler = async () => {
        console.log("mutate")
        const result = await mutate(`/auth/users/${id}`, formData)

        if (result.status === 201) {
            toast.success("User data update Successful!");
            setFormData(initialState)
            setSuccess(pre => pre + 1)
        } else {
            toast.error(result?.response?.data?.msg || "Fail try again!")
        }

        console.log(formData, result);
    }
    useEffect(() => {
        if (id) {
            Axios.get(`/auth/users/${id}`).then((res) => {
                setFormData(res.data);
            }).catch((error) => console.log(error))
        }
    }, [id])

    return (
        <div className="modal fade" id="userEdit" tabIndex="-1" aria-labelledby="userEditLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userEditLabel">Edit user detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className={`row g-3 needs-validation`} method="post">
                            <div className="col-12">
                                <label htmlFor="validationCustomName" className="form-label">
                                    Name
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className={"form-control"}
                                        id="name"
                                        placeholder="jone dov"
                                        onChange={onChangeHandler}
                                        value={formData.name}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="validationCustomemail" className="form-label">
                                    Email
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="email"
                                        placeholder="xyz@gmail.com"
                                        onChange={onChangeHandler}
                                        value={formData.email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="validationCustomNumber" className="form-label">
                                    Number
                                </label>
                                <div className="input-group has-validation">
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="contactNumber"
                                        placeholder="+91"
                                        onChange={onChangeHandler}
                                        value={formData.contactNumber}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" form="createUlbForm" onClick={onSubmitHandler} data-bs-dismiss="modal">{loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </>
                        ) : (
                            "Edit"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser