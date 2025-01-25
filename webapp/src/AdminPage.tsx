import React, { useState, useEffect } from 'react';

const AdminPage: React.FC = () => {
  const [flowers, setFlowers] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const fetchFlowers = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/flowers', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.length === 0) {
        setMessage('No flowers found.');
      } else {
        setFlowers(data);
      }
    } catch (error) {
      console.error('Error fetching flowers:', error);
      setMessage('Error fetching flowers.');
    }
  };

  const handleAddFlower = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/flowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, color, price }),
      });

      if (response.ok) {
        setMessage('Flower added successfully!');
        setName('');
        setColor('');
        setPrice('');
        fetchFlowers();
      } else {
        const error = await response.json();
        setMessage(error.message || 'Failed to add flower.');
      }
    } catch (error) {
      console.error('Error adding flower:', error);
      setMessage('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <div>
      <h1>Admin - Manage Flowers</h1>
      <form onSubmit={handleAddFlower}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Add Flower</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {flowers.map((flower: any) => (
          <li key={flower._id}>
            {flower.name} - {flower.color} - RS {flower.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
