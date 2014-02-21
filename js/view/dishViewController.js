//DishViewController Object constructor
var DishViewController = function(view, model ) {
	
	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});
	
	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});

	view.backtoSelect.click(function(){
		window.stage("selectionView");
	});

	view.confirmButton.click(function(){
		window.stage("selectionView");
	});

	view.confirmDishButton.click(function(){
		model.addDishToMenu(window.currentDish);
		window.stage("selectionView");
	});




	
}
