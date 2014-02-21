// The view of the dish should be created here like this : 
// https://kth-csc.mybalsamiq.com/projects/dh2641-vt14-lab4assignment-web/lasagne

//DishView Object constructor
var DishView = function (container,model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	
	function updateFields()
	{
		dish = model.getDish(window.currentDish);
		updateDish();
		updateIngredients();
	}

	var div = $("<div class='row'>");
	var left = $("<div id='leftbox' class='col-md-3'>");
	var right = $("<div id='rightbox' class='col-md-9'>");
	var right_left = $("<div class='col-md-6'>");
	var right_right = $("<div class='col-md-6'>");


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
	var dish = model.getDish(window.currentDish);
	
	minusButton.html('<span class="glyphicon glyphicon-minus"></span>');
	plusButton.html('<span class="glyphicon glyphicon-plus"></span>')
	peopleBox.html("<h3>My Dinner</h3>");
	peopleBox.append(minusButton);
	peopleBox.append(numberOfGuests);
	peopleBox.append(plusButton);

	confirmButton.html("Confirm Dinner");
	confirmButtonContainer.append(confirmButton);
	menuBox.append("<tr><td><b>Dish Name</b></td><td><b>Cost</b></td></tr>");

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

	/*****************************************  
	      Append items to left  
	*****************************************/

	left.append(peopleBox);
	left.append(menuBox);
	left.append(confirmButtonContainer);


	/*****************************************************

				Creating the middle box

	*****************************************************/

	/*****************************************  
	      Creating dish overview   

	*****************************************/
	
	var dishOverview = $("<div>");
	var backtoSelect = $("<button id='backtoSelect' class='btn btn-success'>");
	var backtoSelectContainer = $("<div>")
	
	function updateDish()
	{
	var dishName =(dish.name);
	var dishNameBox = $("<h3>")
	var dishImage = $("<figure value="+dish.id+">");
	var dishImageBox = $("<div class='overviewrow'>")
	var dishDescription = dish.description;
	var dishDescriptionBox = $("<div class='textbox'>")

	dishNameBox.append(dishName);
	dishImage.append("<img src='images/"+dish.image+"'>")
	dishImageBox.append(dishImage);
	dishDescriptionBox.append(dishDescription);
	dishOverview.html(dishNameBox);
	dishOverview.append(dishImageBox);
	dishOverview.append(dishDescriptionBox);
	backtoSelect.html("Back to Select Dish");
	backtoSelectContainer.append(backtoSelect);
	}
	right_left.append(dishOverview);
	right_left.append(backtoSelectContainer);

	/*****************************************  
	      Creating dish ingredients

	*****************************************/

	var ingredientHeading = $("<h4>");
	var ingredientBox = $("<table id='menuTable' class='table'>");
	var confirmDishButton = $("<button class='btn btn-success'>");
	var confirmDishButtonContainer = $("<div>");
	var dishcost = $("<div class='righttext' style='padding-right:60px;'>");

	right_right.append(ingredientHeading);
	ingredientBox.append("<tr><td>Ingredient Name</td><td>Amount</td><td>Cost</td></tr>");

	right_right.append(ingredientBox);
	confirmDishButton.html("Confirm Dish");
	confirmDishButtonContainer.append(confirmDishButton);
	
	function updateIngredients(){
		ingredientHeading.html("Ingredients for "+ model.getNumberOfGuests() +" people");
		var totalDishCost = 0;
		
		$(ingredientBox).find("tr:gt(0)").remove();

		for(i = 0; i < dish.ingredients.length; i++)
		{
			var amount = 0;
			var unit = $("<p>");
			var cost = 0;
			
			amount  = parseFloat(dish.ingredients[i].quantity) * model.getNumberOfGuests();
			amount = +amount.toFixed(2);
			unit = (dish.ingredients[i].unit);
			cost = parseFloat((dish.ingredients[i].price) * model.getNumberOfGuests()).toFixed(0);
			totalDishCost += dish.ingredients[i].price * model.getNumberOfGuests();
			ingredientBox.append("<tr><td>"+dish.ingredients[i].name+"</td><td>"+amount+unit+"</td><td>"+cost+"</td></tr>");
			dishcost.html("Total Cost: "+ totalDishCost);
		}
	}
	right_right.append(dishcost);
	right_right.append(confirmDishButtonContainer);
	

	/*****************************************  
	      Append items to right  
	*****************************************/
	right.append(right_left);
	right.append(right_right);
	

	/*****************************************  
	      Append all items to container
	      Bind items

	*****************************************/

	div.append(left);
	div.append(right);
	container.append(div);

	this.plusButton = plusButton;
	this.minusButton = minusButton;
	this.confirmButton = confirmButton;
	this.numberOfGuests = numberOfGuests;
	this.totalPrice = totalPrice;

	this.backtoSelect = backtoSelect;
	this.confirmDishButton = confirmDishButton;

	this.numberOfGuests.html(model.getNumberOfGuests()+" Guests");
	this.totalPrice.html("Total Price: "+model.getTotalMenuPrice());
	this.updateFields = updateFields;
	


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
		
		// update ingredients
		updateIngredients();
	}
}
 
