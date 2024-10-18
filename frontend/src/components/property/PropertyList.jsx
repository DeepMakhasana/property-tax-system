import { useEffect } from "react";
import useQuery from "../../hooks/useQuery";

const PropertyList = ({ reFetch }) => {
  const { data: propertyTaxes, isLoading, reFetchData } = useQuery("/property");

  useEffect(() => {
    if (reFetch) {
      reFetchData();
    }
  }, [reFetch]);

  return (
    <div className="container mt-5 p-0">
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
  );
};

export default PropertyList;
