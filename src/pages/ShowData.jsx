import React, { useState, useEffect } from 'react';

function ShowData() {
    const [shopData, setShopData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/get-shop-data')
            .then(response => response.json())
            .then(data => {
                setShopData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='mt-52'>
            <h1>Shop Data</h1>
            {shopData.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {shopData.map(shop => (
                        <li key={shop.shopId}>
                            Shop {shop.shopId}: Apples - {shop.apples}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ShowData;