// The view of the overview page should be created here like this : 
// https://kth-csc.mybalsamiq.com/projects/dh2641-vt14-lab4assignment-web/dinner_overview


//OverView Object constructor
var OverView = function (container,model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.menuBox = container.find("#menuBox");
		function updateFields2()
	{
		updateMenu2();
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
	var printButton = $("<button class='btn btn-success'>");
	var printButtonContainer = $("<div class='centertext'>");

	printButton.html("Print Full Recipe");
	printButtonContainer.append(printButton);
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

	function updateMenu2()
	{
		dishBox.empty();
		var menuDishes = model.getFullMenu();

		for(i=0; i<menuDishes.length; i++)
		{
			var figure = $("<figure value="+menuDishes[i].id+">");
			var caption = $("<figcaption>");

			figure.append("<img src='images/"+menuDishes[i].image+"'>")
			caption.html(menuDishes[i].name);

			figure.append(caption);
			dishBox.append(figure);
		}

	}
	updateMenu2();

	/*****************************************************
		Appending everything to the right container
			
	*****************************************************/

	left.append(menuBox);
	left.append(printButtonContainer);

	right.append(dishBox)

	middle.append(middleText);

	div.append(middle);
	div.append(left);
	div.append(right);

	container.append(div);

	this.printButton = printButton;
	this.backButton = backButton;
	this.totalPrice = totalPrice;
	this.menuBox = menuBox;
	this.MyDinner = MyDinner;
	this.middleText = middleText;
		this.updateFields2 = updateFields2;

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
 
