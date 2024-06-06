import React, { useState, useEffect } from 'react';
import { Container, TextField, Card, CardContent, Typography, CardMedia } from '@mui/material';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  //fetch api and displayed

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Response Failed');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  //search product using filter

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="container">
      <Typography variant="h4" component="h4">
        Product List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        value={search}
      />
      {error && (
        <Typography>
          {error}
        </Typography>
      )}
      <div className="card-grid">
        {filteredData.map(item => (
          <Card key={item.id} variant="outlined" className="card">
            <CardMedia
              component="img"
              className="card-media"
              image={item.image}
              alt={item.title}
            />
            <CardContent className="card-content">
              <Typography variant="h5" component="div" className="card-title">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-description">
                {item.description}
              </Typography>
              <Typography variant="h6" component="div">
                ${item.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default App;
