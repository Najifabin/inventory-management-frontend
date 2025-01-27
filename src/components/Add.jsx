import React, { useContext, useState } from 'react'
import { addAPI } from '../services/allAPI';
import { addContext } from '../contexts/ContectShare';

const Add = () => {
  const { addResponse, setAddResponse } = useContext(addContext);
  const [userInput,setUserInput] = useState({
    productname:"",category:"",quantity:""
  })
  // console.log(userInput);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (userInput.productname && userInput.category && userInput.quantity) {
      // api call
      try {
        const result = await addAPI(userInput);
        if (result.status == 200) {
          alert("Product Added Successfully");
          setUserInput({ productname: "", category: "", quantity: "" });
          setAddResponse(result)
          const modalElement = document.getElementById("staticBackdrop");
          const modalInstance =
            bootstrap.Modal.getOrCreateInstance(modalElement);
          modalInstance.hide();
        } else {
          if (result.response.status == 406) {
            alert(result.response.data);
            setUserInput({ productname: "", category: "", quantity: "" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("please fill the form");
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Product
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Product
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
                  <label htmlFor="product-name" className="col-form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={userInput.productname}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        productname: e.target.value,
                      })
                    }
                    className="form-control"
                    id="product-name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="product-category" className="col-form-label">
                    Product Category
                  </label>
                  <input
                    type="text"
                    value={userInput.category}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        category: e.target.value,
                      })
                    }
                    className="form-control"
                    id="product-category"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="product-quantity" className="col-form-label">
                    Product Quantity
                  </label>
                  <input
                    type="text"
                    value={userInput.quantity}
                    onChange={(e) =>
                      setUserInput({
                        ...userInput,
                        quantity: e.target.value,
                      })
                    }
                    className="form-control"
                    id="product-quantity"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleAdd} type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add