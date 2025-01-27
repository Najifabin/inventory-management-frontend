import React, { useContext, useEffect, useState } from 'react'
import { updateStockAPI } from '../services/allAPI';
import { editContext } from '../contexts/ContectShare';

const Edit = ({product}) => {
  const { editResponse, setEditResponse } = useContext(editContext);
  
  const [productDetails, setProductDetails] = useState({
    productname: product?.productname,
    category: product?.category,
    quantity: product?.quantity,
  });
  console.log(productDetails);

    useEffect(() => {
      setProductDetails({
        productname: product?.productname,
        category: product?.category,
        quantity: product?.quantity,
      });
    }, [product]);
  const handleClose = async()=>{
    setProductDetails({
      productname: product?.productname,
      category: product?.category,
      quantity: product?.quantity,
    });
  }
  const handleEdit  = async()=>{
    const id = product._id
    if (productDetails.productname && productDetails.category && productDetails.quantity) {
          // api call
          try {
            const result = await updateStockAPI(id,productDetails);
            if (result.status == 200) {
              alert(
                "Product Edited Successfully"
              );
              setEditResponse(result)
              const modalElement = document.getElementById(
                `staticBackdropedit-${product._id}`
              );
              const modalInstance = bootstrap.Modal.getInstance(modalElement);
              modalInstance.hide();
            } 
          } catch (err) {
            console.log(err);
          }
        } else {
          alert("please fill the form");
        }
  }

  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#staticBackdropedit-${product._id}`}
      >
        <i className="fa-solid fa-edit text-primary"></i>
      </button>
      <div
        className="modal fade"
        id={`staticBackdropedit-${product._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`staticBackdropLabel-${product._id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`staticBackdropLabel-${product._id}`}
              >
                Edit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor={`product-name-${product._id}`}
                    className="col-form-label"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productDetails.productname}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        productname: e.target.value,
                      })
                    }
                    className="form-control"
                    id={`product-name-${product._id}`}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor={`product-category-${product._id}`}
                    className="col-form-label"
                  >
                    Product Category
                  </label>
                  <input
                    type="text"
                    value={productDetails.category}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        category: e.target.value,
                      })
                    }
                    className="form-control"
                    id={`product-category-${product._id}`}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor={`product-quantity-${product._id}`}
                    className="col-form-label"
                  >
                    Product Quantity
                  </label>
                  <input
                    type="text"
                    value={productDetails.quantity}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        quantity: e.target.value,
                      })
                    }
                    className="form-control"
                    id={`product-quantity-${product._id}`}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleEdit}
                type="button"
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit