import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ShowData() {
    const [shopData, setShopData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/get-shop-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setShopData(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });

        socket.on('data-updated', (newData) => {
            setShopData(newData);
        });

        return () => {
            socket.off('data-updated');
        };
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='mt-48'>
            <h1>Shop Data</h1>
            <ul>
                {shopData.map((shop, index) => (
                    <li key={index}>Shop {index + 1}: {shop.apples} apples</li>
                ))}
            </ul>
        </div>
    );
}

export default ShowData;
