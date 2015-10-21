// # CostOfLiving Component
'use strict'

// Loads React
import React, {Component} from 'react';
import AnnualCosts from './AnnualCosts';
import DataSummary from './DataSummary';
import TableRow from './TravelCosts/TableRow';

import accounting from 'accounting';

import debug from 'debug';
const log = debug('components/CostOfLiving');

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
    let travelType = 'balanced';
    if (this.state.travelType in this.props.travelStops) {
      travelType = this.state.travelType;
    }

    // Uses a separate counter for months because there are sub-loops
    let month = 0;
    let total = 0;
    let travel = [];

    this.props.travelStops[travelType].forEach(city => {
      for (let i = 0; i < city.months; i++) {

        // Only counts the flight cost for the last month
        const flight = i+1 === city.months ? city.flight : 0;

        // Adds the travel costs
        total += city.cost + flight;
        travel[month++] = total;

        log(`Month ${month}: $${total}`);
      }
    });

    log('travel', travel);

    this.setState({ travel: travel });

    log('Travel Costs', this.state.travel);
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

    log('monthlyCost', monthlyCost);

    // Keeps a running total of cost-to-date for the year
    let total = 0;
    let lease = [];

    for (let month=0; month < 12; month++) {
      total += monthlyCost;
      lease[month] = total;

      log(`Month ${i}: $${total}`);
    }

    log('lease', lease);

    this.setState({ lease: lease });

    log('Lease Costs', this.state.lease);
  }

  handleUpdate (event) {
    const name = event.target.name || false;

    if (!!name && this.props.leaseCost.hasOwnProperty(name)) {
      const newVal = parseInt(event.target.value, 10);
      this.props.leaseCost[name] = newVal;

      log(`New value for ${name}: ${newVal}`);
      this.calculateLeaseCosts();
    }
  }

  updateTravelType (event) {
    const name = event.target.name || false;

    log(`event.target.value: ${event.target.value}`);

    if (!!name && event.target.value in this.props.travelStops) {
      // this.props.travelType = event.target.value;
      this.setState({ travelType: event.target.value });
      log(`travelType: ${this.state.travelType}`);

      setTimeout(this.calculateTravelCosts.bind(this), 10);
    }
  }

  /**
   * Renders the component
   * @return {Element} The React component
   */
  render () {
    return (
      <div className="cost-of-living">
        <form className="cost-of-living__form">
          <h2 className="cost-of-living__sub-headline">Enter Your Monthly Household Bills</h2>
          <ul className="cost-of-living__input-list">
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                Rent or Mortgage
                <input
                  name="rent"
                  type="text"
                  defaultValue={this.props.leaseCost.rent}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                Electric
                <input
                  name="electric"
                  type="text"
                  defaultValue={this.props.leaseCost.electric}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                Utilities
                <input
                  name="utilities"
                  type="text"
                  defaultValue={this.props.leaseCost.utilities}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                TV/Internet
                <input
                  name="tvInternet"
                  type="text"
                  defaultValue={this.props.leaseCost.tvInternet}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                Renters or Homeowners Insurance
                <input
                  name="insurance"
                  type="text"
                  defaultValue={this.props.leaseCost.insurance}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item">
              <label className="cost-of-living__input-group">
                Other Household Costs (e.g. Cleaning, HOA Fees, etc.)
                <input
                  name="other"
                  type="text"
                  defaultValue={this.props.leaseCost.other}
                  onChange={this.handleUpdate.bind(this)}
                />
              </label>
            </li>
            <li className="cost-of-living__input-item cost-of-living__input-item--radio">
              <div className="cost-of-living__input-group">
                Level of Balling While Traveling
                <label className="cost-of-living__radio-label">
                  <input
                    name="cost-toggle"
                    type="radio"
                    value="balanced"
                    checked={this.state.travelType === 'balanced'}
                    onChange={this.updateTravelType.bind(this)}
                  /> Half Cheap, Half Spendy
                </label>
                <label className="cost-of-living__radio-label">
                  <input
                    name="cost-toggle"
                    type="radio"
                    value="cheap"
                    checked={this.state.travelType === 'cheap'}
                    onChange={this.updateTravelType.bind(this)}
                  /> All Cheap
                </label>
              </div>
            </li>
          </ul>
        </form>
        <h2 className="cost-of-living__sub-headline">Cost of Living Breakdown</h2>
        <AnnualCosts {...this.state} />
        <DataSummary {...this.state} />
        <h3 className="cost-of-living__l3-headline">How Travel Costs Are Calculated</h3>
        <table className="cost-of-living__travel-costs">
          <thead>
            <tr>
              <td></td>
              <th>Jan</th>
              <th>Feb</th>
              <th>Mar</th>
              <th>Apr</th>
              <th>May</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sep</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              rowHeader="Half Cheap, Half Spendy"
              travelCosts={this.props.travelStops.balanced}
            />
            <TableRow
              rowHeader="All Cheap"
              travelCosts={this.props.travelStops.cheap}
            />
          </tbody>
        </table>
      </div>
    );
  }

}

CostOfLiving.defaultProps = {
  leaseCost: {
    rent: 675,
    electric: 100,
    utilities: 35,
    tvInternet: 125,
    insurance: 25,
    other: 160,
  },

  // TODO Decide if this should be dynamic or just periodically updated
  travelStops: {
    balanced: [
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
    cheap: [
      {
        city: 'Chiang Mai',
        months: 6,
        cost: 396,
        flight: 608,
      },
      {
        city: 'Zagreb',
        months: 3,
        cost: 760,
        flight: 91,
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

};

export default CostOfLiving;