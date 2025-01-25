import React, { useState, useEffect } from 'react';
//import { Can } from './casl/AbilityContext';
import { useNavigate } from 'react-router-dom';

type Flower = {
  _id: string;
  name: string;
  color: string;
  price: number;
};

const Marketplace: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch('http://localhost:5000/flowers');
        const data = await response.json();

        if (data.message) {
          setMessage(data.message);
        } else {
          setFlowers(data);
        }
      } catch (error) {
        console.error('Error fetching flowers:', error);
        setMessage('Error fetching flowers.');
      }
    };

    fetchFlowers();
  }, []);

  const handleAddFlowerClick = () => {
    navigate('/admin');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Marketplace</h1>
      {message && <p>{message}</p>}

      <div>
        {flowers.length === 0 ? (
          <p>No flowers available.</p>
        ) : (
          flowers.map((flower) => (
            <div
              key={flower._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>{flower.name}</h3>
              <p>Color: {flower.color}</p>
              <p>Price: RS {flower.price}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Flower button only if the user is admin */}
      {localStorage.getItem('userRole') === 'admin' && (
        <button
          onClick={handleAddFlowerClick}
          style={{
            marginTop: '20px',
            padding: '10px 15px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Flower
        </button>
      )}
    </div>
  );
};

export default Marketplace;