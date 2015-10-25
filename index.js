module.exports = function (prop_name, prop_val, cb) {

	// connect

	var Mixpanelist = require('mixpanelist');
		
	var config = {
		"key": process.env.MIXPANEL_KEY,
		"secret": process.env.MIXPANEL_SECRET
	};
	
	var mixpanelist = new Mixpanelist(config);
			
	console.log("Querying " + prop_name + " = " + prop_val);

	// set globals
	var query = 'properties["' + prop_name + '"]=="' + prop_val + '"';
	if (typeof filename == 'undefined') filename = prop_val;
	
	var page = 0;
	var total = 0;
	var session_id = false;
	var all_results = [];

	// start recursive loop
	get_profiles();
	
	// functions

	function get_profiles() {
	
		var params = {
			where: query
		};
		
		if (session_id) {
			params.page = page;
			params.session_id = session_id;
		}
	
		mixpanelist.get('/engage', params, function (err, res) {
		
			if (err) console.log(err);
			else if (res.error) console.log(res.error);
			else {
			
				// result handler
				var results = res.results;
		
				// if profiles got returned
				if (results && results.length > 0) {
					// flatten results
				 	results.forEach(function(e) {
				 		var profile = e["$properties"];
				 		profile["$distinct_id"] = e["$distinct_id"];
				 		// add to collection
					 	all_results.push(profile);
					});

					if (page == 0 ) console.log("Getting profiles...");
					else console.log("Getting profiles... (page %s)", page + 1);
				}
				
				// if there might be more results
				if (results && results.length == 1000) {

					// if this is the first page, grab the session id and increment the count
					if (page == 0) session_id = res.session_id;
					page++;
					
					// loop this function
					get_profiles();
					
				}
				// else export the results
				else if (results && results.length > 0) {
					console.log("%s profiles found", all_results.length);
					cb(all_results);							
				}
				// else no results
				else return false;									
			
			}
		  
		});
	
	}
}