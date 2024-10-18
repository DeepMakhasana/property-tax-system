import { useEffect, useState } from "react";
import AddUlb from "../../components/property/AddUlb";
import AddWard from "../../components/property/AddWard";
import AddZone from "../../components/property/AddZone";
import toast, { Toaster } from "react-hot-toast";
import useQuery from "../../hooks/useQuery";
import { Axios } from "../../utils/axios";
import useMutation from "../../hooks/useMutation";

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

const editInitialState = {
  tenementNumber: "",
  propertyId: ""
}

const PropertyAdd = () => {
  const [formData, setFormData] = useState(initialState);
  const { data: ulbs } = useQuery("/ulb");
  const { mutate } = useMutation();
  const [reFetch, setReFetch] = useState(false);
  const [editId, setEditId] = useState(editInitialState);

  // const [ulbs, setUlbs] = useState([]);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  const { data: propertyTaxes, isLoading, reFetchData } = useQuery("/property");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds a smooth scroll effect
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId?.propertyId != "") {
      console.log("edited: ", formData)
      const editResult = await mutate(`/property/${editId?.propertyId}`, {
        ...formData,
        taxAmount: Number(formData.taxAmount),
        rebateAmount: Number(formData.rebateAmount),
        tenementNumber: Number(formData.tenementNumber),
      });

      if (editResult.status === 201) {
        toast.success("Property Edited Successful!");
        setFormData(initialState);
        setReFetch((pre) => !pre);
      } else {
        toast.error(editResult?.response?.data?.msg || "Fail try again!");
      }
    } else {
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
    }
  };

  const handleDelete = async (id) => {
    Axios.delete(`/property/${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        setReFetch((pre) => !pre);
      })
      .catch((error) => console.log(error));
  }

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

  useEffect(() => {
    if (editId.tenementNumber != "") {
      Axios.get(`/property/${editId.tenementNumber}`)
        .then((res) => {
          console.log(res)
          scrollToTop()
          setFormData({
            propertyId: res?.data?.propertyId,
            ulbName: res?.data?.ulbName,
            zone: res?.data?.zone,
            ward: res?.data?.ward,
            taxAmount: res?.data?.taxAmount,
            rebateAmount: res?.data?.rebateAmount,
            address: res?.data?.address,
            ownerName: res?.data?.ownerName,
            tenementNumber: res?.data?.tenementNumber,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [editId]);

  useEffect(() => {
    if (reFetch) {
      reFetchData();
    }
  }, [reFetch]);

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
                disabled={editId?.propertyId ? true : false}
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
                disabled={editId?.propertyId ? true : false}
                required
              />
            </div>

            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                {
                  editId.propertyId != "" ? "Edit" : "Submit"
                }
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* property listing */}
      <div className="container my-5 p-0">
        <h2 className="mb-3">Property Tax Records</h2>
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
                  <th scope="col" style={{ minWidth: "200px" }}>
                    ULB Name
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Owner Name
                  </th>
                  <th scope="col" style={{ minWidth: "200px" }}>
                    Tenement Number
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Tax Amount
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Rebate Amount
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {propertyTaxes?.length > 0 ? (
                  propertyTaxes?.map((tax, index) => (
                    <tr key={index}>
                      <td>{tax?.propertyId}</td>
                      <td>{tax?.ulbName.name}</td>
                      <td>{tax?.ownerName}</td>
                      <td>{tax?.tenementNumber}</td>
                      <td>{tax?.taxAmount}</td>
                      <td>{tax?.rebateAmount}</td>
                      <td>
                        <div><span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setEditId({ tenementNumber: tax?.tenementNumber, propertyId: tax?.propertyId })}>Edit</span> | <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => { handleDelete(tax?.propertyId) }}>Delete</span></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Property Tax Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default PropertyAdd;
