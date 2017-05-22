var webdriverio = require('webdriverio');
var jquery = require('jquery');


var options = {
		desiredCapabilities: {
	        browserName: 'chrome',
	    }
	};

var driver = webdriverio.remote(options);
console.log('starting...');
var list = ['anthonychye@ymail.com', 'tpcruisin@gmail.com', 'pierpaolore@gmail.com', 'lelesansone@inwind.it', 'pierfrancesco.cardillo@e-geos.it', 'pp.murabito@gmail.com', 'piergiorgio75@gmail.com', 'trevisanmoore@alice.it', 'P.Leoni@stf.it', 'pier_scotti@yahoo.it', 'pierluigi.tosarelli@gmail.com'];
var listIdx = 0;
var url_idx = 0;


/* Given a list of keywords, looping through each one by its index and pass them on 
to getSocialUrl function, it has to be one keyword at a time!!!! */

function main(){
	if (listIdx >= list.length){
		driver.end();
		console.log('DONE');
		return;
	} 
	else {
			getSocialUrl(list[listIdx], function(results){
				var isArray = (typeof results != 'string');
				if (!isArray){
					results = [results];
				}
				isFborLn(results, function(vUrls){
						if (vUrls.length !== 0){
							console.log('Getting the info from a single url or a few');
									navAndGrab(vUrls[url_idx], function cb(tagdata){
										console.log('-----starting navAndGrab-----');
										console.log('start index '+ ' ' + url_idx);
										console.log('url length' + ' ' + vUrls.length);
										if (url_idx >= vUrls.length){
											console.log('Got the entire data for '+list[listIdx]);
											console.log('Moving on to the next user');
											url_idx = 0;
											listIdx++;
											return main();
										}
										else {
											console.log('Printing results for '+vUrls[url_idx]);
											console.log('Text (title/H1): '+tagdata);
											url_idx++;
											navAndGrab(vUrls[url_idx],cb(tagdata));
										}

								});
						}
						else {
							console.log('No results, moving on');
							listIdx++;
							main();
						}

					});			
				
		}); 
	}
}


function isFborLn(url, callback){
	if (url.length !== 0){
		var vUrlsArr = [];
		console.log('checking if social urls... for '+list[listIdx]);
		if (typeof url === "object"){
			console.log('Scanning for social urls...');
			for (var i=0; i < url.length; i++){
				if (url[i].indexOf('.facebook.com') !== -1 || url[i].indexOf('.linkedin.com') !== -1){
					console.log('Saving... '+url[i]);
					vUrlsArr.push(url[i]);
				}
				else {
					console.log('Result #'+i+' is not a social url');
				}
			}
		}
		else {
			console.log('Seems like there are no additional social urls for this user, moving on');
			url_idx = 0;
			listIdx++;
			return main();
		}
		callback(vUrlsArr);
		console.log(vUrlsArr);
	}
}
function navAndGrab(website, callback){
	if (website.length !== 0){
			driver
				.url(website)
				.pause(3500)
				.isExisting('h1').then(function(res){
					if (res !== true){
						console.log('Could not find H1 tag, getting title instead');
						driver
							.getTitle().then(function(ttl){
								console.log(ttl);
								callback(ttl);
							});
					}

					else if (res === true) {
						driver
							.getText('h1').then(function(dat){
								console.log('H1 tag detected for '+website);
								callback(dat);
							});
					}
				});
	} 
	else {
		console.log('seems that there are no more urls for '+list[listIdx]);
		console.log('moving on...');
		listIdx++;
		return main();


	}
			}

/* Typing a single keyword from the list in Google and then pressing on the
search button, then getting the facebook urls
this happens recursively until it reaches the last index */

function getSocialUrl(email, callback){
	driver
		.url('http://www.google.com')
		.pause(3500)
		.setValue('#lst-ib', email)
		.pause(3500)
		.click('button[value="Search"]')
		.pause(4000)
		.getText('#res div[style] cite')
		.then(function(urls){
			callback(urls);
		});
		
}

driver
	.init()
	.then(function(){
		console.log('driver initiated - starting.');
		main();
	});