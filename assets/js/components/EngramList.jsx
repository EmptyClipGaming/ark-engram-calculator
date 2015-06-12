const React = require('react');
const request = require('superagent');
const _ = require('lodash');
const StyleSheet = require('react-style');

const Engram = require('./Engram.jsx');

export default React.createClass({

  getInitialState() {
    return {
      engrams: {},
      learned: [],
    };
  },

  componentDidMount() {
    request.get('/engrams')
      .end((error, response) => {
        this.setState({engrams: response.body});
      });
  },

  canLearn(engramKey) {
    let engram = this.state.engrams[engramKey];
    return _.reduce(engram.depends, (can, depend) => can && _.includes(this.state.learned, depend), true);
  },

  canUnlearn(engramKey) {
    return !_.some(_.pick(this.state.engrams, this.state.learned), (learnedEngram) => {
      return _.includes(learnedEngram.depends, engramKey);
    });
  },

  learn(key) {
    let engram = this.state.engrams[key];

    if (_.includes(this.state.learned, key) && this.canUnlearn(key)) {
      this.setState({learned: _.pull(this.state.learned, key)});
    } else if (this.canLearn(key)) {
      this.setState({learned: this.state.learned.concat(key)});
    }
  },

  render() {
    let engrams = _
      .keys(this.state.engrams)
      .map((engramKey) => {
        let engram = this.state.engrams[engramKey];
        let depends = engram.depends.map((depend) => this.state.engrams[depend]);
        let learned = _.includes(this.state.learned, engramKey);
        let canLearn = this.canLearn(engramKey);

        return(<Engram
          key={engramKey}
          slug={engramKey}
          canLearn={canLearn}
          learned={learned}
          cost={engram.cost}
          depends={depends}
          level={engram.level}
          name={engram.prettyName}
          learnCallback={this.learn} />);
    });

    return(
      <div className="row">
        <div styles={styles.engramList} className="col-xs-12">
          {engrams}
        </div>
      </div>
    );
  }
});

var styles = {
  engramList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
};
