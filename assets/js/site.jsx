const React = require('react');
const request = require('superagent');
const _ = require('lodash');

const EngramCalculator = require('./components/EngramCalculator.jsx');

const Application = React.createClass({

  getInitialState() {
    return {
      engrams: {}
    };
  },

  componentDidMount() {
    request.get('/engrams')
      .end((error, response) => {
        this.setState({engrams: response.body});
      });
  },

  render() {
    let engrams = _.values(this.state.engrams).map((engram) => {
      return(<li>{engram.prettyName}</li>);
    });

    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <EngramCalculator />
          </div>
        </div>
      </div>
    );
  }
});

if (typeof document !== 'undefined') {
  React.render(<Application />, document.getElementById('Application'));
}
