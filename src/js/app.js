angular.module('chat-app', ['ngCookies'])


    .controller('loginCtrl', ['$window', '$scope', '$http', '$cookies',
        function($window, $scope, $http, $cookies) {
            $scope.username = null;
            $scope.loading = false;
            $scope.mensagem = null;

            $scope.login = function() {
                $scope.loading = true;

                $http.post('/login', { username: $scope.username })
                    .then(function(response) {
                        $scope.loading = false;
                        $scope.mensagem = null;

                        if (response.data.sucesso) {
                            $cookies.put('userSession', response.data.usuario);
                            $window.location = '/';
                        }
                        else {
                            $scope.mensagem = response.data.mensagem;
                        }
                    }, function(err) {
                        $scope.loading = false;
                        console.log(err);
                    });
            }
        }]);
        
        
        
     
