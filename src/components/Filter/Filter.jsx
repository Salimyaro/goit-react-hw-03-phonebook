import { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  handleChange = ({ currentTarget: { value } }) => {
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }
}

export default Filter;
