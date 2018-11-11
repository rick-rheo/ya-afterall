

let EnableDebug = false;

exports.enableDebug(enable)
{
	if(typeof enable === 'undefined'){
		enable = true;
	}

	EnableDebug = enable;
}

exports.afterAll = function (getItFn, gotItFn, errorFn)
{
	const state = {

		gettingIt:

			function()
			{
				waiting++;
			},

		gotIt:

			function(data)
			{
				if(data) {

					if(typeof data !== 'object'){
						throw(new Error('aa.gotIt data must be null/undefined or an object'));
					}

					Object.keys(data).forEach(k => {

						if(resources[k]){
							console.warn(`afterAll getIt result provided a field "${k}" that's already been provided`);

							if(EnableDebug){
								debugger;
							}
						}

						resources[k] = data[k];
					});
				}

				if(!--waiting) {
					process.nextTick(errors ? gotSick : gotIt);
				}
			},

		then:

			function(getMoreFn)
			{
				nextGetItFn = getMoreFn;
			},

		error:

			function(error)
			{
				if(!errors){
					errors = [error];
				}
				else {
					errors.push(error);
				}
			},
	};

	function gotIt()
	{
		if(nextGetItFn) {

			const fn = nextGetItFn;
			nextGetItFn = null;

			fn(resources);
		}
		else {
			gotItFn(resources);
		}
	}

	function gotSick()
	{
		if(typeof errorFn === 'function') {
			errorFn(resources);
		}
		else {

			console.error('Utils.afterAll encountered an error but there was no error function and we\'re sad now :(');
			if(EnableDebug) {
				debugger;
			}
		}
	}

	let waiting = 0;
	let resources = {};
	let errors = null;
	let nextGetItFn = null;

	getItFn(state);
};