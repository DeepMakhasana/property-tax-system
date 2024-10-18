import { useState } from "react"
import useQuery from "../../hooks/useQuery"
import useMutation from "../../hooks/useMutation";
import toast from "react-hot-toast";

const initialState = { ulb: "", zone: "" };

const AddZone = () => {
    const { data: ulb } = useQuery("/ulb")
    const [formData, setFormData] = useState(initialState)
    const { mutate } = useMutation()

    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const result = await mutate(`/ulb/${formData.ulb}/zones`, { zoneName: formData.zone })

        if (result.status === 201) {
            toast.success("Zone create Successful!");
            setFormData(initialState)
        } else {
            toast.error(result?.response?.data?.msg || "Fail try again!")
        }

        console.log(formData, result);
    }
    return (
        <div className="modal fade" id="createZone" tabIndex="-1" aria-labelledby="createZoneLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createZoneLabel">Create Zone</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="createUlbForm">
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">Select ULB Name</label>
                                <select className="form-select" id="ulb" aria-label="Default select example" value={formData.ulb} onChange={onChangeHandler}>
                                    <option value="">Select Nagarpalika</option>
                                    {
                                        ulb?.map((ulb) => (
                                            <option key={ulb._id} value={ulb._id}>{ulb.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">Zone Name</label>
                                <input type="text" className="form-control" id="zone" value={formData.zone} onChange={onChangeHandler} placeholder="Enter Zone name" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" form="createUlbForm" onClick={onSubmitHandler}>Create Zone</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddZone