// The view of the preparations should be created here like this : 
// https://kth-csc.mybalsamiq.com/projects/dh2641-vt14-lab4assignment-web/dinner_preparation


//PreparationView Object constructor
var PreparationView = function (container,model) 
{	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.menuBox = container.find("#menuBox");
	function updateFields3()
	{
		updateOverview();
	}

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
	var middle = $("<div id='middlebox' class='col-md-12'>");

	/*****************************************************

				Creating the middle box

	*****************************************************/

	var middleText = $("<table id='middleTable' class='table'>");
	var MyDinner = $("<h3 style='text-align:right; float:right;'>");
	var numberOfGuests = $("<span>");
	var backButton =$("<button class='btn btn-danger' id='backButton'>");
	backButton.html('Go back and edit dinner');

	middleText.append(backButton);
	middleText.append(MyDinner);

	/*****************************************************

				Creating the menu on the left

	*****************************************************/

	var menuBox = $("<table id='menuTable' class='table'>");
	var totalPrice = $("<h4>");

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
	updateMenu();

	/*****************************************************
			Creating the overview of dishes
			
	*****************************************************/
	var dishBox = $("<div>");
	var dishOverview = $("<div>");
	
	function updateOverview()
	{
		dishBox.empty();
		var menuDishes = model.getFullMenu();

		for(i=0; i<menuDishes.length; i++)
		{	
			
			var ingredients = [];
			var figure = $("<figure value="+menuDishes[i].id+">");
			var dishName =(menuDishes[i].name);
			var dishNameBox = $("<h3>");
			var descriptionBox = $("<div>");
			var dishImage = $("<div>");
			var dishDescription = menuDishes[i].description;

			ingredients = ingredients.concat(menuDishes[i].ingredients);
			figure.append("<img src='images/"+menuDishes[i].image+"'>")

			dishNameBox.append(dishName);
			dishImage.append(figure);
			descriptionBox.append(dishNameBox);
			descriptionBox.append(dishDescription);
			dishBox.append(dishImage);
			dishBox.append(descriptionBox);
			right.append(dishBox)
		}

	}
	updateOverview();

	
	/*****************************************************
		Appending everything to the right container
			
	*****************************************************/

	left.append(menuBox);

	

	middle.append(middleText);

	div.append(middle);
	div.append(left);
	div.append(right);

	container.append(div);

	this.backButton = backButton;
	this.totalPrice = totalPrice;
	this.menuBox = menuBox;
	this.MyDinner = MyDinner;
	this.middleText = middleText;
	this.updateFields3 = updateFields3;

	this.totalPrice.html("Total Price: "+model.getTotalMenuPrice());
	this.MyDinner.html("My Dinner: "+model.getNumberOfGuests()+" Guests");
	
	/*****************************************  
	      Observer implementation    

	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		this.MyDinner.html("My Dinner: "+model.getNumberOfGuests()+" Guests");
		this.totalPrice.html("Total Price: "+model.getTotalMenuPrice());

		// update the menu
		updateMenu();
		
	}
}
 
