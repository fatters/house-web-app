const fs = require('fs');

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

const boundariesIE = JSON.parse(fs.readFileSync('./src/assets/county-boundaries.geojson', { encoding: 'utf8', flag: 'r' }));
const boundariesNI = JSON.parse(fs.readFileSync('./src/assets/county-boundaries-ni.geojson', { encoding: 'utf8', flag: 'r' }));
const cBounds = boundariesIE.features.concat(boundariesNI.features);

cBounds.forEach((bounds) => {
  const countyName = bounds?.properties?.ENGLISH?.toLowerCase() ?? bounds?.properties?.CountyName?.toLowerCase() ?? 'error';
  fs.writeFile(`./src/assets/boundaries/county/${countyName}.geojson`, JSON.stringify(bounds), function(err) { console.log('Error', err) });
})

const townBoundariesIE = JSON.parse(fs.readFileSync('./src/assets/town-boundaries.geojson', { encoding: 'utf8', flag: 'r' }));
// TODO: NI
const tBounds = townBoundariesIE.features;

tBounds.forEach((bounds) => {
  const townName = bounds?.properties?.SETTL_NAME?.toLowerCase() ?? 'error';
  fs.writeFile(`./src/assets/boundaries/town/${townName}.geojson`, JSON.stringify(bounds), function(err) { console.log('Error', err) });
})
