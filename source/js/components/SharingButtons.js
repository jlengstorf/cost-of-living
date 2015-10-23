import React, {Component} from 'react';

class SharingButtons extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const sharingText = encodeURIComponent(this.props.sharingText);
    const permalink = encodeURIComponent(this.props.permalink);
    const image = encodeURIComponent(this.props.image);
    const links = {
      facebook: `http://www.facebook.com/sharer.php?u=${permalink}`,
      twitter: `http://twitter.com/share?text=${sharingText}&amp;url=${permalink}&amp;via=jlengstorf&amp;related=jlengstorf`,
      pinterest: `http://pinterest.com/pin/create/button/?url=${permalink}&media=${image}&description=${sharingText}`
    }


    return (
      <div className="cost-of-living__sharing">
        <h2 className="cost-of-living__sub-headline">
          Share this calculator.
        </h2>
        <p>
          How much could your friends save by traveling? Spread the word:
          world travel is <em>much cheaper</em> than we’re led to believe!
        </p>
        <div className="main-content__sharing">
            <a href={links.facebook}
               className="main-content__sharing-link facebook">
                <span className="sr-only">Share on Facebook</span>
            </a>
            <a href={links.twitter}
               className="main-content__sharing-link twitter">
                <span className="sr-only">Share on Twitter</span>
            </a>
            <a href={links.pinterest}
               className="main-content__sharing-link pinterest">
                <span className="sr-only">Share on Pinterest</span>
            </a>
        </div>
      </div>
    );
  }
}

SharingButtons.propTypes = {
  image: React.PropTypes.string.isRequired,
  permalink: React.PropTypes.string.isRequired,
  sharingText: React.PropTypes.string.isRequired,
};

export default SharingButtons;
