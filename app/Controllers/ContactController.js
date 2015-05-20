function ContactController($scope, $rootScope, $http, $location) {

    function init() {

        $http.get('http://localhost:57878/api/users?name=' + sessionStorage.username).success(function (user) {

            alert("success");

            $http.get('http://localhost:65391/api/contacts/' + user.UserId).success(function (data) {
                $scope.contacts = data;
                alert("loaded contacts");

            }).
       error(function (error) {
           alert("error in loading..");
       });

        });

       
    }

    init();

    $scope.addContact = function () {
        alert("Hi");

        $http.get('http://localhost:57878/api/users?name=' + sessionStorage.username).success(function (user) {
            $scope.newContact.UserId = user.UserId;
            alert("HI");

            $http.post('http://localhost:65391/api/contacts', $scope.newContact).error(function () { alert("error"); });



            $location.path('/telephone');

        }).error(function(){alert("error in loading ");});
    }


}


webAdminApp.controller('ContactController', ContactController);
