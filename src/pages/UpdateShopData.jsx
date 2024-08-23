import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateShopData = () => {
    const [shopData, setShopData] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [apples, setApples] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://localhost:5000/api/get-shop-data', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setShopData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [navigate]);

    const handleShopChange = (e) => {
        const shop = shopData.find(shop => shop.shopId === parseInt(e.target.value));
        setSelectedShop(shop);
        setApples(shop.apples);
    };

    const handleUpdate = () => {
        const updatedData = shopData.map(shop => 
            shop.shopId === selectedShop.shopId ? { ...shop, apples } : shop
        );

        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/update-shop-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data updated successfully:', data);
        })
        .catch(error => console.error('Error updating data:', error));
    };

    return (
        <div className='mt-48'>
            <h1>Update Shop Data</h1>
            <select onChange={handleShopChange}>
                <option>Select a shop</option>
                {shopData.map(shop => (
                    <option key={shop.shopNumber} value={shop.shopNumber}>
                        Shop No: {shop.shopNumber}
                    </option>
                ))}
            </select>
            {selectedShop && (
                <div>
                    <h2>Edit Shop No: {selectedShop.shopNumber}</h2>
                    <label>
                        Apples:
                        <input 
                            type="number" 
                            value={apples} 
                            onChange={(e) => setApples(parseInt(e.target.value))}
                        />
                    </label>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default UpdateShopData;