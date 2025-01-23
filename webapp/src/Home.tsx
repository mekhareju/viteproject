import React from 'react';

const Home: React.FC = () => {
  const products = [
    { src: '/images/img.png', name: 'Rose Bouquet', price: 'RS 300' },
    { src: '/images/img2.png', name: 'Chocolate Box', price: 'RS 200' },
    { src: '/images/img3.png', name: 'Snack Basket', price: 'RS 250' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to My Gift Shop</h1>
      <p style={styles.subheading}>Your one-stop shop for unique gifts!</p>
      <div style={styles.productContainer}>
        {products.map((product, index) => (
          <div key={index} style={styles.product}>
            <img
              src={product.src}
              alt={product.name}
              style={styles.image}
            />
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#555',
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', 
    flexWrap: 'wrap',
  },
  product: {
    textAlign: 'center',
    maxWidth: '300px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  productName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
    color: '#333',
  },
  productPrice: {
    fontSize: '16px',
    color: '#777',
  },
};

export default Home;
