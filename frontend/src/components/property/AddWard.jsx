import { useEffect, useState } from "react"
import useQuery from "../../hooks/useQuery"
import useMutation from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { Axios } from "../../utils/axios";

const initialState = { ulb: "", zone: "", ward: "" };
const AddWard = () => {
    const [formData, setFormData] = useState(initialState)
    const [zones, setZones] = useState([]);
    const { data: ulb } = useQuery("/ulb")
    const { mutate } = useMutation()

    const onChangeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const result = await mutate(`/ulb/zones/${formData.zone}/wards`, { name: formData.ward })

        if (result.status === 201) {
            toast.success("Ward create Successful!");
            setFormData(initialState)
        } else {
            toast.error(result?.response?.data?.msg || "Fail try again!")
        }

        console.log(formData, result);
    }

    useEffect(() => {
        if (formData.ulb) {
            Axios.get(`/ulb/${formData.ulb}/zones`).then((res) => {
                setZones(res.data);
            }).catch((error) => console.log(error))
        }
    }, [formData.ulb])

    return (
        <div className="modal fade" id="createWard" tabIndex="-1" aria-labelledby="createWardLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createWardLabel">Create Ward</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="createUlbForm">
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">Select ULB Name</label>
                                <select className="form-select" id="ulb" value={formData.ulb} aria-label="Default select example" onChange={onChangeHandler}>
                                    <option selected>Select Nagarpalika</option>
                                    {
                                        ulb?.map((ulb) => (
                                            <option key={ulb._id} value={ulb._id}>{ulb.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">Select Zone</label>
                                <select className="form-select" id="zone" value={formData.zone} aria-label="Default select example" onChange={onChangeHandler}>
                                    <option selected>Select Zone</option>
                                    {
                                        zones?.map((zone) => (
                                            <option key={zone._id} value={zone._id}>{zone.zoneName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ulbName" className="form-label">Ward</label>
                                <input type="text" className="form-control" id="ward" value={formData.ward} onChange={onChangeHandler} placeholder="Enter Ward" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" form="createUlbForm" onClick={onSubmitHandler}>Create Ward</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWard