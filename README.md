# ngtagcloud
Angular tag cloud with click handler

Create simple tag clouds for your angular apps.

## Installation

### bower

```
	$ bower install ngtagcloud --save
```

Include the following in your project html;

```
	<link rel="stylesheet" href="bower_components/ngtagcloud/ngtagcloud.css">
    <script type="text/javascript" src='bower_components/ngtagcloud/ngtagcloud.min.js'></script>
```

replace bower_components with the path to your bower library if it isn't bower_components, e.g. replace with *lib* for ionic projects.


### npm

```
	npm install --save ngtagcloud
```

Include the following in your project html;

```
	<link rel="stylesheet" href="node_modules/ngtagcloud/ngtagcloud.css">
    <script type="text/javascript" src='node_modules/ngtagcloud/ngtagcloud.min.js'></script>
```

Include in your Angular app with;

```
	angular.modules('myApp',['ngTagCloud',....])
```

Include an ng-tag-cloud element in your project html;

```
	<ng-tag-cloud  tag-data="cloud_data" ></ng-tag-cloud> 
```

For each tag in the cloud a *span* element is appended to the tag cloud container.

The tag data is expected to be an array of objects with text and weight properties  

```
	{text: <string>, weight: <number>}

	e.g.
	
	$scope.cloud_data = [
          {text: "Lorem", weight: 15},  
          {text: "Ipsum", weight: 9},
          {text: "Dolor", weight: 6},
          {text: "Sit", weight: 7},
          {text: "Amet", weight: 5} 
      ];
```

Each tag in the cloud can have an associated link e.g

```
	$scope.cloud_data = [
          {text: "Lorem", weight: 15, link: '/api/tags/search/Lorem'},  
          {text: "Ipsum", weight: 9, link: '/api/tags/search/Ipsum'},
          {text: "Dolor", weight: 6, link: 'http://google.com?q=Dolor'},
          {text: "Sit", weight: 7},
          {text: "Amet", weight: 5} 
      ];
      
```

#### Tag Data URL

Instead of providing a bound attribute to the tag data you can specify a URL with the *tag-url* attribute and the directive will download the tag data from the URL.  The data from the web service must be encoded with JSON.


```
	<ng-tag-cloud  tag-url="/api/get_tag_data" ></ng-tag-cloud> //  a relative URL
	
	or
	
	<ng-tag-cloud  tag-url="http://www.example.com/api/get_tag_data" ></ng-tag-cloud> //  an absolute URL
```


#### Common URL

You can set a common link URL for all tags with the *tag-link* attribute


```
	<ng-tag-cloud  tag-data="cloud_data" tag-link='http://google.com?q=__tag__'></ng-tag-cloud>  
```

The **\_\_tag__** in the link is replaced with the tag text for each tag in the cloud.  Specific tag links take preference over
a common tag link if both are given.


#### Tag click handler

You can register a click handler so that a function is called in the scope of the parent controller when the tag is clicked.
The click handler is called with the tag text 
 E.g.

index.html
```
	<ng-tag-cloud  tag-data="cloud_data" tag-click="tag_click_handler(text)"></ng-tag-cloud> 
```

controller.js
```

$scope.tag_click_handler = function(text) {
	console.log('a tag in the cloud was clicked', text);
		
	// a useful thing to do here might be to search with the tag e.g
	$state.go('tag.search',{tag: text});
}

and with the ui-router setup

$stateProvider.state('tag.search', {
    url: '/tags/search',
    controller: 'SearchCtrl',
    templateUrl: 'search_results.html',
    params: {
        tag: null
    } 
  
})

```

You can call the method anything you like but the parameter name in the attribute must remain as *text*.  E.g.

index.html
```
	<ng-tag-cloud  tag-data="cloud_data" tag-click="some_other_function_name(text)"></ng-tag-cloud> 
```


## License

The MIT License (MIT)

Copyright (c) 2016 Damian Hamill

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


