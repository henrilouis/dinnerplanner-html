//OverViewController Object constructor
var OverViewController = function(view, model ) {

	view.printButton.click(function(){
		window.stage("preparationView");
	});

	view.backButton.click(function(){
		window.stage("selectionView");
	});

}
