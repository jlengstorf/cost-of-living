import React, {Component} from 'react';
import classnames from 'classnames';

import debug from 'debug';
const log = debug('components/Itinerary');

function List(props) {
  let listItems = [];
  let lastCity = false;
  let flightCost = false;

  props.itinerary.stops.forEach(item => {

    // Checks for a flight from the last stop
    if (!!flightCost && !!lastCity) {
      const flightDetails = {
        fromCity: lastCity,
        toCity: item.city,
        cost: flightCost,
      };

      listItems.push(<Flight key={lastCity + item.city} {...flightDetails} />);

      // Resets the flight to avoid duplicate items
      flightCost = false;
    }

    // Pulls out the city details
    const stopDetails = {
      city: item.city,
      months: item.months,
      cost: item.cost,
    };

    listItems.push(<Stop key={item.city + item.months} {...stopDetails} />);

    // Updates the last city for which an item was created
    lastCity = stopDetails.city;

    // Stores the flight if one exists
    if (!!item.flight && item.flight > 0) {
      flightCost = item.flight;
    }
  });

  return (
    <div className="cost-of-living__itinerary">
      <h3 className="cost-of-living__subheading">
        “{props.itinerary.label}” Itinerary Breakdown
      </h3>
      <ul className="cost-of-living__itinerary-list">
        {listItems}
      </ul>
    </div>
  );
}

function Stop(props) {
  const stop = {
    city: props.city,
    months: props.months,
    monthLabel: props.months === 1 ? 'month' : 'months',
    cost: props.cost,
  };

  const settings = {
    classes: classnames({
      'cost-of-living__list-item': true,
      'cost-of-living__list-item--stop': true,
    }),
    value: `${stop.city} for ${stop.months} ${stop.monthLabel} at $${stop.cost}/month.`,
  };

  return (
    <ListItem {...settings} />
  );
}

function Flight(props) {
  const flight = {
    fromCity: props.fromCity,
    toCity: props.toCity,
    cost: props.cost,
  };

  const settings = {
    classes: classnames({
      'cost-of-living__list-item': true,
      'cost-of-living__list-item--flight': true,
    }),
    value: `Flight from ${flight.fromCity} to ${flight.toCity} for $${flight.cost}.`,
  };

  return (
    <ListItem {...settings} />
  );
}

function ListItem(props) {
  return (
    <li className={props.classes}>
      {props.value}
    </li>
  );
}

export {
  List,
  Stop,
  Flight,
  ListItem,
};
