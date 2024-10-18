import { useEffect, useState } from "react";
import AddUlb from "../../components/property/AddUlb";
import AddWard from "../../components/property/AddWard";
import AddZone from "../../components/property/AddZone";
import toast, { Toaster } from "react-hot-toast";
import useQuery from "../../hooks/useQuery";
import { Axios } from "../../utils/axios";
import useMutation from "../../hooks/useMutation";
import PropertyList from "../../components/property/PropertyList";

const initialState = {
  propertyId: "",
  ulbName: "",
  zone: "",
  ward: "",
  taxAmount: "",
  rebateAmount: "",
  address: "",
  ownerName: "",
  tenementNumber: "",
};

const PropertyAdd = () => {
  const [formData, setFormData] = useState(initialState);
  const { data: ulbs } = useQuery("/ulb");
  const { mutate } = useMutation();
  const [reFetch, setReFetch] = useState(false);

  // const [ulbs, setUlbs] = useState([]);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await mutate(`/property`, {
      ...formData,
      taxAmount: Number(formData.taxAmount),
      rebateAmount: Number(formData.rebateAmount),
      tenementNumber: Number(formData.tenementNumber),
    });

    if (result.status === 201) {
      toast.success("Property created Successful!");
      setFormData(initialState);
      setReFetch((pre) => !pre);
    } else {
      toast.error(result?.response?.data?.msg || "Fail try again!");
    }

    console.log(formData, result);
  };

  useEffect(() => {
    if (formData.ulbName) {
      Axios.get(`/ulb/${formData.ulbName}/zones`)
        .then((res) => {
          setZones(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [formData.ulbName]);

  useEffect(() => {
    if (formData.zone) {
      Axios.get(`/ulb/zones/${formData.zone}/wards`)
        .then((res) => {
          setWards(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [formData.zone]);

  return (
    <div className="container mt-4 p-0">
      <div className="d-flex justify-content-end align-items-center">
        <div className="d-flex gap-3 flex-wrap">
          <div className="d-inline">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createUlbModal"
            >
              + ULB Name
            </button>
            <AddUlb />
          </div>
          <div className="d-inline">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createZone"
            >
              + Zone
            </button>
            <AddZone />
          </div>
          <div className="d-inline">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createWard"
            >
              + Ward
            </button>
            <AddWard />
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="container mt-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Property ID</label>
              <input
                type="text"
                name="propertyId"
                className="form-control"
                value={formData.propertyId}
                onChange={handleChange}
                placeholder="Property ID"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">ULB Name</label>
              <select
                name="ulbName"
                className="form-select"
                value={formData.ulbName}
                onChange={handleChange}
                required
              >
                <option value="">Select ULB</option>
                {ulbs?.map((ulb) => (
                  <option key={ulb._id} value={ulb._id}>
                    {ulb.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Zone</label>
              <select
                name="zone"
                className="form-select"
                value={formData.zone}
                onChange={handleChange}
                required
              >
                <option value="">Select Zone</option>
                {zones?.map((zone) => (
                  <option key={zone._id} value={zone._id}>
                    {zone.zoneName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Ward</label>
              <select
                name="ward"
                className="form-select"
                value={formData.ward}
                onChange={handleChange}
                required
              >
                <option value="">Select Ward</option>
                {wards?.map((ward) => (
                  <option key={ward._id} value={ward._id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Tax Amount</label>
              <input
                type="number"
                name="taxAmount"
                className="form-control"
                value={formData.taxAmount}
                onChange={handleChange}
                placeholder="Tax Amount"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Rebate Amount</label>
              <input
                type="number"
                name="rebateAmount"
                className="form-control"
                value={formData.rebateAmount}
                onChange={handleChange}
                placeholder="Rebate Amount"
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                className="form-control"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Tenement Number</label>
              <input
                type="number"
                name="tenementNumber"
                className="form-control"
                value={formData.tenementNumber}
                onChange={handleChange}
                placeholder="Tenement Number"
                required
              />
            </div>

            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* property listing */}
      <PropertyList reFetch={reFetch} />

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default PropertyAdd;
