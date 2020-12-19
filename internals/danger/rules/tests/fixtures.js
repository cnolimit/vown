const lifeCycleList = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
];

const file = `
  import React, { Component } from 'react';

  class carousel extends Component {

  render() {
      return (
        <div>Simple component</div>
      );
    }
  }

  export default carousel;
`;

const fileWithLogs = `${file} console.log("Testing")`;
const fileWithoutLogs = file;

module.exports = {
  fileWithLogs,
  fileWithoutLogs,
  lifeCycleList,
};
