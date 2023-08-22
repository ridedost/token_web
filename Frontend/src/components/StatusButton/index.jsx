import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const StatusButton = () => {
  return (
    <div>
      {user.status === "completed" && (
        <div
          className="status-approve"
          onClick={() => handleDropdown(user._id)}
        >
          <span
            className={`d-inline-block dropdown ${user.show ? "show" : ""}`}
          >
            <span className="status-text-approved">
              Approved &nbsp;
              {user.show ? (
                <IoIosArrowUp fontSize={15} />
              ) : (
                <IoIosArrowDown fontSize={15} />
              )}
            </span>
            {user.show && (
              <div
                className="dropdown-menu-end dropdown-menu show"
                style={{ padding: "13px" }}
              >
                <div className="status-edit">
                  <span
                    onClick={() => setShowEditVendor(true)}
                    className="status-text-edit"
                  >
                    Edit
                  </span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="status-reject">
                  <span
                    onClick={() => handleDelete(user._id)}
                    className="status-text-reject"
                  >
                    Delete
                  </span>
                </div>
              </div>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusButton;
