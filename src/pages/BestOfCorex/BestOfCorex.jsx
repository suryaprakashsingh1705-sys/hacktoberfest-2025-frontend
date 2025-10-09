import React from 'react';
import PropTypes from 'prop-types';
import useFetch from './useFetch';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';

const CollectionStatus = ({ name, endpoint }) => {
  const { data, loading, error } = useFetch(endpoint);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{name}</h3>
      {loading && <p>Status: Loading...</p>}
      {error && <p style={{ color: 'red' }}>Status: Error - {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Status: Fetched Successfully</p>}
    </div>
  );
};

CollectionStatus.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>API Collection Status</h1>
      <p>Fetching data from all collection endpoints:</p>
      {collections.map(([name, endpoint]) => (
        <CollectionStatus key={name} name={name} endpoint={endpoint} />
      ))}
    </div>
  );
};

export default BestOfCorex

