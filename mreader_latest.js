var webdriverio = require('webdriverio');
var mproxy = '127.0.0.1';
var mport = 21300;
var options = {
		desiredCapabilities: {
	        browserName: 'chrome',
	         proxy: {
	        	proxyType:'MANUAL',
	        	httpProxy: mproxy,
	        	httpsProxy: mproxy,
	        	sslProxy: mproxy,
	        }

	    }
	};

var driver = webdriverio.remote(options);
var ulist_idx = 0;
var urls_idx = 0;
var messages = [{
	timestamp: '',
	author: '',
	jobtitle: '',
	mcont: '',
}];
var ulist = [{
	email: 'nbvn564hg@gmail.com',
	pass: 'Iag1zXDaoH',
	proxy: '204.77.12.40:21300',
},
{
	email: 'nickievandiver176@gmail.com',
	pass: 'VqFWKGVYXb',
	proxy: '104.200.230.120:21277',
},
{
	email: 'lillielillie09@gmail.com',
	pass: 'ivjhQTIs4l',
	proxy: '192.3.249.211:21283',
},
{
	email:'ss5201747vhg@gmail.com',
	pass: 'dJBfZYlbqS',
	proxy: '104.160.243.250:21255',
},
{
	email:'garsok851@gmail.com',
	pass:'0pvjNxE9TO',
	proxy: '204.77.12.160:21268',
}];

function ldin_login(email){
	if (ulist_idx >= ulist.length){
		console.log('Finished, no more items on the list');
	}
	else {
		mproxy = ulist[ulist_idx].proxy;
		options = {
			desiredCapabilities: {
		        browserName: 'chrome',
		         proxy: {
		        	proxyType:'MANUAL',
		        	httpProxy: mproxy,
		        	httpsProxy: mproxy,
		        	sslProxy: mproxy,
		        }

		    }
		};

		driver = webdriverio.remote(options);
		console.log('Loaded proxy for'+' '+ulist[ulist_idx].email);
		console.log('On'+' '+ulist[ulist_idx].proxy);
		driver.init()
			.then(function(){
				console.log('starting driver...');
				driver
					.pause(3500)
					.url('http://www.linkedin.com')
					.pause(3000)
					.setValue('#login-email', ulist[ulist_idx].email)
					.pause(3000)
					.setValue('#login-password', ulist[ulist_idx].pass)
					.pause(2200)
					.click('#login-submit')
					.pause(4300)
					.click('a[data-link-to="messaging"]')
					.pause(2400)
					.isExisting('.msg-conversation-listitem--unread a').then(function(status){
						if (status !== true){
							console.log('There are no new messages for '+ulist[ulist_idx].email+' Moving on');
							ulist_idx++;
							urls =[];
							ldin_login(ulist[ulist_idx].email);
						}
						else if (status === true){
							driver
								.getAttribute('.msg-conversation-listitem--unread a', 'href').then(function(urls){ 
									if (typeof urls != 'object'){
										urls = [urls];
											if (urls_idx >= urls.length){
												console.log('Done cycling through '+ulist[ulist_idx].email+' messages, '+'Moving on');
												ulist_idx++;
												urls = [];
												messages = [{timestamp: '', author: '', jobtitle: '', mcont: '',}];
												return ldin_login(ulist[ulist_idx].email);
											} else {
												layMess(urls[urls_idx], function cb(results){
													if (urls_idx >= urls.length){
														console.log('Done cycling through '+ulist[ulist_idx].email+' messages, '+'Moving on');
														ulist_idx++;
														urls_idx = 0;
														messages = [{timestamp: '', author: '', jobtitle: '', mcont: '',}];
														return ldin_login(ulist[ulist_idx].email);														
													} else {
														console.log('-----Next message-----');
														urls_idx++;
														layMess(urls[urls_idx], cb);														
													}

												});

											}
									}
									else {
										if (urls_idx >= urls.length){
											console.log('Done cycling through '+ulist[ulist_idx].email+' messages, '+'Moving on');
											ulist_idx++;
											urls = [];
											messages = [{timestamp: '', author: '', jobtitle: '', mcont: '',}];
											return ldin_login(ulist[ulist_idx].email);
										} else {
											layMess(urls[urls_idx], function cb(results){
												if (urls_idx >= urls.length){
													console.log('Done cycling through '+ulist[ulist_idx].email+' messages, '+'Moving on');
													ulist_idx++;
													urls_idx = 0;
													messages = [{timestamp: '', author: '', jobtitle: '', mcont: '',}];
													return ldin_login(ulist[ulist_idx].email);
												} else {
													console.log('-----Next message-----');
													urls_idx++;
													layMess(urls[urls_idx], cb);
												}
											});

										}										
									}

							  });
						} 
					});

		    }); 
		
	}

}
function layMess(mUrl, callback){
	isSpons(mUrl, function(result){
		if (result !== true){
				driver
					.pause(3500)
					.getText('dd.msg-entity-lockup__entity-info').then(function(jobtitle){
					 	messages.jobtitle = jobtitle;
					 	console.log(messages.jobtitle);
						driver
							.pause(4424)
							.getText('.msg-s-message-listitem p').then(function(mcont){
							messages.mcont = mcont;
							console.log(messages.mcont);
							driver
								.getText('.msg-s-message-list__time-heading').then(function(timestamp){
								 messages.timestamp = timestamp;
								 console.log(timestamp);
								 callback(messages);

								});
									
							});
				  		
					});

			}
			else if (result === true) {
				driver
					.pause(3650)
					.getText('.msg-spinmail-thread__message-body').then(function(mcont){
						messages.mcont = mcont;
						driver
							.getText('.msg-entity-lockup__entity-title').then(function(author){
								console.log('From: '+author);
								console.log('------------Starting msg body-----------');
								console.log(mcont);
								console.log('------------End of msg body-------------');
								console.log('There is no timestamp for sponsored messages');
								messages.author = author;
								callback(messages);
							});

					});
			}
	});
}

function isSpons(site, callback){
	driver
		.pause(4000)
		.url(site)
		.pause(3400)
		.isExisting('.sponsored-label').then(function(res){
			if (res !== true){
				console.log('This is not a sponsored message');
				callback(res);
			}
			else if (res === true) {
				console.log('This is a sponsored message');
				callback(res);
			}

		});

}

ldin_login(ulist[ulist_idx].email);