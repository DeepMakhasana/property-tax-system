import { useEffect, useState } from "react";
import useMutation from "../hooks/useMutation";
import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { Axios } from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom"

const initialState = { ulb: "", tenementNumber: "", zone: "", ward: "" };

const PropertyTax = () => {
    const [formData, setFormData] = useState(initialState);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [propertyDetail, setPropertyDetail] = useState(null);
    const [zone, setZone] = useState([]);
    const [ward, setWard] = useState(null);
    const [propertyDetailLoading, setPropertyDetailLoading] = useState(false);
    const { mutate, loading } = useMutation();
    const { data: ulb } = useQuery("/ulb")
    const { user } = useAuth();
    // const navigate = useNavigate();


    // when change data it runs
    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    const handleTenementNumberFind = () => {
        if (formData.tenementNumber) {
            setPropertyDetailLoading(true);
            Axios.get(`/property/${formData.tenementNumber}`).then((res) => {
                setPropertyDetail(res.data);
            }).catch((error) => console.log(error)).finally(() => setPropertyDetailLoading(false))
        } else {
            alert("Please enter tenement number");
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        console.log("user", user)
        const options = {
            key: "rzp_test_gxKZu0qp1RcLv5",
            amount: data.amount,
            currency: data.currency,
            name: propertyDetail.ownerName,
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`http://localhost:5000/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            propertyId: propertyDetail._id,
                            userId: user.user.id
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        setPaymentStatus(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    // when form is submit then it runs
    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = await mutate("/payment/order", { amount: propertyDetail.taxAmount - propertyDetail.rebateAmount })
        console.log("order", order)
        handlePaymentVerify(order?.data)
    };

    useEffect(() => {
        if (paymentStatus) {
            toast.success("Payment Successful!")
        }
    }, [paymentStatus])

    useEffect(() => {
        if (formData.ulb) {
            Axios.get(`/ulb/${formData.ulb}/zones`).then((res) => {
                setZone(res.data);
            }).catch((error) => console.log(error))
        }
    }, [formData.ulb])

    useEffect(() => {
        if (formData.zone) {
            Axios.get(`/ulb/zones/${formData.zone}/wards`).then((res) => {
                setWard(res.data);
            }).catch((error) => console.log(error))
        }
    }, [formData.zone])

    if (paymentStatus) {
        return (
            <section className="container">
                <div className="mt-5">
                    <h1 className="display-6 text-success">Payment Success.</h1>
                    <p>{formData.tenementNumber} Property Tax Payed.</p>
                    <Link to={"/property-tax"} reloadDocument>Pay other tax.</Link>
                </div>
                <Toaster />
            </section>
        )
    }

    return (
        <section className="container">
            <div>
                <h1 className="display-6">Quick Pay</h1>
                <p>Property Tax Payment</p>
            </div>

            <div className="card p-3 my-4">
                <form className={`row g-3 needs-validation`} onSubmit={handleSubmit} method="post">
                    <div className="col-12">
                        <label htmlFor="validationName" className="form-label">
                            ULB Name
                        </label>
                        <div className="input-group has-validation">
                            <select className="form-select" id="ulb" aria-label="Default select example" onChange={(e) => {
                                onChangeHandler(e);
                                // const selectedUlb = ulb.filter((data) => data._id == e.target.value);
                                // setZone(selectedUlb[0].zones.map((zone) => zone))
                            }}>
                                <option selected>Select Nagarpalika</option>
                                {
                                    ulb?.map((ulb) => (
                                        <option key={ulb._id} value={ulb._id}>{ulb.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationTax" className="form-label">
                            Application Name
                        </label>
                        <div className="input-group has-validation">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Property Tax Payment</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="validationCustom03" className="form-label">
                            Zone
                        </label>
                        <select className="form-select" id="zone" aria-label="Default select example" onChange={(e) => {
                            onChangeHandler(e);
                            // const selectedZone = zone.filter((data) => data._id == e.target.value);
                            // setWard(selectedZone[0].wards.map((ward) => ward))
                        }}>
                            <option selected>Select Zone</option>
                            {
                                zone?.map((z) => (
                                    <option key={z._id} value={z._id}>{z.zoneName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="validationCustom03" className="form-label">
                            Ward
                        </label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Select ward</option>
                            {
                                ward?.map((w) => (
                                    <option key={w._id} value={w._id}>{w.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="validationNumber" className="form-label">
                            Tenement Number
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="text"
                                className={`form-control`}
                                id="tenementNumber"
                                placeholder="Enter Tenement Number"
                                onChange={onChangeHandler}
                                value={formData.tenementNumber}
                                required
                            />
                            <button
                                className="btn btn-secondary py-2 px-4 d-flex gap-3 justify-content-center align-items-center"
                                type="button"
                                onClick={handleTenementNumberFind}
                            >Find</button>
                        </div>
                    </div>

                    {
                        propertyDetailLoading && (<p className="text-center"><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Loading...</p>)
                    }

                    {
                        propertyDetail && (
                            <>
                                <div className="mt-4 py-2 row">
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Property Id</h4>
                                        <p>{propertyDetail.propertyId}</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Owner Name</h4>
                                        <p>{propertyDetail.ownerName}</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Address</h4>
                                        <p>{propertyDetail.address}</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Tax Amount</h4>
                                        <p>₹ {propertyDetail.taxAmount}.00</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Rebate Amount</h4>
                                        <p>₹ {propertyDetail.rebateAmount}.00</p>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <h4 className="h6">Paying Amount</h4>
                                        <p>₹ {propertyDetail.taxAmount - propertyDetail.rebateAmount}.00</p>
                                    </div>
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
                                            "Pay"
                                        )}
                                    </button>
                                </div>
                            </>
                        )
                    }
                </form>
            </div>
        </section>
    )
}

export default PropertyTax