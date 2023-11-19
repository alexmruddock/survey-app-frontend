import React from 'react';
import { Link } from 'react-router-dom';
import SurveysList from './SurveysList';

function Home() {
  return (
    <div>
      <Link 
        to="/create" 
        className="mb-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Survey
      </Link>
      <SurveysList />
    </div>
  );
}

export default Home;