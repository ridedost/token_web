import React, { useState } from "react";
import "./index.css";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import Camera from "../../assets/camera.svg";
const AddProductModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowAddModal,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowInput(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content" style={{ maxHeight: "700px" }}>
          <span className="cancle-modal" onClick={() => setShowAddModal(false)}>
            <AiFillCloseCircle fontSize={40} />
          </span>
          <h2 className="welcome">Add Product</h2>
          <div className="change-pic" style={{ width: "100%", padding: "0px" }}>
            <div className="Picture">
              <div className="icon-box">
                {selectedImage ? (
                  <img
                    className="profile-image"
                    src={selectedImage}
                    alt="Profile Picture"
                  />
                ) : (
                  <>
                    <img className="camera" src={Camera} />
                    <h5>Change picture</h5>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    display: showInput || selectedImage ? "block" : "",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-field">
            <input
              type="text"
              style={{ marginBottom: "25px" }}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Product Name"
            />

            <input
              type="text"
              style={{ marginBottom: "25px" }}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Price"
            />
            <input
              type="text"
              style={{ height: "100px", marginBottom: "25px" }}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="Product Description"
            />
            <button className="save-button" onClick={handleAddProduct}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
