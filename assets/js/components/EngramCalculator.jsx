const React = require('react');
const request = require('superagent');
const _ = require('lodash');

const EngramList = require('./EngramList.jsx');

export default React.createClass({

  render() {
    return(
      <div className="row">
        <div className="col-xs-12">
          <EngramList />
        </div>
      </div>
    );
  }
});
