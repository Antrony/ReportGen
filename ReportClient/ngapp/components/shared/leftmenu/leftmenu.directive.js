app.directive("leftmenu",function($state,localStorageService) {
  return {
    restrict: 'A',
    templateUrl: 'components/shared/leftmenu/leftmenu.template.html',
    transclude : false,
    link: function(scope, elem, attrs) {

        scope.userstatus=localStorageService.get('user');
        if(scope.userstatus==null){
            $state.go('login')
        }
        else{
            scope.username=scope.userstatus.user
        }

        scope.logout = function(){
            localStorageService.clearAll();
            toastr.success('Logged out successfully!')
            $state.go("login");
        }
    }
  };
});
