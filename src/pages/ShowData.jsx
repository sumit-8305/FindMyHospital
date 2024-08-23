import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ShowData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch initial data from the server
        fetch('http://localhost:5000/api/get-shop-data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));

        // Set up a WebSocket connection to listen for real-time updates
        const socket = io('http://localhost:5000');

        socket.on('data-updated', (updatedData) => {
            setData(updatedData);
        });

        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='mt-48'>
            <h1>Shop Data</h1>
            <ul>
                {data.map((shop, index) => (
                    <li key={index}>
                        Shop No: {shop.shopId}, Apples: {shop.apples}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowData;
