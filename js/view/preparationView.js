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
	var right = $("<div id='rightbox' class='col-md-12'>");
	var middle = $("<div id='middlebox' class='col-md-12'>");

	/*****************************************************

				Creating the middle box

	*****************************************************/

	var middleText = $("<table id='middleTable' class='table'>");
	var MyDinner = $("<h3 style='text-align:right; float:right;'>");
	var backButton =$("<button class='btn btn-danger' id='backButton'>");
	backButton.html('Go back and edit dinner');

	middleText.append(backButton);
	middleText.append(MyDinner);

	
	/*****************************************************
			Creating the overview of dishes
			
	*****************************************************/
	var dishBox = $("<div>");
	var dishOverview = $("<div class =  'overviewtable'>");
	
	function updateOverview()
	{
		dishBox.empty();
		var menuDishes = model.getFullMenu();

		for(i=0; i<menuDishes.length; i++)
		{	
			
			var dishImage = $("<div>");
			var figure = $("<figure value="+menuDishes[i].id+">");
			var dishName =(menuDishes[i].name);
			var dishNameBox = $("<h3>");
			var dishDescription = menuDishes[i].description;
			var descriptionBox = $("<div class =  'overviewrow'>");
			
			figure.append("<img src='images/"+menuDishes[i].image+"'>")

			dishNameBox.append(dishName);
			dishImage.append(figure);
			descriptionBox.append(dishImage);
			descriptionBox.append(dishNameBox);
			descriptionBox.append(dishDescription);
			dishBox.append(descriptionBox);
			right.append(dishBox)
		}

	}
	updateOverview();

	
	/*****************************************************
		Appending everything to the right container
			
	*****************************************************/

	middle.append(middleText);

	div.append(middle);
	div.append(right);

	container.append(div);

	this.backButton = backButton;
	this.MyDinner = MyDinner;
	this.middleText = middleText;
	this.updateFields3 = updateFields3;


		/*****************************************  
	      Observer implementation    

	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
	}
}
 
