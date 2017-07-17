var webdriverio = require('webdriverio');
var options = {
		desiredCapabilities: {
	        browserName: 'chrome',
	    }
	};
var driver = webdriverio.remote(options);
var username = 'gamibt120@gmail.com';
var password = 'xmen4ever';
var recp = 'jimlogan120@gmail.com';
var recp_fname = 'Jim';
var subject_phrase = 'Hello '+recp_fname+', We got a special offer for you';
var body_phrase = 'Lorum ipsum';


		driver.init()
			.then(function(){
				console.log('starting driver...');
				driver
					.pause(3500)
					.url('http://www.gmail.com')
					.pause(3000)
					.setValue('input#identifierId', username)
					.pause(3000)
					.click('#identifierNext')
					.pause(2200)
					.click('input[type="password"]')
					.pause(2123)
					.setValue('input[type="password"]', password)
					.pause(3210)
					.click('div#passwordNext')
					.pause(4300)
					.click('div[gh=cm]')
					.pause(3216)
					.click('textarea[name="to"]')
					.pause(1000)
					.setValue('textarea[name="to"]', recp)
					.pause(2300)
					.click('input[placeholder="Subject"]')
					.pause(1100)
					.setValue('input[placeholder="Subject"]', subject_phrase)
					.pause(1111)
					.setValue('div[aria-label="Message Body"]', body_phrase)
					.pause(5000)
					.click('div[data-tooltip="Send ‪(⌘Enter)‬"]')
					.pause(2000)
					.end();
		    }); 
	