import React, { Component } from 'react';
import ResultCard from '../components/ResultCard.jsx';

const ResultsContainer = ({ results, preferredLocations, closedLocations, reportClosed, closedStoreId }) => {
  console.log('results :', results);
  console.log('pref Loc :', preferredLocations);
  console.log('closed Loc :', closedLocations);

  let recs = [];

  if (!results) {
    recs = null;
  } else {
    results.forEach(
      (rec, i) => {
        const { id, name } = rec;

        // if (id !== closedStoreId) {
        // check if the location is open & user is using account
        //if (!closedLocations[id] && preferredLocations){
        let isFav = false;

        // checking if location is the user's preferred location
        //preferredLocations[id] ? isFav = true : isFav = false;

        recs.push(<ResultCard closedStoreId={closedStoreId} reportClosed={reportClosed} key={i} aria-label={name} info={rec} isFav={isFav} />);
      }
      // }
    );
  }

  return (
    <div className="resultsContainer">
      {recs}
    </div>
  );
};

export default ResultsContainer;
