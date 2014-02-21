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
		updateOverview();
	}
	
	var div = $("<div class='row'>");
	var left = $("<div id='leftbox' class='col-md-3'>");
	var right = $("<div id='rightbox' class='col-md-9'>");
	var middle = $("<div id='middlebox' class='col-md-12'>");

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

	/*****************************************  
	      Append items to left  
	*****************************************/
	left.append(menuBox);
	left.append(printButtonContainer);


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

	
	/*****************************************  
	      Append items to middle  
	*****************************************/
	middle.append(middleText);


	/*****************************************************

				Creating the right box

	*****************************************************/

	/*****************************************************
			Creating the overview of dishes
			
	*****************************************************/
	var dishBox = $("<div>");

	function updateOverview()
	{
		dishBox.empty();
		var menuDishes = model.getFullMenu();

		for(i=0; i<menuDishes.length; i++)
		{	
			var ingredients = [];
			var dishImage = $("<figure value="+menuDishes[i].id+">");
			var caption = $("<figcaption>");
			var sum = 0;

			ingredients = ingredients.concat(menuDishes[i].ingredients);
			dishImage.append("<img src='images/"+menuDishes[i].image+"'>")
			caption.html(menuDishes[i].name);
			/*
			for(k in ingredients)
			{
				sum += parseFloat(ingredients[k].price) * model.getNumberOfGuests();
			}
			figure.append(sum);
			*/
			dishImage.append(caption);
			dishBox.append(dishImage);
			
		}

	}
	updateOverview();
	/*****************************************  
	      Append items to right  
	*****************************************/
	right.append(dishBox)


	/*****************************************  
	      Append all items to container
	      Bind items

	*****************************************/
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
 
