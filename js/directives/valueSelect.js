angular.module('fishApp').directive('valueSelect', function() {
   return {
       restrict: 'C',
       replace: true,
       scope: {
           options: '@',
           selectNumber: '@',
           ngModel: '='
       },
       templateUrl: 'templates/directives/valueSelect.html',
       link: function(scope, element, attrs) {
           var checkedClass = "glyphicon-check",
               uncheckedClass = "glyphicon-unchecked",
               selectedOptions = [],
               styleClass = [];
           scope.styleClass = [];
           scope.selectOptions = angular.fromJson(scope.options);
           scope.$watch('ngModel', function(newValue, oldValue) {
               scope.ngModel = newValue;
               styleClass = [];
               selectedOptions = [];
               scope.styleClass = [];
               if((typeof scope.ngModel) === 'string') {
                   for(var i= 0, j=scope.selectOptions.length; j>i; i++) {
                       if(scope.selectOptions[i] === scope.ngModel) {
                           styleClass.push(checkedClass);
                       }else {
                           styleClass.push(uncheckedClass);
                       }
                   }
                   scope.styleClass = styleClass;
               }else {
                   for(var x= 0, y=scope.selectOptions.length; y>x; x++) {
                       for(var a= 0, b=scope.ngModel.length; b>a; a++) {
                           if(scope.selectOptions[x] === scope.ngModel[a]) {
                               styleClass.push(checkedClass);
                               selectedOptions.push(x);
                               break;
                           }else {
                               if((a+1) === b){
                                   styleClass.push(uncheckedClass);
                               }
                           }
                       }
                   }
                   scope.styleClass = styleClass;
               }
           });

           //sets up 2 way binding with ngModel
           //supports multiple values in an array and single string values

           //resets style classes for all options
           var resetOptions = function(options) {
               var resetClass = options;
               for(var x= 0, y=resetClass.length; y>x; x++) {
                   resetClass[x] = uncheckedClass;
               }
               return resetClass;
           };

           //builds model output
           var buildModel = function(selected, number) {
                var output;
                var theseOptions = scope.selectOptions;
                if(number > 1) {
                    output = [];
                    for(var a= 0, b=selected.length; b>a; a++) {
                        output.push(theseOptions[selected[a]]);
                    }
                }else {
                    output = theseOptions[selected[0]];
                }
                return scope.ngModel = output;
           };
           //builds output for number of selectable options
           var selectNumber = function(number, options, index) {
               var thisNumber = parseInt(number),
                   theseOptions = resetOptions(options),
                   thisOption,
                   optionTest;
               if(selectedOptions.length === 0) {
                   selectedOptions.push(index);
               }else {
                   for(var x= 0, y=selectedOptions.length; y>x; x++) {
                       optionTest = selectedOptions[x];
                       if((optionTest === index) && (y>1)) {
                           selectedOptions.splice(x, 1);
                           break;
                       }else {
                           if((y-1 === x) && (optionTest !== index)) {
                               selectedOptions.push(index);
                           }

                       }
                   }
               }
               if(selectedOptions.length > thisNumber) {
                   selectedOptions.splice(0, 1);
               }
               buildModel(selectedOptions, number);
               for(var i= 0, j=selectedOptions.length; j>i; i++) {
                   thisOption = selectedOptions[i];
                   theseOptions[thisOption] = theseOptions[thisOption] === uncheckedClass ? checkedClass : uncheckedClass;
               }
               return theseOptions;
           };

           //select method
           scope.selectOption = function(index) {
               scope.styleClass = selectNumber(scope.selectNumber, scope.styleClass, index);
           };

       }
   }
});