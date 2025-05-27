import React from 'react';

const BasicPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#4834d4', fontSize: '2rem', marginBottom: '20px' }}>
        Zynith Investment Platform
      </h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
        Welcome to the Zynith Investment Platform. We're currently experiencing some technical difficulties.
      </p>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>
          Our Investment Plans
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ 
            flex: '1 1 30%', 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4834d4' }}>Starter Plan</h3>
            <p>5-8% Annual Returns</p>
            <p>Minimum: $500</p>
          </div>
          <div style={{ 
            flex: '1 1 30%', 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4834d4' }}>Growth Plan</h3>
            <p>8-12% Annual Returns</p>
            <p>Minimum: $2,500</p>
          </div>
          <div style={{ 
            flex: '1 1 30%', 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4834d4' }}>Premium Plan</h3>
            <p>12-18% Annual Returns</p>
            <p>Minimum: $10,000</p>
          </div>
        </div>
      </div>
      <footer style={{ marginTop: '40px', color: '#666' }}>
        <p>&copy; {new Date().getFullYear()} Zynith - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default BasicPage;
