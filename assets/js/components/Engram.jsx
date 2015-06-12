const React = require('react/addons');
const _ = require('lodash');
const StyleSheet = require('react-style');
const classNames = require('classnames');


export default React.createClass({

  learn() {
    if (!this.props.canLearn) return;
    this.props.learnCallback(this.props.slug);
  },

  render() {

    let backgroundClass = 'bg-info';

    if (this.props.canLearn) {
      backgroundClass = 'bg-warning';
    } else {
      backgroundClass = 'bg-danger';
    }

    if (this.props.learned) {
      backgroundClass = 'bg-success';
    }

    let depends = this.props.depends.map((depend, index) => {
      return (<li key={index}>{depend.prettyName}</li>);
    });

    return(
      <div styles={styles.engram} className={backgroundClass} onClick={this.learn}>
        <h4 styles={styles.engramName}>{this.props.name}</h4>
        <h5 styles={styles.engramCost}>{this.props.cost}</h5>
        <ul styles={styles.engramDepends}>
          {depends}
        </ul>
      </div>
    );
  }
});

var styles = StyleSheet.create({
  engram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150,
    height: 150,
    marginLeft: 10,
    marginRight: 10,
  },

  engramName: {
    textAlign: 'center',
  },

  engramCost: {

  },

  engramDepends: {
    textDecoration: 'none',
    listStyle: 'none',
    textAlign: 'center',
    margin: 0,
    padding: 0,
  }
});
