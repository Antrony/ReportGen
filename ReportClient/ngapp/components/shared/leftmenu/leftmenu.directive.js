app.directive("leftmenu",function($state,localStorageService) {
  return {
    restrict: 'A',
    templateUrl: 'components/shared/leftmenu/leftmenu.template.html',
    transclude : false,
    link: function(scope, elem, attrs) {
	scope.navClass = localStorageService.get('view');
	scope.changeClass = function(){
    	if (scope.navClass === "nav-md"){
      	   scope.navClass = "nav-sm";
      	   localStorageService.set('view', 'nav-sm');
    	}else{
      	   scope.navClass = "nav-md";
      	   localStorageService.set('view', 'nav-md');
	}  
	};
        scope.userstatus=localStorageService.get('user');
        if(scope.userstatus==null){
            $state.go('login')
        }
        else{
            scope.username=scope.userstatus.user
        }

        scope.toggleFullScreen = function () {
          if ((document.fullScreenElement && document.fullScreenElement !== null) ||
           (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
              document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
              document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          } else {
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
          }
        }

        scope.logout = function(){
            localStorageService.clearAll();
            toastr.success('Logged out successfully!')
            $state.go("login");
        }
    }
  };
});
