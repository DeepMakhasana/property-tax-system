import { useState } from "react";
import useMutation from "../../hooks/useMutation.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const initialState = { email: "", password: "" };

const AdminLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { mutate, loading } = useMutation();
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!formData.email) validationErrors.email = "email is required";
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
      console.log("formData", formData);
      // login api call
      const res = await mutate("/auth/admin/login", formData);

      if (res.status === 400 || res.status === 500) {
        alert(res.response.data.msg);
      }

      if (res.data.token && res.status === 200) {
        setFormData(initialState);
        alert("Login successfully!");
        setAuthToken(res.data?.token);
        navigate("/dashboard");
      }
    }
  };

  return (
    <section
      className="container d-flex justify-content-center flex-column border-1"
      style={{ maxWidth: "500px", height: "calc(100vh - 88px)" }}
    >
      <h1 className="mb-4">Admin Login</h1>
      <p className="pb-4">
        Demo email: <strong>admin@example.com</strong> and password: <strong>admin@123</strong>
      </p>
      <form className={`row g-3 needs-validation`} onSubmit={handleSubmit} method="post">
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
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="validationCustom03" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            placeholder="password"
            onChange={onChangeHandler}
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
              "Login"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
