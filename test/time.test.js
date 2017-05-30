const assert = require('assert');
const format = require('date-fns/format');

const DTFORMAT = 'YYYY-MM-DD h:mm A';

function formatWithZone(string) {
  // string = '2017-05-19T18:00:00.000-0500'
  return format(new Date(string), DTFORMAT);
}

function formatAsLocal(string) {
  // string.slice(0, -6)) = '2017-05-19T18:00:00.000'
  return format(new Date(string.slice(0, -6)), DTFORMAT);
}

function formatAsUTC(string) {
  // utc no offset = '2017-05-19T18:00:00.000Z'
  return format(new Date(`${string.slice(0, -6)}Z`), DTFORMAT);
}

const testCases = [
  { localTime: '2017-05-19 6:00 PM', time: '2017-05-19T18:00:00.000-0500'},
  { localTime: '2017-05-19 11:00 PM', time: '2017-05-19T23:00:00.000-0500'},
  { localTime: '2017-05-19 4:00 PM', time: '2017-05-19T16:00:00.000-0700'},
  { localTime: '2017-05-19 11:00 PM', time: '2017-05-19T23:00:00.000-0700'},
  { localTime: '2017-05-20 4:00 AM', time: '2017-05-20T04:00:00.000+0300'},
  { localTime: '2017-05-20 1:00 AM', time: '2017-05-20T01:00:00.000+0300'},
]

const helpers = [formatWithZone, formatAsLocal, formatAsUTC];

helpers.forEach(helper => {

  describe(helper.name, function() {
    testCases.forEach(testCase => {
      it(`should format ${testCase.time} as ${testCase.localTime}`, () => {
        assert.equal(testCase.localTime, helper(testCase.time));
      });
    });
  });

});