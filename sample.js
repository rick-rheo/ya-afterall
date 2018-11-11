AfterAll = requre('ya-afterAll');

AfterAll.enableDebug();

const errorVersion = false;

AfterAll.afterAll(aa => {

	aa.gettingIt();
	
	setTimeout(() => {
		aa.gotIt({foo: 'bar'})
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

	console.log(resources);

}, error => {

	console.error(`Sadness ${error}`);

});
