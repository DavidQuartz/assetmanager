// create asset
export const createAssset = (asset) => {
    const assetObject = Object.fromEntries(asset.entries())
  return fetch('http://localhost:5000/asset', {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(assetObject),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// fetch all assets
export const getAllAssets = () => {
  const axios = require('axios');
  let data = '';
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:5000/asset',
    headers: { },
    data : data
  };
  
  
    return axios.request(config)
    .then((response) => {
      return (JSON.stringify(response.data));
    })
    .catch((error) => {
      return(error);
    });
};

// update asset
export const updateAsset = () => {
    return fetch("http://localhost:5000/asset", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
};

// detele asset
export const deleteAsset = (id) => {
    return fetch("http://localhost:5000/asset", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"assetNo": id}),

    })
      .then((res) => {return res.json()})
      .catch((err) => console.log(err));
};
