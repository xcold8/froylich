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
var el_idx = 0;
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
					.isExisting('li#messaging-nav-item.nav-item--messaging span.nav-item__badge-count').then(function(res){
					//if (res !== false){
						driver
							.getText('li#messaging-nav-item.nav-item--messaging span.nav-item__badge-count').then(function(mcount){
								console.log('There are '+mcount+' new messages for '+ulist[ulist_idx].email);
								console.log('Will print them out in a bit...');
								driver
									.click('a[data-link-to="messaging"]')
									.pause(2400)
									.getElements('.msg-conversation-card h3').then(function(author){
								var alist = author;
							});
						});
					//} 
					//else {
						console.log('There are no messages, moving on to the next user...');
						ulist_idx++;
						ldin_login(ulist[ulist_idx].email);

					//}
				});
				

		});
		
	}

}
function getM(){

}

ldin_login(ulist[ulist_idx].email);