angular.module('chat-app', ['ngCookies'])

    .service('Socket', ['$timeout', function($timeout) {

        this.socket = io('192.168.25.6:1234');

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


    .controller('chatController', ['$scope', '$cookies', 'Socket', '$http',
        function($scope, $cookies, Socket, $http) {

            $scope.mensagens = [];
            $scope.usuarios = [];
            $scope.corpoMensagem = '';
            $scope.userName = $cookies.get('userSession');

            //var userName = $cookies.get('userSession');

            // Init
            (function() {

                console.log('init');
                $http.get('/users', null)
                    .then((data) => {
                        console.log(data);
                    }, (err) => {
                        console.log(err);
                    });
            })()
            
            $scope.ownUser = function(username) {
                return username == $scope.userName;
            }

            if (!$scope.userName)
                alert('Sessão inválida!');
            else {
                Socket.emit('newUser', $scope.userName);
            }


            $scope.limparMensagens = function() {
                console.log('limpar as mensagens');
            }

            Socket.on('chatMessage', function(message) {
                console.log(message);
                $scope.mensagens.push(message);
            });

            Socket.on('newUser', function(username) {

                $scope.usuarios.push({ nome: username });
            })

            $scope.sendMessage = function() {

                var msg = $scope.corpoMensagem.trim();
                if (msg.length > 0) {
                    var message = {
                        userName: $scope.userName,
                        message: msg,
                        data: Date.now()
                    };

                    Socket.emit('chatMessage', message);

                    $scope.corpoMensagem = '';
                }

            };

            $scope.$on('$destroy', function() {
                Socket.removeListener('chatMessage');
            });



        }])




