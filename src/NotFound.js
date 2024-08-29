import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page Not Found</h2>
      <p style={styles.message}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a href="/" style={styles.homeLink}>Go to Homepage</a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  },
  title: {
    fontSize: '6rem',
    margin: '0',
  },
  subtitle: {
    fontSize: '2rem',
    margin: '0',
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0',
    maxWidth: '600px',
  },
  homeLink: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  }
};

styles.homeLink[':hover'] = {
  backgroundColor: '#007bff',
  color: '#fff',
};

export default NotFound;
