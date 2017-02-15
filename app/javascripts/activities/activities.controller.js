import 'angular';

ActivitiesController.$inject = ['feed'];

function ActivitiesController(feed) {
  var vm = this;
  var totalScore = feed.attr('total_score');

  vm.activities = feed.relation('activities');
  vm.totalScore = (totalScore/100).toFixed(2);
  vm.hasActivities = !!vm.activities.length;
  vm.activityNameToLabel = activityNameToLabel;


  function activityNameToLabel(name) {
    return (name === 'won_scores') ? 'You Won' : 'You Lose';
  }
}

export default ActivitiesController;
