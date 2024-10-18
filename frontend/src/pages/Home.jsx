import HeroIllustration from "../assets/HeroIllustration.svg"
const Home = () => {
    return (
        <div className="container">
            <div
                className="row d-flex align-items-center justify-content-center"
                style={{ height: "calc(100vh - 88px)" }}
            >
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="mb-3">Simplify Your Property Tax Payments</h1>
                    <p>
                        Easy Tax Payments: Secure and hassle-free online tax payments.
                        Multiple Payment Options: Support for credit cards, debit cards, net banking, UPI, and e-wallets (Razorpay, for example).
                        Payment History: View and download receipts of previous payments.
                        Property Details: Easy access to property details like location, tax zone, and ward information.
                    </p>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={HeroIllustration} alt="Hero" className="w-75" />
                </div>
            </div>
        </div>
    )
}

export default Home