var sock = new SockJS('http://fathomless-spire-1921.herokuapp.com/chat');
function ChatCtrl($scope){
  $scope.messages = [];
  $scope.sendMessage = function(){
    sock.send($scope.messageText);
    $scope.messageText = "";
  };

  sock.onmessage = function(e){
    $scope.messages.push(e.data);
    $scope.$apply();
  };
}
