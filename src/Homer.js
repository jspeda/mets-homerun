import React, { Component } from 'react';

class Homer extends Component {
  render() {
    return (
      <div className="homer">{this.props.details}</div>
    )
  }
}

export default Homer;
