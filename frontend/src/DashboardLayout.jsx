import { Link, Outlet, useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';

const DashboardLayout = () => {
    const { user, setAuthToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user?.user?.role !== "admin") {
                navigate("/");
            }
        }
    }, [navigate, user?.user?.role, user])

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 col-lg-2 d-md-block sidebar bg-white">
                    <div className="position-sticky top-0">
                        <h4 className="p-3">eNagar</h4>
                        <ul className="nav flex-column border-top pt-3">
                            <li className="nav-item">
                                <Link className="nav-link  active" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/property">Property</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/user">User</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="#">Settings</Link>
                            </li> */}
                        </ul>
                    </div>
                </nav>

                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                    <nav className="navbar navbar-expand-lg navbar-light position-sticky top-0 z-1 bg-white">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Welcome, Admin!</a>
                            <div>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item" style={{ cursor: "pointer" }}>
                                        <div className="nav-link" onClick={() => setAuthToken("")}>Logout</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout