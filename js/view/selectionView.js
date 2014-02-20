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
	var left = $("<div class='col-md-2'>");
	var right = $("<div class='col-md-10'>");

	/*****************************************************

				Creating the menu on the left

	*****************************************************/

	var peopleBox = $("<div>");
	var plusButton = $("<button class='btn'>");
	var minusButton = $("<button class='btn'>");
	var numberOfGuests = $("<span>");
	var menuBox = $("<table class='table table-striped'>");
	var totalPrice = $("<h4>");
	var confirmButton = $("<button class='btn'>");

	minusButton.html('<span class="glyphicon glyphicon-minus"></span>');
	plusButton.html('<span class="glyphicon glyphicon-plus"></span>')
	peopleBox.html("<h3>My Dinner</h3>");
	peopleBox.append(minusButton);
	peopleBox.append(numberOfGuests);
	peopleBox.append(plusButton);

	confirmButton.html("Confirm Dinner");
	menuBox.append("<tr><td>Dish Name</td><td>Cost</td></tr>");

	updateMenu();

	menuBox.append(totalPrice);
	menuBox.append(confirmButton);

	function updateMenu()
	{
		$(menuBox).find("tr:gt(0)").remove();
		var menuDishes = model.getFullMenu();
		for(key in menuDishes)
		{
			var ingredients = [];
			var sum = 0;
			ingredients = ingredients.concat(menuDishes[key].ingredients);
			for(k in ingredients)
			{
				sum += parseFloat(ingredients[k].price) * model.getNumberOfGuests();
			}
			menuBox.append("<tr><td>"+menuDishes[key]['name']+"</td><td>"+sum+"</td></tr>");
		}
	}
	
	/*****************************************************

			Creating the dish search box

	*****************************************************/

	var searchBox = $("<div>");
	var searchInnerBox = $("<div class='row'>");
	var searchInput = $("<input type='search'>");
	var searchButton = $("<button class='btn'>");
	var searchDropDown = $("<select id='category'>");

	searchBox.html('<h3>Select Dish</h3>');
	searchDropDown.append("<option>Starter</option><option>Main</option><option>Dessert</option>");
	searchButton.html('Search');

	searchInnerBox.append(searchInput);
	searchInnerBox.append(searchButton);
	searchInnerBox.append(searchDropDown);
	searchBox.append(searchInnerBox);


	/*****************************************************

			Creating the overview of dishes
			
	*****************************************************/
	var dishBox = $("<div>");
	var option = "starter";
	//var option = $("#category").find(":selected").text();

	updateDishes();
	function updateDishes()
	{
		var dishes = model.getAllDishes(option);
		var row = $("<div class='row'>");

		for(i = 0; i < dishes.length; i++)
		{
			

			var figure = $("<figure class='col-md-2'>");
			var caption = $("<figcaption>");

			figure.append("<img src='images/"+dishes[i]['image']+"'>")
			caption.html(dishes[i].name);

			figure.append('caption');

			row.append(figure);
		}
		
		dishBox.append(row);
	}

	/*****************************************************

		Appending everything to the right container
			
	*****************************************************/

	left.append(peopleBox);
	left.append(menuBox);

	right.append(searchBox);
	right.append(dishBox);

	div.append(left);
	div.append(right);

	container.append(div);

	this.plusButton = plusButton;
	this.minusButton = minusButton;
	this.numberOfGuests = numberOfGuests;
	this.totalPrice = totalPrice;
	/*
	//we set the constant text
	div.html("Total menu price ");
	//and we add the text-primary class to make it blue
	div.addClass("text-primary");
	//total price we store in object variable (using this) so we can access it later
	this.totalPrice = $("<span>");
	//we set the id of the total price span
	this.totalPrice.attr("id","totalPrice");
	//we add total price span to the div
	div.append(this.totalPrice);
	//finally we add the div to the view container
	container.append(div);
	
	//Set the inital values of the components
	this.numberOfGuests.html(model.getNumberOfGuests());
	this.totalPrice.html(model.getTotalMenuPrice());

	*/
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		this.numberOfGuests.html(model.getNumberOfGuests());
		this.totalPrice.html(model.getTotalMenuPrice());
		updateMenu();
	}
}
 
