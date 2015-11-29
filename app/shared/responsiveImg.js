'use strict';

angular.module('Friends').directive('responsive', ['backendServices', function (backendServices) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var cancelResponsiveCall = false;
			element.css('visibility', 'hidden');

			function getUriAndMakeResponsive (newValue) {
				if (!newValue) {
					return;
				}

				backendServices.files.getById(attrs.metaId).then(function (fileMeta) {
					if (!cancelResponsiveCall) {
						element.attr('data-src', fileMeta.Uri);
						backendServices.processResponsiveImage(element);
					}
				});
			}

			scope.$watch(function () {
				return attrs.metaId;
			}, getUriAndMakeResponsive);

			scope.$on('$destroy', function () {
				cancelResponsiveCall = true;
			});
		}
	};
}]);