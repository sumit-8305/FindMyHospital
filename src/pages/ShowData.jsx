// src/ShowData.jsx
import React, { useState, useEffect } from 'react';

const ShowData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('http://localhost:5000/api/get-shop-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/js',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                setError('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Shop Data</h1>
            {error && <p>{error}</p>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>Shop {item.shopNumber}: {item.apples} apples</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowData;
