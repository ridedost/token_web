/** @format */

import React, { useState } from 'react';
import './index.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import Camera from '../../assets/camera.svg';
import { upload_Image } from '../../Api/cloudImage';
import { toast } from 'react-toastify';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';

const AddProductModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowAddModal,
  setImageUrl,
  imageUrl,
  currentPage,
  // setImageResponse,
  // imageResponse,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      event.target.value = null; // Reset the input field
      setSelectedImage(null);
      return;
    }

    dispatch(setFetching(true));
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowInput(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'imageridedost');
    data.append('cloud_name', 'dlrgh9gam');
    try {
      let response = await upload_Image(data);
      // setImageResponse(response.status);
      const imageUrl = response?.data?.secure_url; // Capture imageUrl here
      setImageUrl(imageUrl);
      dispatch(setFetching(false)); // Set the state variable
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="cancle-modal" onClick={() => setShowAddModal(false)}>
            <AiFillCloseCircle fontSize={40} />
          </span>
          <h4 className="welcome">Add Product</h4>
          <div className="change-pic" style={{ width: '100%', padding: '0px' }}>
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
                    <h5>Add picture</h5>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    display: showInput || selectedImage ? 'block' : '',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-field">
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Product Name"
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Price"
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={newProduct.rating}
              onChange={(e) =>
                setNewProduct({ ...newProduct, rating: e.target.value })
              }
              placeholder="Rating"
            />
            <input
              type="text"
              style={{ height: '66px', marginBottom: '15px' }}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="Product description "
            />
            {/* {imageResponse === 200 ? (
              <button
                className="save-button"
                onClick={() => handleAddProduct(imageUrl)}
              >
                Submit
              </button>
            ) : null} */}
            <button
              className="save-button"
              onClick={() => handleAddProduct(imageUrl, currentPage)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
