// Data mocking (auto lorem ipsum)
// ===========================

var Faker = require('Faker');
var _ = require('underscore');

module.exports = function(rawSON) {
  var finalObject = {}; // Result array
  var data = ""; // Final JSON
  var object;
  var buildingElement = {}; // JSON of unit data
  var i, j; // temporary variables

  // Data randomized population
  createData = function(params) {
    return Faker[params[0]][params[1]](params[2]);
  };

  // Create the necessary number of events
  var findTheLeaves = function(list) {

    var tmp = {};
    var tmpArray = [];

    _.each(list,

      function(obj, index, list) {

        if(obj.type === "array") {
          // Create object/array
          _(obj.cycles).times(function() {
            tmpArray.push(findTheLeaves(list[index].items));
            tmp[index] = tmpArray;
          });
        }
        else if(obj.type === "object") {
          if(!index) {
            tmp = findTheLeaves(list[index].properties);
            return tmp;
          }
          else {
            tmp[index] = findTheLeaves(list[index].properties);
            return tmp;
          }
        }
        else {
          if(list[index].fixture) {
            var dataArgs = list[index].fixture.type.split('.');
            dataArgs.push(list[index].fixture.params);
            tmp[index] = createData(dataArgs).toString();
          } else {
            console.log("ERROR, there is a problem with the definition of your fixture");
          }

          return tmp;
        }
      }
    );

    buildingElement = tmp;
    tmp = {};

    return buildingElement;
  };

  return findTheLeaves(rawSON.properties);
};
