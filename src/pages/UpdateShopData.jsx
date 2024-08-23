// UpdateShopData.jsx
import { useEffect, useState } from 'react';

const UpdateShopData = () => {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      try {
        const response = await fetch('http://localhost:5000/api/get-shop-data', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the header
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setShopData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShopData();
  }, []);

  return (
    <div>
      {/* Render the shop data */}
      {shopData.map(shop => (
        <div key={shop.id}>
          <h3>Shop Number: {shop.shopNumber}</h3>
          <p>Apples: {shop.apples}</p>
        </div>
      ))}
    </div>
  );
};

export default UpdateShopData;
