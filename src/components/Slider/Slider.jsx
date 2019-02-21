import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      return (random) ? this.setState({ index: getRandomNumber(banners.length) })
        : this.setState({ index: getNextRoundRobin(banners.length, index) });
    }, duration);
  }

  render() {
    const { index } = this.state;
    const {
      altText, banners, defaultBanner, ...rest
    } = this.props;
    const source = (banners.length === 0) ? defaultBanner : banners[index];
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={source} alt={altText} style={{ height: rest.height }} />
        </div>
      </>
    );
  }
}
Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.string,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: '200px',
  random: false,
};

export default Slider;
