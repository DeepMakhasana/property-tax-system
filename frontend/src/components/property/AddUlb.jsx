import { useState } from "react";
import useMutation from "../../hooks/useMutation";
import toast from "react-hot-toast";


const AddUlb = () => {
    const [formData, setFormData] = useState("");
    const { mutate, loading } = useMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await mutate("/ulb", { name: formData })

        if (result.status === 201) {
            toast.success("ULB create Successful!");
            setFormData("")
        } else {
            toast.error(result?.response?.data?.msg || "Fail try again!")
        }

        console.log(formData, result);
    }
    return (
        <div className="modal fade" id="createUlbModal" tabIndex="-1" aria-labelledby="createUlbModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createUlbModalLabel">Create ULB</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="createUlbForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">ULB Name</label>
                                <input type="text" className="form-control" value={formData} id="ulbName" onChange={(e) => setFormData(e.target.value)} placeholder="Enter ULB name" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form="createUlbForm">
                            {
                                loading ? "Creating..." : "Create ULB"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUlb