import React, { Component } from 'react';
import moment from 'moment';
import scriptLogo from './mets-script-logo.png';
import happyTerry from './terrycollins_happy.png';
import sadTerry from './terrycollins_sad.png';
import './App.css';
import Homer from './Homer';
import sched from './schedule';

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
    // should I move this stuff into state?
    const today = moment().format('YYYY_MM_DD');
    const thisYear = moment().format('YYYY');
    const thisMonth = moment().format('MM');
    const thisDay = moment().format('DD');

    const mets = 'nynmlb';

    const todaysGame = sched.schedule2017.filter(games => games.date === `${thisYear}_${thisMonth}_${thisDay}`);
    console.log(todaysGame[0].opponent)

    if (todaysGame.length === 0) return;

    const url = todaysGame[0].metshome ?
      `http://gd2.mlb.com/components/game/mlb/year_${thisYear}/month_${thisMonth}/day_${thisDay}/gid_${today}_${todaysGame[0].opponent}_${mets}_1/game_events.json` :
      `http://gd2.mlb.com/components/game/mlb/year_${thisYear}/month_${thisMonth}/day_${thisDay}/gid_${today}_${mets}_${todaysGame[0].opponent}_1/game_events.json`

    const bottomOrTop = todaysGame[0].metshome ? 'bottom' : 'top';

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
          return descriptions.reduce((descriptions, description) => {
            return descriptions.concat(description)
          }, []);
        })
        .then(eventsArray => {
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
          <div className="mets-logo"><img src={scriptLogo} className="logo" alt="Mets" /></div>
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
        <div className="terry">
          {
            this.state.homeRun ? <img src={happyTerry} alt="happyterry" /> :
            <img src={sadTerry} alt="sadterry" />
          }
        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}

export default App;
