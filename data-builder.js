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

// propertyType: 'residential',
// purchaseType: 'buy',
// address: {
//   one: 'Saint Andrew\'s',
//   two: 'Seapoint',
//   town: 'Termonfeckin',
//   county: 'Louth',
//   eirCode: 'A92 YW02'
// },
// price: [ // Type
//   {
//     value: '350000',
//     currency: 'EUR',
//     isCurrent: true
//   }
// ],
// beds: 4,
// baths: 2,
// sizeMetersSquared: 158,
// houseType: 'detached', // Type
// saleType: 'Private Treaty', // Type,
// media: {
//   images: [],
//   videos: [],
//   virtualtour: []
// }
// },


const ITEMS_PER_COUNTY = 10;
let data = [];

const buildItem = (county) => {
  return {
    propertyType: 'residential',
    purchaseType: 'buy',
    address: {
      one: getRandomNumber(1, 100),
      two: 'street',
      town: 'Town',
      county: county,
      eirCode: 'A92 YW02'
    },
    price: [
      {
        value: getRandomNumber(100000, 400000),
        currency: 'EUR',
        isCurrent: true
      }
    ],
    beds: getRandomNumber(2, 5),
    baths: getRandomNumber(1, 4),
    sizeMetersSquared: getRandomNumber(100, 200),
    houseType: 'detached',
    saleType: 'private',
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
  for (let j = 0; j < ITEMS_PER_COUNTY; j++) {
    console.log('moo')
    data.push(buildItem(counties[i]));
    console.log('d', data);
  }
}

fs.writeFile('./src/app/data/test.json', JSON.stringify(data), function() {});