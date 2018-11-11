# ya-afterall
Yet another verion of After All.  Helps you with multiple asyncrounous functions necessary to aquire data to complete a final task




## Installation

```
npm install ya-afterall
```


### Methods

- `aa.gettingIt()` - call this for every async call you make to fetch a resource
- `aa.gotIt({resourceName: resourceValue, otherResourceName: otherResourceValue})` - call once you've fetched the resource. give the resource a unique name
- `aa.error(errorMsg)` - call this if a resource fetch fails and you need everything to stop. Provide an error to be given back to you in the error handler
- `aa.then(fn)` - call this to chain to another function with a set of asyncronous calls



## Usage
```js

const AfterAll = require('ya-afterAll');

// Set this to true to show what happens if an error comes up while gathering resources
const errorVersion = false;

AfterAll.afterAll(aa => {

	aa.gettingIt();
	setTimeout(() => {
		aa.gotIt({foo: 'bar'})
	});

	aa.gettingIt();
	setTimeout(() => {
		aa.gotIt({another: {thing: 'to fetch'}})
	});

	aa.then(resources => {

		aa.gettingIt();
		setTimeout(() => {
			if(errorVersion) {
				aa.error('error happen');
			}
			else {
				aa.gotIt({bar: 'foo'})
			}
		});

		aa.then(resources => {

			aa.gettingIt();
			setTimeout(() => {
				aa.gotIt({done: 'yep'})
			});
		});
	});


}, resources => {

	// This is called once all the resources are fetched.   `resources` is an object with all the data fetched above

	console.log(resources);

}, error => {

	// Error can be anything. In this case it's just a string
	console.error(`Sadness ${error}`);

});

```
## Sample Result

```js

{ 
	foo: 'bar',
  	another: { 
		thing: 'to fetch' 
	},
  	bar: 'foo',
  	done: 'yep' 
}
```
