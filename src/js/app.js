angular.module('chat-app', ['ngCookies'])

    .service('Socket', ['$timeout', function($timeout) {

        this.socket = io('localhost:1234');

        this.on = function(eventName, callback) {
            if (this.socket) {
                this.socket.on(eventName, function(data) {
                    $timeout(function() {
                        callback(data);
                    })
                });
            }
        }

        this.emit = function(eventName, data) {
            if (this.socket) {
                console.log(data);
                this.socket.emit(eventName, data);
            }
        }

        this.removeListener = function(eventName) {
            if (this.socket) {
                this.socket.removeListener(eventName);
            }
        }

    }])

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
        }])


    .controller('chatController', ['$scope', '$cookies', 'Socket',
        function($scope, $cookies, Socket) {
            
            $scope.mensagens = [];
            $scope.corpoMensagem = '';

            var userName = $cookies.get('userSession');

            if (!userName)
                alert('Sessão inválida!');
            else{
                console.log('novo usuario');
                Socket.emit('newUser', userName);
            }
                
            Socket.on('chatMessage', function(message) {
                $scope.mensagens.push(message);
            });

            $scope.sendMessage = function() {
                var message = {
                    username: userName,
                    message: $scope.corpoMensagem
                };

                Socket.emit('chatMessage', message);

                $scope.corpoMensagem = '';
            };

            $scope.$on('$destroy', function() {
                Socket.removeListener('chatMessage');
            });


        }])




