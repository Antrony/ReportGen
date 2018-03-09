app.controller('login',function($scope,$state,localStorageService,authservice){
    $scope.loginTxt='Login'
    $scope.userstatus=localStorageService.get('user');
    if($scope.userstatus!=null){
        if($scope.userstatus.status=="logged_in"){
            $state.go('dashboard')
        }
    }
    $scope.login = function(){
        username=$scope.login.username
        password=$scope.login.password
        if(username==null||username==""){
            toastr.error('Username required!')
        }
        else if(password==null||password==""){
            toastr.error('Password required!')
        }
        else{
            data=JSON.stringify({'username':username,'password':password})
            $scope.loginBtn = true;
            $scope.loginTxt = 'Loading..'
            authservice.loginData(data).then(function(response){
                $scope.result=response.data;
                if($scope.result.status=='logged_in'){
                    $scope.loginBtn = false;
                    $scope.loginTxt = 'Login'
                    localStorageService.set('user', response.data);
                    toastr.success('Logged in successfully!')
                    $state.reload();
                }else if($scope.result.status=='login_failure'){
                    $scope.loginTxt = 'Login'
                    $scope.loginBtn = false;
                    toastr.error('Invalid username or password!')
                }
            });
        }
    }

// Particles animation
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true03/07/2018 08:14:42 AM,959 ERROR    [views.py:18] {'URL Error': 'Invalid URL'}:
03/07/2018 08:14:43 AM,226 WARNING  [base.py:93] Not Found: /api/:
03/07/2018 08:14:43 AM,307 ERROR    [views.py:18] {'URL Error': 'Invalid URL'}:
03/07/2018 08:14:43 AM,308 WARNING  [base.py:93] Not Found: /api/:
03/07/2018 08:14:43 AM,619 ERROR    [views.py:18] {'URL Error': 'Invalid URL'}:
03/07/2018 08:14:43 AM,619 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:25:48 PM,465 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:25:48 PM,701 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:25:48 PM,716 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:25:48 PM,807 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:25:48 PM,841 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:25:48 PM,842 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:25:49 PM,301 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:25:49 PM,302 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:25:53 PM,278 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:25:53 PM,293 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:26:02 PM,21 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:26:02 PM,34 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:26:05 PM,452 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:26:05 PM,467 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 02:26:09 PM,59 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 02:26:09 PM,73 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 03:09:20 PM,541 WARNING  [csrf.py:153] Forbidden (CSRF cookie not set.): /api/v1/auth_login/:
03/08/2018 03:09:27 PM,880 WARNING  [csrf.py:153] Forbidden (CSRF cookie not set.): /api/v1/auth_login/:
03/08/2018 03:10:33 PM,521 WARNING  [csrf.py:153] Forbidden (CSRF cookie not set.): /api/v1/auth_login/:
03/08/2018 03:24:38 PM,66 WARNING  [csrf.py:153] Forbidden (CSRF cookie not set.): /api/v1/auth_login/:
03/08/2018 03:24:48 PM,279 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 03:24:48 PM,296 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 03:24:48 PM,387 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 03:24:48 PM,388 WARNING  [base.py:93] Not Found: /api/:
03/08/2018 03:24:48 PM,653 ERROR    [views.py:23] {'URL Error': 'Invalid URL'}:
03/08/2018 03:24:48 PM,654 WARNING  [base.py:93] Not Found: /api/:
,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#ffffff"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
});
// Particles animation end
});