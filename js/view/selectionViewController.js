//SelectionViewController Object constructor
var SelectionViewController = function(view, model ) {
	
	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});
	
	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});

	view.confirmButton.click(function(){
		window.stage("selectionView");
	});

	view.searchDropDown.change(function()
	{
		view.updateDishes($("#category").find(":selected").text(), $('#searchInput').val());
	});

	view.searchButton.click(function()
	{
		view.updateDishes($("#category").find(":selected").text(), $('#searchInput').val());
	});

	$(view.menuBox).droppable({
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function(event, ui){
			model.addDishToMenu(ui.draggable.attr('value'));
		}
	});
<<<<<<< HEAD
<<<<<<< HEAD

	$("figure").draggable(
	{
		appendTo:"body",
		helper:"clone",
		start:function(event,ui)
		{
			$(ui.helper).addClass('ui-draggable-helper');
		}
	});
	$("figure").click(function()
	{
		if($(this).is('.ui-draggable-helper')) 
		{
        	return;
	    }
	    else
	    {
	    	window.currentDish = $(this).attr('value');
	    	window.stage("dishView");
	    }
	    
	});
=======
>>>>>>> 76f07572791366ae2a095e736a34b3cb638e86cc
=======
>>>>>>> 76f07572791366ae2a095e736a34b3cb638e86cc
}