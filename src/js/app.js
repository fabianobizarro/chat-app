var app = angular.module('application', ['ngCookies'])

    .service('Socket', ['$timeout', function($timeout) {

        this.socket = io();

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
    .service('auth', ['$cookies', function($cookies){

      this.getUserName = function () {
         return $cookies.get('userSession');
      }

      this.userAuthenticated = function(){
        return $cookies.get('userSession') !== null && $cookies.get('userSession') !== undefined;
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

                        var _now = new Date(Date.now());
                        var _expirationDate = _now.setDate(_now.getDate() + 7).toString();
                        
                        if (response.data.sucesso) {
                            $cookies.put('userSession', response.data.usuario, { expires: _expirationDate });
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
    .controller('chatController', ['$scope', 'auth', 'Socket', '$http',
        function($scope, auth, Socket, $http) {

            $scope.mensagens = [];
            $scope.usuarios = [];
            $scope.corpoMensagem = '';
            $scope.userName = auth.getUserName();

            // Init
            (function() {
                console.log('init controller');
                $http.get('/users', null)
                    .then((result) => {
                        $scope.usuarios = result.data.map(function(usuario){
                          return { nome: usuario };
                        })
                    }, (err) => {
                        console.log(err);
                    });
            })()

            $scope.ownUser = function(username) {
                return username == $scope.userName;
            }


            if (auth.userAuthenticated()){
                Socket.emit('newUser', $scope.userName);
            }
            else{
                alert('Sessão inválida!');
            }

            $scope.limparMensagens = function() {
                console.log('limpar as mensagens');
            }

            Socket.on('chatMessage', function(message) {
                $scope.mensagens.push(message);
            });

            Socket.on('newUser', function(username) {

                $scope.usuarios.push({ nome: username });

                var arrayUSer = $scope.usuarios.filter(function(u){
                  return u == $scope.userName;
                })
                console.log('user array: ', arrayUSer);

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
