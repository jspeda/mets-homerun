const month = '04';
const day = '11';
const year = '2017';
const mets = 'nynmlb';
const opponent = 'phimlb';
const metsHome = false;
const fullDate = `${year}_${month}_${day}`;

const schedule2017 = [
  {
    date: '04_03_2017',
    opponent: 'atlmlb',
    metshome: true
  },
  {
    date: '04_04_2017',
    opponent: 'atlmlb',
    metshome: true
  },
  {
    date: null,
    opponent: null,
    metshome: null
  },
]

module.exports = {
  month,
  day,
  year,
  mets,
  opponent,
  metsHome,
  fullDate
}
