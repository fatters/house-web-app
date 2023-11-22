const fs = require('fs');
const { resourceLimits } = require('worker_threads');

let counties = [];
let towns = [];

const all = JSON.parse(fs.readFileSync('./src/assets/logainm-counties.json', { encoding: 'utf8', flag: 'r' }));
const results = all.results;

console.log(all.totalCount)

// counties = results?.find((result) => result?.cluster?.members.find((q) => q.category.nameEN === 'county'));
// counties = results?.map((result) => result?.cluster?.members?.filter((q) => q.category.nameEN === 'county'));

counties = results?.filter((res) => {
  const county = res?.categories?.find((m) => m.nameEN === 'county');
  return !!county;
})?.map((county) => {
  const wording = county.placenames.find((pn) => pn.language === 'en')?.wording;
  const latLong = county.geography.coordinates[0];

  return {
    name: wording.toLowerCase(),
    latLong
  }
});

fs.writeFile('./src/assets/app-counties.json', JSON.stringify(counties), function(err) { console.log('Error', err) });