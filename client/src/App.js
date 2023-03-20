import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Function to fetch data from server
  const fetchData = async () => {
    try {
      const response = await fetch('https://example.com');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add new item to server
  const addNewItem = async () => {
    try {
      const response = await fetch('https://example.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newItem }),
      });
      const data = await response.json();
      setData([...data, newItem]);
      setNewItem('');
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update an existing item on the server
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`https://example.com/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedItem }),
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete an item from the server
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://example.com/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex space-x-4 mb-6 text-sm font-medium">
      <button onClick={fetchData}>Get Data</button>
          <input
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        type="text"
              value={newItem}
              placeholder="Enter Asset"
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={addNewItem}>Add Item</button>
      <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 " onClick={() => updateItem(1, 'Updated Item')}>Update Item</button>
      <button onClick={() => deleteItem(1)}>Delete Item</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
