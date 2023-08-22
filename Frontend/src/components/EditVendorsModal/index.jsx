import React from "react";
import "./index.css";
import { AiFillCloseCircle } from "react-icons/ai";

const EditVendorsModal = ({
  vendor,
  editVendorsId,
  editVendors,
  setShowEditVendor,
  setEditVendors,
  handleEditVendors,
}) => {
  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span
            className="cancle-modal"
            onClick={() => setShowEditVendor(false)}
          >
            <AiFillCloseCircle fontSize={40} />
          </span>
          <h4 className="welcome">Edit Vendors</h4>
          <div className="form-field">
            <input
              type="text"
              defaultValue={editVendors.name || vendor.name}
              onChange={(e) =>
                setEditVendors({ ...editVendors, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="text"
              defaultValue={editVendors.email || vendor.email}
              onChange={(e) =>
                setEditVendors({ ...editVendors, email: e.target.value })
              }
              placeholder="Email"
              disabled={true}
            />
            <input
              type="text"
              defaultValue={editVendors.phoneNumber || vendor.phoneNumber}
              onChange={(e) =>
                setEditVendors({ ...editVendors, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
              disabled={true}
            />
            <input
              type="text"
              defaultValue={editVendors.companyName || vendor.companyName}
              onChange={(e) =>
                setEditVendors({ ...editVendors, companyName: e.target.value })
              }
              placeholder="Company"
            />
            <button
              className="save-button"
              onClick={() => handleEditVendors(editVendorsId)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVendorsModal;
