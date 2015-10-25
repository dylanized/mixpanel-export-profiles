# mixpanel-export-profiles

Exports Mixpanel profiles filtered by 1 parameter

Usage:

```

var MixpanelProfiles = require('mixpanel-export-profiles');

var config = {
	"key": "xxx",
	"secret": "xxx"
};

var profiles = new MixpanelProfiles(config);

profiles.get("$email", "d@dylanized.com", function(result) {

	if (typeof result == "array" && result.length > 0) {
		
		// do stuff	
		console.log(result);
		
	} else console.log(result);

});



```
