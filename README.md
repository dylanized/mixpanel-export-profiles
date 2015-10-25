# mixpanel-export-profiles

Exports Mixpanel profiles filtered by 1 parameter

Usage:

```

var mixpanelExportProfiles = require('mixpanel-export-profiles');

mixpanelExportProfiles("$email", "d@dylanized.com", function(profiles) {

	if (typeof profiles == "array" and profiles.length > 0) {
	
		console.log(profiles);
		
	} else console.log(profiles);

});


```
