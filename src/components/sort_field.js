import React from 'react';

import "./css/App.css"

function SortField({sort}) {
  return (
    <div className="sort-field">
      Sort by
      <div className="sort-field__val" onClick={() => sort(true)}>name</div>
      <div className="sort-field__val" onClick={() => sort(false)}>contributions</div>
    </div>
  )
}

export default SortField