// # CostOfLiving Component
'use strict'

// Loads React
import React, {Component} from 'react';

import AnnualCosts from './AnnualCosts';
import DataSummary from './DataSummary';
import SharingButtons from './SharingButtons';

import * as Page from './Page';
import * as Form from './Form';
import * as Itinerary from './Itinerary';

import accounting from 'accounting';
import classnames from 'classnames';

/**
 * Main container for the cost of living calculator
 */
class CostOfLiving extends Component {

  constructor (props) {
    super(props);

    this.state = {
      lease: [],
      travel: [],
      travelType: 'balanced',
    };
  }

  componentDidMount () {
    this.calculateTravelCosts();
    this.calculateLeaseCosts();
  }

  calculateTravelCosts () {
    const itinerary = this.props.itineraries.filter(itinerary => {
      return itinerary.value === this.state.travelType;
    })[0];

    // Uses a separate counter for months because there are sub-loops
    let month = 0;
    let total = 0;
    let travel = [];

    itinerary.stops.forEach(city => {
      for (let i = 0; i < city.months; i++) {

        // Only counts the flight cost for the last month
        const flight = i+1 === city.months ? city.flight : 0;

        // Adds the travel costs
        total += city.cost + flight;
        travel[month++] = total;
      }
    });

    this.setState({ travel: travel });
  }

  calculateLeaseCosts () {

    // Breaks apart the costs and adds up to a total monthly cost
    const {
      rent: r,
      electric: e,
      utilities: u,
      tvInternet: t,
      insurance: i,
      other: o,
    } = this.props.leaseCost;
    const monthlyCost = r + e + u + t + i + o;

    // Keeps a running total of cost-to-date for the year
    let total = 0;
    let lease = [];

    for (let month=0; month < 12; month++) {
      total += monthlyCost;
      lease[month] = total;
    }

    this.setState({ lease: lease });
  }

  updateLivingCost (event) {
    const name = event.target.name || false;

    if (!!name && this.props.leaseCost.hasOwnProperty(name)) {
      const newVal = parseInt(event.target.value, 10);
      this.props.leaseCost[name] = newVal;

      this.calculateLeaseCosts();
    }
  }

  updateTravelType (event) {

    // Checks for a valid itinerary
    let isValidType = false;
    this.props.itineraries.map(itinerary => {
      if (itinerary.value === event.target.value) {
        isValidType = true;
      }
    });

    if (isValidType) {
      this.setState({ travelType: event.target.value });

      setTimeout(this.calculateTravelCosts.bind(this), 10);
    }
  }

  /**
   * Renders the component
   * @return {Element} The React component
   */
  render () {
    const sharing = {
      sharingText: 'World travel is probably cheaper than your rent. Use this tool to compare the cost.',
      permalink: window.location.href.split('#')[0],
      image: `http://lengstorf.com/images/rent-more-expensive-than-travel.jpg`,
    };

    const costCallback = this.updateLivingCost.bind(this);
    const costInputData = [
      {
        label: 'Rent or Mortgage',
        inputName: 'rent',
        inputValue: this.props.leaseCost.rent,
        callback: costCallback,
      },
      {
        label: 'Electric',
        inputName: 'electric',
        inputValue: this.props.leaseCost.electric,
        callback: costCallback,
      },
      {
        label: 'Utilities',
        inputName: 'utilities',
        inputValue: this.props.leaseCost.utilities,
        callback: costCallback,
      },
      {
        label: 'TV/Internet',
        inputName: 'tvInternet',
        inputValue: this.props.leaseCost.tvInternet,
        callback: costCallback,
      },
      {
        label: 'Renters or Homeowners Insurance',
        inputName: 'insurance',
        inputValue: this.props.leaseCost.insurance,
        callback: costCallback,
      },
      {
        label: 'Other Household Costs',
        tooltip: 'For example: cleaning services, condo or homeowners association fees, lawn care, etc.',
        inputName: 'other',
        inputValue: this.props.leaseCost.other,
        callback: costCallback,
      },
    ];

    return (
      <div className="cost-of-living">
        <form className="cost-of-living__form">
          <Page.Section
            id="enter-bills"
            heading="Enter Your Monthly Household Bills"
            description="Add your monthly bills (in USD). Remember: it’s more than just your rent that adds to your cost of living!"
          >
            <Form.InputList>
              {costInputData.map((input, index) => {
                return <Form.NumberInput key={input.inputName} {...input} />
              })}
            </Form.InputList>
            <Page.NextLink target="#travel-style" text="Next" />
          </Page.Section>

          <Page.Section
            id="travel-style"
            heading="How Do You Want to Travel?"
            description="Depending on your preferences, you can spend all your time in places with a low cost of living (for maximum savings) or split your time between cheaper cities (like Chiang Mai and Zagreb) and more expensive cities (like London and Paris)."
          >
            <Form.InputList>
              <Form.RadioGroup>
                {this.props.itineraries.map(itinerary => (
                  <Form.RadioInput
                    key={itinerary.value}
                    selected={this.state.travelType}
                    label={itinerary.label}
                    value={itinerary.value}
                    callback={this.updateTravelType.bind(this)}
                  />
                ))}
              </Form.RadioGroup>
            </Form.InputList>
            <Itinerary.List
              itinerary={this.props.itineraries.filter(itinerary => {
                return itinerary.value === this.state.travelType;
              })[0]}
            />
            <Page.NextLink target="#cost-breakdown" text="See the Comparison" />
          </Page.Section>
        </form>

        <Page.Section
          id="cost-breakdown"
          heading="Cost of Living Breakdown"
        >
          <AnnualCosts {...this.state} />
          <DataSummary {...this.state} />
          <SharingButtons {...sharing} />
        </Page.Section>
      </div>
    );
  }

}

CostOfLiving.defaultProps = {

  // Default values taken from my article here:
  // http://lengstorf.com/cost-of-living-remotely/
  leaseCost: {
    rent: 675,
    electric: 100,
    utilities: 35,
    tvInternet: 125,
    insurance: 25,
    other: 160,
  },

  // More travel itineraries can be added; just drop them into this array
  // These itineraries were created in late October 2015, using whole months in
  // 2016 by pulling numbers from Airbnb (for monthly rent) and Google Flights
  // (for flight costs).
  itineraries: [
    {
      label: "Medium Ballin’",
      value: "balanced",
      stops: [
        {
          city: 'Chiang Mai',
          months: 2,
          cost: 396,
          flight: 608,
        },
        {
          city: 'Barcelona',
          months: 3,
          cost: 1115,
          flight: 124,
        },
        {
          city: 'Zagreb',
          months: 2,
          cost: 760,
          flight: 91,
        },
        {
          city: 'London',
          months: 1,
          cost: 2242,
          flight: 86,
        },
        {
          city: 'Paris',
          months: 1,
          cost: 1527,
          flight: 660,
        },
        {
          city: 'Bali',
          months: 3,
          cost: 467,

          // No flight because initial flights to/from the US aren't included
          flight: 0,
        },
      ],
    },
    {
      label: "Geo-Arbitrage",
      value: "cheap",
      stops: [
        {
          city: 'Chiang Mai',
          months: 6,
          cost: 396,
          flight: 609,
        },
        {
          city: 'Zagreb',
          months: 3,
          cost: 760,
          flight: 547,
        },
        {
          city: 'Bali',
          months: 3,
          cost: 467,

          // No flight because initial flights to/from the US aren't included
          flight: 0,
        },
      ],
    },
  ],

};

export default CostOfLiving;
