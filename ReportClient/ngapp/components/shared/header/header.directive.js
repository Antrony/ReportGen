app.directive("header", function($state,localStorageService) {
  return {
    restrict: 'A',
    templateUrl: 'components/shared/header/header.template.html',
    scope: true,
    transclude : false,
    link: function(scope, elem, attrs) {
            scope.userstatus=localStorageService.get('user');
            if(scope.userstatus==null){
                $state.go('login')
            }
            else{
                scope.uname=scope.userstatus.firstname
            }
        /**
        * Details: Logout functionality
        * Date: 11 Dec 2017
        * Author: Antony
        **/
        scope.logout = function(){
            localStorageService.clearAll();
            toastr.success('Logged out successfully!')
            $state.go("login");
        }

        scope.userProfile = function(){
            $state.go("profile")
        }
    }
  };
});
