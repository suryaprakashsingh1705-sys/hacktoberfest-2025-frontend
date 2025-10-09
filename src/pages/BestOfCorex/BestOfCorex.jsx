import React from 'react';
import PropTypes from 'prop-types';
import useFetch from './useFetch';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';

const CollectionStatus = ({ name, endpoint }) => {
  const { data, loading, error } = useFetch(endpoint);

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
      {loading && <p className="text-gray-500">Status: Loading...</p>}
      {error && <p className="text-red-600">Status: Error - {error.message}</p>}
      {data && <p className="text-green-600">Status: Fetched Successfully</p>}
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
    <main className="px-8 py-5 font-sans">
      <h1 className="text-2xl font-bold mb-2">API Collection Status</h1>
      <p className="text-gray-600 mb-6">Fetching data from all collection endpoints:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {collections.map(([name, endpoint]) => (
          <CollectionStatus key={name} name={name} endpoint={endpoint} />
        ))}
      </div>
    </main>
  );
};

export default BestOfCorex;
