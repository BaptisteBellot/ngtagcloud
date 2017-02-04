/**
 * Angular Tag cloud
 * Author : Damian Hamill
 * Repo: https://github.com/damianham/ngtagcloud
 * 
 * See Also: https://github.com/zeeshanhyder, https://github.com/lucaong/jQCloud
 */

angular.module('ngTagCloud',[])

.directive('ngTagCloud', ['$timeout', '$log',function($timeout, $log) {
    var directive = {
        restrict: 'EA',
        scope: { 
          tagOverflow: '=?',
          tagData: '=', 
          tagLink: '@',
          tagClick: '&'
        },
        template: "<div id='ng-tag-cloud' class='ng-tag-cloud'></div>",
        link: link
      };

      return directive;

      function link($scope, element, attrs, controller) { 
        
        var container;
        
        var wrap_text = function(link, tagtext) {
          if (typeof(link) === 'undefined') return tagtext;
          
          // replace {{tag}} in the link with the tagtext
          return link.replace('__tag__',tagtext);
        }
        
        var buildCloud = function(tagdata) {
          //console.log('build cloud with',tagdata);
          
          if (tagdata.length < 1) return;
          
       // Make sure every weight is a number before sorting
          for (var i = 0; i < tagdata.length; i++) {
            tagdata[i].weight = parseFloat(tagdata[i].weight, 10);
          }

          // Sort tagdata from the word with the highest weight to the one with the lowest
          tagdata.sort(function(a, b) { if (a.weight < b.weight) {return 1;} else if (a.weight > b.weight) {return -1;} else {return 0;} }); 
        
          var cloud_div = container.find('div');
          var maxweight = tagdata[0].weight;
          var minweight = tagdata[tagdata.length - 1].weight;
          var weight;
          
          //console.log('container div', cloud_div);
          
          cloud_div.empty();
          
          angular.forEach(tagdata, function(tag) { 
            
            // Check if min(weight) > max(weight) otherwise use default
            if (maxweight > minweight) {
              // Linearly map the original weight to a discrete scale from 1 to 10
              weight = Math.round((tag.weight - minweight) /  (maxweight - minweight) * 9.0) + 1;
            } else {
              weight = 5;
            }
            
            var elem = document.createElement("span");
            //console.log('tag click == ', typeof($scope.tagClick))
            if ($scope.tagClick !== undefined && $scope.tagClick !== "" && typeof($scope.tagClick) === "function") {
              // append a tag and bind it's onclick event to the click handler              
              
              elem.onclick = function(){
                $scope.tagClick({text: tag.text});
              };
              
              // append the tag text
              elem.append(tag.text);
              
            } else if ( (tag.link !== undefined && tag.link !== "" && typeof(tag.link) === "string") ||
                ($scope.tagLink !== undefined && $scope.tagLink !== "" && typeof($scope.tagLink) === "string") )
            {
              // Append href if there's a link associated with the tag 
              // or if the directive has a link attribute
              
              var href;
              
              if (tag.link !== undefined && tag.link !== "" && typeof(tag.link) === "string") {
                // use the link for this tag
                href =  encodeURI(tag.link).replace(/'/g, "%27");
              } else {
                // else use the link attribute
                href = wrap_text($scope.tagLink,tag.text);
              } 
              
              var tag_link = document.createElement("a");
              tag_link.href = href;
              tag_link.appendChild(document.createTextNode(tag.text));
              elem.append(tag_link);
               
            } else { 
                // append the tag text
                elem.append(tag.text);
            }
 
            elem.classList.add('w' + weight); 

            //console.log('append',elem);
            cloud_div.append(elem);
          });
          
          $scope.$apply();
        }
        
        var getData = function($scope) {
          
          if (typeof($scope.tagData) === 'undefined' || $scope.tagData === "") {
            $log.error("ngTagCloud: data attribute is missing. Usage <ng-tag-cloud tag-data='expression'></ng-tag-cloud>\n" +
                "See: https://github.com/damianham/ngtagcloud");
            return false;
          }
          $scope.$watchCollection('tagData', function (newValue, oldValue) {
            $timeout(function(){
                buildCloud(newValue);
            }, 10);
          });
          return true;
        }
        
        if (getData($scope) === false) return;
        
        // Reference to the container element
        container = angular.element(element);
        
        //console.log('tag cloud container', container); 

      } 
      
      
    }])

