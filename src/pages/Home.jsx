import React, { useContext, useEffect, useState } from 'react'
import Edit from '../components/Edit';
import Add from '../components/Add';
import { deleteStockAPI, getAllStocksAPI, searchedProductsAPI } from '../services/allAPI';
import { addContext, editContext } from '../contexts/ContectShare';

const Home = () => {
  const { addResponse, setAddResponse } = useContext(addContext);
  const { editResponse, setEditResponse } = useContext(editContext);
  const [products,setProducts] = useState([])
  console.log(products);
  const [searchKey, setSearchKey] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  

    useEffect(() => {
      getAllStocks();
    }, [addResponse,editResponse]);

    const getAllStocks = async () => {
      try {
        const result = await getAllStocksAPI();
        // console.log("result",result.data);
        if (result.status == 200) {
          setProducts(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleSearch = async (e) => {
      setSearchedProducts([]);
      setSortOption("");
      setSearchKey(e.target.value);
      try {
        const result = await searchedProductsAPI(e.target.value);
        if (result.status == 200) {
          setSearchedProducts(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async(id)=>{
      try{
        const result = await deleteStockAPI(id)
        if (result.status == 200) {
          alert("Product Deleted")
          getAllStocks()
        }
      }catch(err){
        console.log(err);
        
      }
    }

    const handleSortChange = (e) => {
      const selectedOption = e.target.value
      console.log(selectedOption,"selctedOption");
      
      setSortOption(selectedOption)

      if (selectedOption === "quantity") {
        const productsToSort = searchKey === "" ? products : searchedProducts;

        console.log(productsToSort, "Products to sort");

        if (productsToSort.length > 0) {
          const sortedProducts = [...productsToSort].sort(
            (a, b) => a.quantity - b.quantity
          );
          if (searchKey === "") {
            setProducts(sortedProducts)
          } else {
            setSearchedProducts(sortedProducts)
          }
        } else {
          console.log("No products available to sort")
        }
      }
    };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div
          style={{ height: "15vh" }}
          className="d-flex justify-content-center align-items-center bg-success"
        >
          <h1>Inventory Management App</h1>
        </div>
        <div className="px-4 py-2 d-flex justify-content-between align-items-center bg-success-subtle">
          <h3>All Products</h3>
          <div className="d-flex align-items-center ">
            <div className="d-flex">
              <input
                onChange={(e) => handleSearch(e)}
                type="text"
                className="form-control me-3"
                placeholder="Search by category"
              />
              <select
                name="sort"
                id="sort"
                className="rounded p-1 me-3"
                defaultValue=""
                value={sortOption}
                onChange={handleSortChange}
                required
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="quantity">Quantity</option>
              </select>
            </div>
            <div>
              <Add />
            </div>
          </div>
        </div>

        <div className="p-2">
          <table className="table table-bordered  p-4">
            <thead>
              <tr className="table-secondary">
                <th scope="col">#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            {searchKey == "" ? (
              <>
                <tbody>
                  {products?.map((product, index) => (
                    <>
                      <tr key={product._id}>
                        <th scope="row">{index+1}</th>
                        <td
                          className={
                            product.quantity < 10 ? "table-danger" : ""
                          }
                        >
                          {product.productname}
                        </td>
                        <td>{product.category}</td>
                        <td
                          className={
                            product.quantity < 10 ? "table-danger" : ""
                          }
                        >
                          {product.quantity}
                        </td>

                        <td>
                          <Edit product={product} />
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn"
                          >
                            <i className="fa-solid fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </>
            ) : (
              <>
                <tbody>
                  {searchedProducts?.map((product, index) => (
                    <>
                      <tr key={product._id}>
                        <th scope="row">{index}</th>
                        <td
                          className={
                            product.quantity < 10 ? "table-danger" : ""
                          }
                        >
                          {product.productname}
                        </td>
                        <td>{product.category}</td>

                        <td
                          className={
                            product.quantity < 10 ? "table-danger" : ""
                          }
                        >
                          {product.quantity}
                        </td>

                        <td>
                          <Edit product={product} />
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn"
                          >
                            <i className="fa-solid fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Home