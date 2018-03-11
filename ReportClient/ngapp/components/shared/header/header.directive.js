app.directive("header", function() {
  return {
    restrict: 'A',
    templateUrl: 'components/shared/header/header.template.html',
    scope: true,
    transclude : false,
  };
});
