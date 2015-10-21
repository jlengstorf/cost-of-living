// # Front-End Initialization

import React from 'react';
import ReactDOM from 'react-dom';

import CostOfLiving from './js/components/CostOfLiving';

// Loads the stylesheet (via webpack)
// require('./css/main.css');

ReactDOM.render(
  (
    <CostOfLiving />
  ),
  document.getElementById('cost-of-living')
);
