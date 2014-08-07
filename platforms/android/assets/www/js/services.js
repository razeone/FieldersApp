angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Tasks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tasks = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return tasks;
    },
    get: function(taskId) {
      // Simple index lookup
      return tasks[taskId];
    }
  }
})

.factory('Map', function(){

  return {
    all: function(){
      return 'Ola k ase?';
    }

  }
});