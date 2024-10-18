import RecentPayment from "../../components/RecentPayment";
import useQuery from "../../hooks/useQuery";

const Dashboard = () => {
    const { data: payments, isLoading: paymentLoading } = useQuery("/payment/paymentCount");
    const { data: users, isLoading: userLoading } = useQuery("/auth/usersCount");
    const { data: ulbs, isLoading: ulbsLoading } = useQuery("/ulb");
    return (
        <div className="container mt-4">
            <div className="row">

                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            {
                                paymentLoading ? <p>Loading...</p> : <h5 className="card-title">{payments?.totalPayments < 10 && "0"}{payments?.totalPayments}</h5>
                            }
                            <p className="card-text">Total number of payments</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            {
                                userLoading ? <p>Loading...</p> : <h5 className="card-title">{users?.totalUsers < 10 && "0"}{users?.totalUsers}</h5>
                            }
                            <p className="card-text">Total number of users</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            {
                                ulbsLoading ? <p>Loading...</p> : <h5 className="card-title">{ulbs?.length < 10 && "0"}{ulbs?.length}</h5>
                            }
                            <p className="card-text">Total number of ULB</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Performance</h5>
                            <p className="card-text">Track system performance.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Settings</h5>
                            <p className="card-text">Adjust system preferences.</p>
                        </div>
                    </div>
                </div>
            </div> */}

            <RecentPayment />
        </div>
    )
}

export default Dashboard