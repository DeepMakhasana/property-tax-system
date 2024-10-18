import AddUlb from "../../components/property/AddUlb";
import AddWard from "../../components/property/AddWard";
import AddZone from "../../components/property/AddZone";
import { Toaster } from "react-hot-toast";

const PropertyAdd = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end align-items-center">
        <div className="d-flex gap-3 flex-wrap">
          <div className="d-inline">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUlbModal">
              + ULB Name
            </button>
            <AddUlb />
          </div>
          <div className="d-inline">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createZone">
              + Zone
            </button>
            <AddZone />
          </div>
          <div className="d-inline">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createWard">
              + Ward
            </button>
            <AddWard />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PropertyAdd;
