const fs = require('fs');

const counties = [
  'Antrim',
  'Armagh',
  'Carlow',
  'Cavan',
  'Clare',
  'Cork',
  'Derry',
  'Donegal',
  'Down',
  'Dublin',
  'Fermanagh',
  'Galway',
  'Kerry',
  'Kildare',
  'Kilkenny',
  'Laois',
  'Leitrim',
  'Limerick',
  'Longford',
  'Louth',
  'Mayo',
  'Meath',
  'Monaghan',
  'Offaly',
  'Roscommon',
  'Sligo',
  'Tipperary',
  'Tyrone',
  'Waterford',
  'Westmeath',
  'Wexford',
  'Wicklow'
];

const advertType = [
  'residential',
  'commercial'
];

const propertyType = [
  'detached',
  'semiDetached',
  'terraced',
  'flat',
  'bungalow',
  'land'
];

const purchaseType = [
  'buy',
  'rent'
];

const BUY_ITEMS_PER_COUNTY = 10;
const RENT_ITEMS_PER_COUNTY = 5;
let data = [];

const buildItem = (county, purchaseType) => {
  return {
    advertType: advertType[getRandomNumber(0, advertType.length - 1)],
    propertyType: propertyType[getRandomNumber(0, propertyType.length - 1)],
    purchaseType: purchaseType,
    saleType: 'private',
    dateCreated: new Date(new Date() - Math.random()*(1e+12)),
    dateUpdated: null,
    address: {
      one: getRandomNumber(1, 100),
      two: 'street',
      town: 'Town',
      county: county,
      eirCode: 'A92 YW02'
    },
    price: {
      value: getRandomNumber(100000, 400000),
      currency: 'EUR',
      isCurrent: true
    },
    beds: getRandomNumber(1, 5),
    baths: getRandomNumber(1, 4),
    sizeMetersSquared: getRandomNumber(100, 200),
    media: {
      images: [
        'https://placehold.co/900x700',
        'https://placehold.co/900x700',
        'https://placehold.co/900x700'
      ],
      videos: [],
      virtualTour: []
    }
  }
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < counties.length; i++) {
  for (let j = 0; j < BUY_ITEMS_PER_COUNTY; j++) {
    data.push(buildItem(counties[i], 'buy'));
  }
  for (let k = 0; k < RENT_ITEMS_PER_COUNTY; k++) {
    data.push(buildItem(counties[i], 'rent'));
  }
}

fs.writeFile('./src/assets/test.json', JSON.stringify(data), function(err) { console.log('Error', err) });