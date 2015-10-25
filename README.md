# Cost of Living Calculator

A toy app to play with React.js and Chartist.js. This is based off the discussion started in a post about [the surprisingly low cost of long-term travel](http://lengstorf.com/cost-of-living-remotely/).

The calculator is up and running at http://lengstorf.com/cost-of-living/

## Developers

This tool is intended to work as a drop-in component on an existing site. As such, your best bet is to use Bower:

    bower install https://github.com/jlengstorf/cost-of-living.git

You can also clone the latest version directly from GitHub:

    git clone git@github.com:jlengstorf/cost-of-living.git

Once it's downloaded, add the following to the page where you want this component to show up (make sure to check the path to the component):

    <div id="cost-of-living"></div>
    <script src="./cost-of-living/dist/bundle.js" async></script>

## Styling the Component

The component does not come with styles embedded, so you'll have to roll your own.

Example: [lengstorf.com cost of living stylesheet](https://github.com/jlengstorf/hugo-lengstorf/blob/master/source/styles/components/cost-of-living.css) (written for use with [PostCSS](https://github.com/postcss/postcss)).

## Itineraries

Itineraries were selected manually using [Airbnb](https://airbnb.com) and [Google Flights](https://www.google.com/flights/). They're not intended to be used as ironclad planning figures, and I can't guarantee their accuracy since prices fluctuate over time; these are just the numbers I found when I searched for the dates listed in the itineraries as of October 2015.

If you decide to go through with traveling — and I hope you do — please do your own research.
