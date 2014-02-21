// The view of the mnain selection should be created here like this : 
// https://kth-csc.mybalsamiq.com/projects/dh2641-vt14-lab4assignment-web/select%20dish


//SelectionView Object constructor
var SelectionView = function (container,model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	
	//Creating the components dynamically. Here we create the following HTML content:
	//
	//<div class="row">
	//  Total menu price <span id="totalPrice"></span>
	//</div>
	//
	//and add it to the the SelectionView 
	
	// Create the main container variables

	var div = $("<div class='row'>");
	var left = $("<div id='leftbox' class='col-md-3'>");
	var right = $("<div id='rightbox' class='col-md-9'>");

	/*****************************************************

				Creating the menu on the left

	*****************************************************/

	var peopleBox = $("<div class='centertext'>");
	var plusButton = $("<button id='plusGuests' class='btn btn-info'>");
	var minusButton = $("<button id='minusGuests' class='btn btn-info'>");
	var numberOfGuests = $("<span>");
	var menuBox = $("<table id='menuTable' class='table'>");
	var totalPrice = $("<h4>");
	var confirmButton = $("<button class='btn btn-success'>");
	var confirmButtonContainer = $("<div class='centertext'>");

	minusButton.html('<span class="glyphicon glyphicon-minus"></span>');
	plusButton.html('<span class="glyphicon glyphicon-plus"></span>')
	peopleBox.html("<h3>My Dinner</h3>");
	peopleBox.append(minusButton);
	peopleBox.append(numberOfGuests);
	peopleBox.append(plusButton);

	confirmButton.html("Confirm Dinner");
	confirmButtonContainer.append(confirmButton);
	menuBox.append("<tr><td>Dish Name</td><td>Cost</td></tr>");

	updateMenu();

	menuBox.append(totalPrice);

	function updateMenu()
	{
		$(menuBox).find("tr:gt(0)").remove();
		var menuDishes = model.getFullMenu();

		for(i=0; i<menuDishes.length; i++)
		{
			var ingredients = [];
			var sum = 0;
			ingredients = ingredients.concat(menuDishes[i].ingredients);
			for(k in ingredients)
			{
				sum += parseFloat(ingredients[k].price) * model.getNumberOfGuests();
			}
			menuBox.append("<tr><td>"+menuDishes[i]['name']+"</td><td>"+sum+"</td></tr>");
		}
	}
	
	/*****************************************************
			Creating the dish search box

	*****************************************************/

	var searchBox = $("<div>");
	var searchInnerBox = $("<div>");
	var searchInput = $("<input type='search' id='searchInput'>");
	var searchButton = $("<button class='btn btn-info'>");
	var searchDropDown = $("<select id='category'>");

	searchBox.html('<h3>Select Dish</h3>');
	searchDropDown.append("<option>starter</option><option>main dish</option><option>dessert</option>");
	searchButton.html('Search');

	searchInnerBox.append(searchInput);
	searchInnerBox.append(searchButton);
	searchInnerBox.append(searchDropDown);
	searchBox.append(searchInnerBox);

	/*****************************************************
			Creating the overview of dishes
			
	*****************************************************/
	var dishBox = $("<div>");

	
	this.updateDishes = function updateDishes(type,string)
	{
		dishBox.empty();
		if(!type)
		{
			type = "starter";
		}

		var dishes = model.getAllDishes(type,string);
		var row = $("<div>");

		for(i = 0; i < dishes.length; i++)
		{
			
			var figure = $("<figure value="+dishes[i].id+">");
			var caption = $("<figcaption>");

			figure.append("<img src='images/"+dishes[i].image+"'>")
			caption.html(dishes[i].name);

			figure.append(caption);

			// Making the stuff draggable
			$(figure).draggable({
				appendTo:"body",
				helper:"clone",
				start:function(event,ui)
				{
					$(ui.helper).addClass('ui-draggable-helper');
				}
			});
			row.append(figure);
		}

		dishBox.append(row);
	}

	this.updateDishes();

	/*****************************************************
		Appending everything to the right container
			
	*****************************************************/

	left.append(peopleBox);
	left.append(menuBox);
	left.append(confirmButtonContainer);

	right.append(searchBox);
	right.append(dishBox);

	div.append(left);
	div.append(right);

	container.append(div);

	this.plusButton = plusButton;
	this.minusButton = minusButton;
	this.confirmButton = confirmButton;
	this.numberOfGuests = numberOfGuests;
	this.totalPrice = totalPrice;
	this.searchDropDown = searchDropDown;
	this.searchButton = searchButton;
	this.menuBox = menuBox;

	this.numberOfGuests.html(model.getNumberOfGuests()+" Guests");
	this.totalPrice.html("Total Price: "+model.getTotalMenuPrice());
	
	/*****************************************  
	      Observer implementation    

	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		this.numberOfGuests.html(model.getNumberOfGuests()+" Guests");
		this.totalPrice.html("Total Price: "+model.getTotalMenuPrice());

		// update the menu
		updateMenu();
		
	}

}
 
