import React, { useState, useEffect } from "react";
import {
  createAssset,
  getAllAssets,
  updateAsset,
  deleteAsset,
} from "./apis/mainApis";

function App() {
  const [assets, setAssets] = useState([]);
  const [upDatedItemByid, setUpDatedItemByid] = useState({});
  const [actionState, setActionState] = useState({"add": true,"edit": false})

  const [newItem, setNewItem] = useState("");
  const [assetUtils, setAssetUtils] = useState({
    assetDescription: "",
    dateAcquired: "",
    purchasedPrice: "",
    currentValue: "",
    nextMaintenceDate: "",
    employeeNo: 1000,
    assetCategoryNo: "",
    statusNo: "",
    dateSold: ""
  });
    const [formData, setFormData] = useState("");

  const {
    assetDescription,
    dateAcquired,
    purchasedPrice,
    currentValue,
    nextMaintenceDate,
    assetCategoryNo,
    statusNo,
    dateSold,
  } = assetUtils;

  useEffect(() => {
    setFormData(new FormData());
    getAllAssets().then((response) => {
      setAssets(JSON.parse(response)?.result);
    });

  }, []);
  console.log(">> ", assets)

  // Function to fetch data from server
  const fetchData = async () => {
    try {
      const response = await fetch("https://example.com");
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error(error);
    }
    getAllAssets().then(data => {
      
    })
  };

  // Function to add new item to server
  const addNewItem = (event) => {
    event.preventDefault()
    formData.set('employeeNo', 1000)
      createAssset(formData).then(({result = []}) => {
        if (result) {
          console.log('result', result)
          setAssets([...asset, assetUtils]);
          setAssetUtils({
            assetDescription: "",
            dateAcquired: "",
            purchasedPrice: "",
            currentValue: "",
            nextMaintenceDate: "",
            employeeNo: 1000,
            assetCategoryNo: "",
            statusNo: ""
          })
        }
      })
      setFormData(new FormData());
  };

  // Function to update an existing item on the server
  const updateItem = async (id, updatedItem) => {
    
    try {
      const response = await fetch(`http://localhost:5000/asset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upDatedItemByid),
      }).then((res)=>{
        getAllAssets().then((response_3) => {
          console.log(response_3)
          setAssets(JSON.parse(response_3)?.result);
        });
        });
      } catch (error) {
        console.error(error);
      }
  };

  // Function to delete an item from the server
  const deleteItem = async (id) => {
    deleteAsset(id).then(() => {
      setAssets(assets.filter(asset => asset.assetNo !== id))
    });
  };

  const handleChange = (name) => event => {
    const {value} = event.target
    // console.log(name, value)
    setAssetUtils({ ...assetUtils, [name]: value })
    if (formData !== undefined) {
      formData.set(name, value);
    } else {
      console.error("formData is not set");
    }
  }

  return (
    <>
      <div className="flex space-x-4 mb-6 text-sm font-medium">
        <button onClick={fetchData}>Get All Assets</button>
        { actionState?.edit ?
        <button
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 "
          onClick={() => setActionState({...actionState, ...{"add": true,"edit": false}})}
        >
          Add New Asset
        </button>
        : ""}
      </div>
      
      <form>
        
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={ actionState?.edit ? upDatedItemByid?.assetDescription : assetDescription}
          placeholder="Enter Asset Description"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"assetDescription": e.target.value }})) : (handleChange("assetDescription")) }
        />

        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="date"
          value={ actionState?.edit ? upDatedItemByid?.dateAcquired : dateAcquired}
          placeholder="Enter Date Acquired"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"dateAcquired": e.target.value }})) : (handleChange("dateAcquired")) }
        />        
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={ actionState?.edit ? upDatedItemByid?.purchasedPrice : purchasedPrice}
          placeholder="Enter Purchased Price"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"purchasedPrice": e.target.value }})) : (handleChange("purchasedPrice")) }
        />
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={ actionState?.edit ? upDatedItemByid?.currentValue : currentValue}
          placeholder="Enter Current Valuen"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"currentValue": e.target.value }})) : (handleChange("currentValue")) }
        />
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="date"
          value={ actionState?.edit ? upDatedItemByid?.nextMaintenceDate : nextMaintenceDate}
          placeholder="Enter Maintenance Date"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"nextMaintenceDate": e.target.value }})) : (handleChange("nextMaintenceDate")) }
        />
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={ actionState?.edit ? upDatedItemByid?.assetCategoryNo : assetCategoryNo}
          placeholder="Enter Asset Category"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"assetCategoryNo": e.target.value }})) : (handleChange("assetCategoryNo")) }
        />
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="text"
          value={ actionState?.edit ? upDatedItemByid?.statusNo : statusNo}
          placeholder="Enter Asset Status No"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"statusNo": e.target.value }})) : (handleChange("statusNo")) }
        />
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          type="date"
          value={ actionState?.edit ? upDatedItemByid?.dateSold : dateSold}
          placeholder="Enter Date Sold"
          onChange={  actionState?.edit ? (e) => (setUpDatedItemByid({...upDatedItemByid, ...{"dateSold": e.target.value }})) : (handleChange("dateSold")) }
        />
        {
          actionState?.add ?
          <button
            type="submit"
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            onClick={addNewItem}
          >
            Add Asset
          </button>
          : ""
        }
      </form>

      { 
        actionState?.edit ?
        <button
        className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        onClick={() => updateItem(upDatedItemByid, "Updated Item")}
        >
          Update Asset
        </button>
        : ""
      }

      <div className="mt-3.5 mt-9">Assets Table</div>
      <table className="table-auto" width={"100%"}>
        <thead>
          <tr>
            <th>Asset Description</th>
            <th>Date Acquired</th>
            <th>Purchased Price</th>
            <th>Current Market Value</th>
            <th>Date Sold</th>
            <th>Next Maintenance Date</th>
            <th>Employee Number</th>
            <th>Asset Category No.</th>
            <th>Status Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody width={"100%"}>
          {assets.length > 0 ? (
            assets?.map((item) => (
              <tr key={item.assetNo}>
                <td>{item.assetDescription}</td>
                <td>{item.dateAcquired}</td>
                <td>{item.purchasedPrice}</td>
                <td>{item.currentValue}</td>
                <td>{item.dateSold}</td>
                <td>{item.nextMaintenceDate}</td>
                <td>{item.employeeNo}</td>
                <td>{item.assetCategoryNo}</td>
                <td>{item.statusNo}</td>
                <td>
                  <button onClick={() => deleteItem(item.assetNo)}>Delete</button>
                  <br />
                  <button onClick={() => {(setUpDatedItemByid(item)); (setActionState({"add": false,"edit": true} ) )}}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No assets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
