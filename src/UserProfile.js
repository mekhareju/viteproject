import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({ name: '', email: '', location: '' });
  const [message, setMessage] = useState('');

  // Fetch user profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('userToken'); // Get token from localStorage
      if (!token) {
        setMessage('You need to log in first!');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/profile/<USER_ID>`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Update the state with user profile data
        } else {
          setMessage('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred while fetching profile');
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission for updating the profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('userToken');
    if (!token) {
      setMessage('You need to log in first!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/profile/<USER_ID>`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData), // Send updated user data
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Profile updated successfully!');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating profile');
    }
  };

  // Render the profile form
  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>User Profile</h2>
        <form onSubmit={handleUpdate}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              style={styles.input}
              type="text"
              value={userData.location}
              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
              required
            />
          </div>
          <button style={styles.button} type="submit">Update Profile</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f6',
  },
  formBox: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    marginTop: '10px',
  },
};

export default UserProfile;
