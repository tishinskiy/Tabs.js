;(function(){
	'use strict'

	function func1(){
		return console.log('Function 1')
	}

	function func2(){
		console.log('Function 2')
	}
	function func(){
		console.log('Function for ALL')
	}

	console.log('script');
		$('#tabs').createTabs({
			actions:{
				'ALL': func,
				'tab_2a':func1,
				'tab_3a':func2,
			}
		});
		$('#tabs_2').createTabs();
})();