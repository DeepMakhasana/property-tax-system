import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useMutation from "../hooks/useMutation";
import useAuth from "../hooks/useAuth";

const initialState = { name: "", email: "", contactNumber: "", password: "" };

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const { mutate, loading } = useMutation();
    const { setAuthToken } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const validationErrors = {};

        if (!formData.name) validationErrors.name = "name is required";
        if (!formData.email) validationErrors.email = "email is required";
        if (!formData.contactNumber) validationErrors.contactNumber = "number is required";
        if (!formData.password) validationErrors.password = "password is required";

        return validationErrors;
    };

    // when change data it runs
    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // when form is submit then it runs
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation check
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("formData", formData)
            // login api call
            const res = await mutate("/auth/register", formData);

            if (res.status === 400 || res.status === 500) {
                alert(res.response.data.msg);
            }

            if (res.data.token && res.status === 200) {
                setFormData(initialState);
                alert("Register successfully!");
                setAuthToken(res.data?.token)
                navigate("/");
                navigate(0);
            }
        }
    };

    return (
        <section
            className="container d-flex justify-content-center flex-column border-1"
            style={{ maxWidth: "500px", height: "calc(100vh - 88px)" }}
        >
            <h1 className="mb-4">Registration</h1>
            {/* <p className="pb-4">
                Demo username: <strong>'emilys'</strong> and password: <strong>'emilyspass'</strong>
            </p> */}
            <form className={`row g-3 needs-validation`} onSubmit={handleSubmit} method="post">
                <div className="col-12">
                    <label htmlFor="validationCustomName" className="form-label">
                        Name
                    </label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            id="name"
                            placeholder="jone dov"
                            onChange={onChangeHandler}
                            value={formData.name}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustomemail" className="form-label">
                        Email
                    </label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            placeholder="xyz@gmail.com"
                            onChange={onChangeHandler}
                            value={formData.email}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustomNumber" className="form-label">
                        Number
                    </label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                            id="contactNumber"
                            placeholder="+91"
                            onChange={onChangeHandler}
                            value={formData.contactNumber}
                            required
                        />
                        {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        // className="form-control"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        id="password"
                        placeholder="password"
                        onChange={onChangeHandler}
                        value={formData.password}
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="col-12">
                    <button
                        className="btn btn-secondary py-2 px-4 d-flex gap-3 justify-content-center align-items-center"
                        type="submit"
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </div>
            </form>
            <p className="mt-2 ">Already have an account? <Link to="/login">Log in</Link></p>
        </section>
    )
}

export default Register