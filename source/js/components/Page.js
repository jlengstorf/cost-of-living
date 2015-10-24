import React from 'react';

function Section(props) {
  return (
    <div className="cost-of-living__section">
      <h2 id={props.id} className="cost-of-living__heading">
        {props.heading}
      </h2>
      {!!props.description &&
        <p>
          {props.description}
        </p>
      }
      {props.children}
    </div>
  );
}

function NextLink(props) {
  return(
    <a href={props.target}
       className="cost-of-living__continue-link">
      {props.text}
    </a>
  );
}

export {
  Section,
  NextLink
};
