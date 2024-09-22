import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      console.log(parsedData);
      const res = await axios.post('http://localhost:5000/bfhl', {
        data: parsedData.data,
        file_b64: parsedData.file_b64 || null,
      });
      setResponse(res.data);
    } catch (error) {
      alert('Request failed!');
      console.error(error);
    }
  };

  const handleFilterChange = selectedOptions => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.map(option => {
      if (response[option.value]) {
        return <p key={option.value}><strong>{option.label}:</strong> {JSON.stringify(response[option.value])}</p>;
      }
      return null;
    });

    return (
      <div style={{ marginTop: '20px', backgroundColor: '#eaeaea', padding: '15px', borderRadius: '8px', border: '1px solid #ccc' }}>
        {filteredResponse}
      </div>
    );
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '40px', 
      maxWidth: '500px', 
      margin: 'auto', 
      background: 'linear-gradient(135deg, #f0f8ff, #e0f7fa)', 
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)', 
      borderRadius: '10px',
    }}>
      
      <h1 style={{ 
        textAlign: 'center', 
        color: '#007bff', 
        marginBottom: '20px', 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
        letterSpacing: '1.5px' 
      }}>
        Bajaj Finserv Health
      </h1>

      <label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block', color: '#333' }}>API Input:</label>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Enter JSON data'
        rows='6'
        cols='50'
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          marginBottom: '12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '14px 28px',
          cursor: 'pointer',
          borderRadius: '5px',
          fontSize: '16px',
          marginBottom: '20px',
          transition: 'background-color 0.3s, transform 0.2s, box-shadow 0.3s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }}
      >
        Submit
      </button>
      <br />

      <label style={{ fontWeight: 'bold', marginBottom: '12px', display: 'block', color: '#333' }}>Filter Response:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleFilterChange}
        classNamePrefix="select"
        styles={{
          control: (provided) => ({
            ...provided,
            border: '1px solid #ccc',
            boxShadow: 'none',
            '&:hover': {
              border: '1px solid #007bff',
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#007bff',
            color: '#fff',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: '#fff',
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: '#fff',
            ':hover': {
              backgroundColor: '#0056b3',
              color: '#fff',
            },
          }),
        }}
      />

      {renderResponse()}
    </div>
  );
};

export default App;
