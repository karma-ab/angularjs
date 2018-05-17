app.directive("myTag", function () {
    return {
        restrict: "EA",
        scope: {
            customerName : '=info'
        },
        template: "Hello There {{customerName.name}}"     
    }
});