import useQuery from '../hooks/useQuery';

const RecentPayment = () => {
    const { data: payments, isLoading } = useQuery("/payment/recentPayments");

    // useEffect(() => {
    //     if (reFetch) {
    //         reFetchData();
    //     }
    // }, [reFetch]);

    return (
        <div className="container mt-5 p-0">
            <h2 className="mb-3">Recent Payments</h2>
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
                                    Property ID
                                </th>
                                <th scope="col" style={{ minWidth: "150px" }}>
                                    Payment Id
                                </th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Tenement Number
                                </th>
                                <th scope="col" style={{ minWidth: "150px" }}>
                                    Owner Name
                                </th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Payed Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.length > 0 ? (
                                payments?.map((history, index) => (
                                    <tr key={index}>
                                        <td>{history?.propertyId?.propertyId}</td>
                                        <td>{history?.razorpay_order_id}</td>
                                        <td>{history?.propertyId?.tenementNumber}</td>
                                        <td>{history?.propertyId?.ownerName}</td>
                                        <td>{history?.propertyId?.taxAmount - history?.propertyId?.rebateAmount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No Payment Records Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default RecentPayment