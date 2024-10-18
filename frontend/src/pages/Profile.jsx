import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
// import useQuery from "../hooks/useQuery"
import { Axios } from "../utils/axios";

const Profile = () => {
    const { user, setAuthToken } = useAuth();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.user?.id) {
            Axios.get(`/payment/history/${user.user.id}`)
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                })
                .catch((error) => console.log(`/payment/history/${user.user.id} Query error: `, error))
                .finally(() => setIsLoading(false));
        }

    }, [user?.user?.id]);
    console.log("profile: ", user);

    return (
        <section className="container mt-4">
            {/* <div style={{ maxWidth: "100px", maxHeight: "100px" }}>
                <img
                    src={userProfileData.image}
                    alt={userProfileData.username}
                    className="img-fluid rounded-circle border border-secondary-subtle"
                />
            </div> */}
            <div className="mt-4">
                <h5 className="display-6">{user?.user.name}</h5>
                <p>{user?.user.email}</p>
            </div>
            <div className="my-4">
                <h4 className="display-6 mb-2">History</h4>
                {
                    isLoading ? (
                        <div>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Loading...</span>
                        </div>
                    ) : (
                        <div>
                            {
                                data.map((history) => (
                                    <div key={history._id} className="card mt-3 p-2">
                                        <h5 className="h6">{history.propertyId.propertyId}</h5>
                                        <p className="mb-0">Tenement Number: {history.propertyId.tenementNumber}</p>
                                        <p className="mb-0">Owner Name: {history.propertyId.ownerName}</p>
                                        <p className="mb-0">Payed amount: {history.propertyId.taxAmount - history.propertyId.rebateAmount}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </div>
            <p
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setAuthToken("")}
            >
                Logout
            </p>
        </section>
    )
}

export default Profile