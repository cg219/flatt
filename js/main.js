(function(){
	var flatt = angular.module("flatt", ["ui.router", "ngSanitize"]);
	flatt.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function(loc, state, url){
		loc.html5Mode(true);

		url.otherwise("/");

		state
			.state("home", {
				url: "/",
				controller: "Home",
				params: {},
				templateUrl: "home.html"
			})
			.state("stills", {
				url: "/stills",
				controller: "Stills",
				params: {},
				templateUrl: "stills.html"
			})
	}])

	flatt
		.controller("Main", ["$scope", function(scope){
			scope.showLightbox = false;
		}])
		.controller("Home", ["$scope", "$sce", function(scope, sce){
			scope.videos = [
				"110520891",
				"110531415",
				"110526958",
				"110522221",
				"110527224",
				"110527538",
				"110536700",
				"110535061",
				"110534367",
				"110528974"];

			scope.getVimeoLink = function(id){
				return sce.trustAsResourceUrl("//player.vimeo.com/video/" + id);
			}

			console.log(scope);
		}])
		.controller("Stills", ["$scope", "$http", function(scope, http){
			scope.thumbs = [];
			scope.mainImage = "";
			scope.switchImage = function(item){
				scope.mainImage = item;
			}

			http.get("gallery.json")
				.then(function(data){
					console.log(data)
					scope.thumbs = data.data;
					scope.mainImage = data.data[0];
				}, function(err){
					console.error(err);
				})


		}])
		.directive("resize", ["$window", function(win){
			return {
				link: function(scope, element){
					var newHeight = element.parent().parent()[0].offsetWidth * .56;
					element.css("height", newHeight + "px");

					// win.bind("resize", function(){
					// 	scope.$apply();
					// })
				}
			}
		}])

})();
