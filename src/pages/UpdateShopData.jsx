import React, { useState, useEffect } from 'react';

function UpdateShopData() {
    const [shopData, setShopData] = useState([]);
    const [shopId, setShopId] = useState('');
    const [apples, setApples] = useState('');

    
    useEffect(() => {
        fetch('http://localhost:5000/api/get-shop-data')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched shop data:', data); 
                setShopData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!shopId) {
            alert('Please select a shop');
            return;
        }

        const updatedShopData = shopData.map(shop =>
            shop.shopId === parseInt(shopId) ? { ...shop, apples: parseInt(apples) } : shop
        );

        try {
            const response = await fetch('http://localhost:5000/api/update-shop-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedShopData),
            });

            if (response.ok) {
                alert('Shop data updated successfully');
                setShopData(updatedShopData); 
            } else {
                const errorMessage = await response.text();
                alert('Failed to update shop data: ' + errorMessage);
            }
        } catch (error) {
            alert('Failed to update shop data: ' + error);
        }
    };

    return (
        <div className='mt-28'>
            <h2>Update Shop Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Select Shop ID:</h3>
                    {shopData.length === 0 ? (
                        <p>Loading shop data...</p>
                    ) : (
                        shopData.map((shop) => (
                            <div key={shop.shopId}>
                                <label>
                                    <input
                                        type="radio"
                                        name="shopId"
                                        value={shop.shopId}
                                        onChange={(e) => {
                                            console.log('Selected shop ID:', e.target.value); 
                                            setShopId(e.target.value);
                                        }}
                                    />
                                    Shop {shop.shopId} (Apples: {shop.apples})
                                </label>
                            </div>
                        ))
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        value={apples}
                        onChange={(e) => setApples(e.target.value)}
                        placeholder="Number of Apples"
                        required
                    />
                </div>
                <button type="submit">Update Data</button>
            </form>
        </div>
    );
}

export default UpdateShopData;
