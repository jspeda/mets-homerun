import React, { Component } from 'react';
import moment from 'moment';
import circleLogo from './mets-circle-logo.png';
import scriptLogo from './mets-script-logo.png';
import './App.css';
import Homer from './Homer';
import gv from './gamevars';

class App extends Component {
  constructor() {
    super();
    this.addHomer = this.addHomer.bind(this);
    this.state = {
      homeRun: null,
      homers: {}
    }
  }

  componentWillMount() {
    const today = moment().format('YYYY_MM_DD');
    console.log(today);
    

    const url = gv.metsHome ?
    `http://gd2.mlb.com/components/game/mlb/year_${gv.year}/month_${gv.month}/day_${gv.day}/gid_${gv.fullDate}_${gv.opponent}_${gv.mets}_1/game_events.json` :
    `http://gd2.mlb.com/components/game/mlb/year_${gv.year}/month_${gv.month}/day_${gv.day}/gid_${gv.fullDate}_${gv.mets}_${gv.opponent}_1/game_events.json`

    const bottomOrTop = gv.metsHome ? 'bottom' : 'top';

    const gameEvent = fetch(url);
      gameEvent
        .then(data => data.json())
        .then(data => data.data.game.inning.map(e => e[bottomOrTop].atbat))
        .then(atBatsPerInning => {
          return atBatsPerInning.map(atBatAppearances => {
            return  atBatAppearances.map(atBatAppearance => {
              let descriptions = atBatAppearance.des;
              return descriptions;
            });
          });
        })
        .then(descriptions => {
          console.log(descriptions)
          return descriptions.reduce((descriptions, description) => {
            return descriptions.concat(description)
          }, []);
        })
        .then(eventsArray => {
          console.log(eventsArray);
          let homer = eventsArray.filter(e => {
            if (e.includes('homers'))
            this.addHomer(e);
             return true;
          })
          homer.length > 0 ? this.setState({homeRun: true}) : this.setState({homeRun: false})
          console.log(homer);
        })
        .catch(err => console.error(err));
  }

  addHomer(homer) {
    const homers = {...this.state.homers};
    const timeStamp = Date.now();
    homers[`homer-${timeStamp}`] = homer;
    this.setState({homers});
  }

  render() {
    return (
      <div className="App">
        <div className="question-container">
          <div className="did-the">
            Did the
          </div>
          <div className="mets-logo"><img src={scriptLogo} className="logo" alt="logo" /></div>
          <div className="hit-a-homerun">
            hit a home run today?
          </div>
        </div>
        <div className="yes-or-no">
          {this.state.homeRun ? 'YES' : 'NO'}
        </div>
        <div className="homerbox">
          {
            Object.keys(this.state.homers)
              .map(key =>
                <Homer
                key={key}
                index={key}
                details={this.state.homers[key]}
                />
              )
          }
        </div>
      </div>
    );
  }
}

export default App;
