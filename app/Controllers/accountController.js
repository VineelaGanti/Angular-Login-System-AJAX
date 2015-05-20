//With JSON Array

//function AccountController($scope,$rootScope,$location) {
//    $scope.users = [{ userid: 1, username: 'satya', password: 'satya', email: 'satya@gmail.com', mobile: '12345' }];

//    $rootScope.loginStatus = false;
//    $scope.loginUser = {};
//    $scope.selectedUser = {};
//    $scope.resetUser = {};

//    $scope.isAddOrEdit = false;


//    function init() {
//        if (sessionStorage.username != "" && sessionStorage.username != undefined) {
//            $rootScope.loginStatus = true;
//            $rootScope.loggedUsername = sessionStorage.username;

//        } else {
//            $rootScope.loginStatus = false;
//        }
//    }

//    init();

   



//    $scope.addUser= function () {
//        var newid=$scope.users.length+1;
//        $scope.selectedUser.userid=newid;
//        $scope.users.push($scope.selectedUser);

//        $scope.selectedUser = null;

//        $location.path('/Login');
//    }

//    getUserByName = function () {
//        for (i = 0; i < $scope.users.length; i++) {
//            if ($scope.users[i].username == sessionStorage.username) {
//                $scope.selectedUser = $scope.users[i];
//                return $scope.users[i];
//                break;
//            }
//        }
//        return null;
//    }
//    $scope.getUserById=function(id){
//        for (i = 0; i < $scope.users.length; i++) {
//            if ($scope.users[i].userid == userid) {
//                return $scope.users[i];
//                break;
//            }
//        }
//        return null;
//    }
 
//    $scope.loginUser= function () {
     
//        for (i = 0; i < $scope.users.length; i++) {
//            if ($scope.users[i].username == $scope.loginUser.username && $scope.users[i].password == $scope.loginUser.password) {
//                $rootScope.loginStatus = true;
//                break;
//            }
//        }
//        if ($rootScope.loginStatus) {
//            $rootScope.loggedUsername = $scope.loginUser.username;
//            sessionStorage.username = $scope.loginUser.username;
//            $location.path('/UserInfo');
//        }
//        else {
//            alert("invalid");
//        }
//    }

   


//    $scope.updateUser= function () {
//        for (i = 0; i < $scope.users.length; i++) {
//            if ($scope.users[i].userid == $scope.selectedUser.userid) {
//                $scope.users[i] = $scope.selectedUser;
//                break;
//            }
//        }
//        $location.path('/UserInfo');

//    },
//    $scope.resetPassword= function () {
//       $scope.selectedUser = $scope.getUserByName(sessionStorage.username);
//        $scope.selectedUser.password = $scope.resetUser.password;        
//        $scope.updateUser();

//    }
//    $scope.logOut = function () {
//        sessionStorage.username = ""
//        $scope.selectedUser = null;
//        $rootScope.loginStatus = false;
//        $scope.loginUser = null;
//        $location.path('/Login');
//    }

//    getUserByName();

//}

//webAdminApp.controller('AccountController', AccountController);






//With JSON Array and Angular Service


//function AccountController($scope, $rootScope, $location,$http,accountService) {
//    $scope.users =[];

//    $rootScope.loginStatus = false;
//    $scope.loginUser = {};
//    $scope.selectedUser = {};
//    $scope.resetUser = {};

//    $scope.isAddOrEdit = false;


//    function init() {
       
//        //$http.get('http://localhost:57878/api/users').success(function (data) {
//        //    $scope.users = data;
//        //}).error(function (data) { });

//         $scope.users = accountService.getUsers();

//        if (sessionStorage.username != "" && sessionStorage.username != undefined) {
//            $rootScope.loginStatus = true;
//            $rootScope.loggedUsername = sessionStorage.username;

//        } else {
//            $rootScope.loginStatus = false;
//        }
//    }

//    init();





//    $scope.addUser = function () {
//        accountService.addUser($scope.selectedUser);
//        $scope.selectedUser = null;
//        $location.path('/Login');
//    }

//    getUserByName = function () {
//        $scope.selectedUser = accountService.getUserByName(sessionStorage.username);
//    }
   

//    $scope.loginUser = function () {

//        if (accountService.validateUser($scope.loginUser.username, $scope.loginUser.password)) {
//            $rootScope.loginStatus=true;
//            $rootScope.loggedUsername = $scope.loginUser.username;
//            sessionStorage.username = $scope.loginUser.username;

//            $location.path('/UserInfo');
//        }
//        else{
//            $rootScope.loginStatus=false;
//            alert("Invalid Login");
//        }
       
//    }


//    $scope.updateUser = function () {
//        accountService.updateUser($scope.selectedUser);
//        $location.path('/UserInfo');

//    },
//    $scope.resetPassword = function () {
//        accountService.resetPassword(sessionStorage.username, $scope.resetUser.newPassword);
//        $location.path('/UserInfo');

//    }
//    $scope.logOut = function () {
//        sessionStorage.username = ""
//        $scope.selectedUser = null;
//        $rootScope.loginStatus = false;
//        $scope.loginUser = null;
//        $location.path('/Login');
//    }

//    getUserByName();

//}



//With $http Service and RESTful service

function AccountController($scope, $rootScope, $location,$http) {


    
    $scope.resetUser = {};

    $scope.isAddOrEdit = false;

    function getByName(name) {
        $http.get('http://localhost:57878/api/users?name=' + name).success(function (data) {
            $scope.selectedUser = data;
        }).error(function () { alert("error") });
    }


    function init() {

        $http.get('http://localhost:57878/api/users').success(function (data) {
            $scope.users = data;
           

        }).error(function (data) { alert('error'); });


        if (sessionStorage.username != "" && sessionStorage.username != undefined) {
            $rootScope.loginStatus = true;
            $rootScope.loggedUsername = sessionStorage.username;

            if (sessionStorage.username == 'admin') {
                $rootScope.isAdmin = true;
            }
            else {
                $rootScope.isAdmin = false;
            }

            getByName(sessionStorage.username);


        } else {
            $rootScope.loginStatus = false;
        }
    }

    init();





    $scope.addUser = function () {

        $scope.selectedUser.UserId = 0;
        $http.post('http://localhost:57878/api/users', $scope.selectedUser).success(function () { }).error(function () { alert("error"); });
        $location.path("/Login");

    }

    $scope.loginUser = function () {

        var isValid = false;
        for (i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i].Username == $scope.loginUser.Username && $scope.users[i].Password == $scope.loginUser.Password) {
                isValid = true;
                break;
            }
        }
        


        if (isValid) {
           
            $rootScope.loginStatus=true;
            $rootScope.loggedUsername = $scope.loginUser.Username;
            sessionStorage.username = $scope.loginUser.Username;
            $location.path('/UserInfo');
        }
        else{
            $rootScope.loginStatus=false;
            alert("Invalid Login");
        }

    }


    $scope.updateUser = function () {
        $http.put('http://localhost:57878/api/users', $scope.selectedUser).success(function () { }).error(function () { alert('error'); });

        $location.path('/UserInfo');

    },
    $scope.resetPassword = function () {

        if ($scope.selectedUser.Password == $scope.resetUser.oldPassword) {
            $scope.selectedUser.Password = $scope.resetUser.newPassword;
            $http.put('http://localhost:57878/api/users', $scope.selectedUser);
        }
        else {
            alert("Invalid Password ! try again");

        }
        $location.path('/UserInfo');

    }
    $scope.logOut = function () {
        sessionStorage.username = ""
        $scope.selectedUser = null;
        $rootScope.loginStatus = false;
        $scope.loginUser = null;
        $location.path('/Login');
    }

    //getUserByName();

}


webAdminApp.controller('AccountController', AccountController);