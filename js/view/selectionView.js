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
	
	//div we just store in temporary variable because we won't need it later
	var div = $("<div class='row'>");
	var left = $("<div class='col-md-2'>");
	var right = $("<div class='col-md-10'>");

	var peopleBox = $("<div>");
	var plusButton = $("<button class='btn'");
	var minusButton = $("<button class='btn'");
	var numberOfGuests = $("<span>");
	var menuBox = $("<table class='table table-striped'>");
	var confirmButton = $("<button class='btn'>");

	var searchBox = $("<div>");
	var searchInput = $("<input type='search'>");
	var searchButton = $("<button class='btn'>");
	var searchDropDopwn = $("<select>");
	var dishBox = $("<div>");

	peopleBox.html("<h3>My Dinner</h3>");
	peopleBox.append(minusButton);
	peopleBox.append(numberOfGuests);
	peopleBox.append(plusButton);

	menuBox.append("<tr><td>Dish Name</td><td>Cost</td></tr>");
	menuBox.append("<tr><td></td><td>SEK 0.00</td></tr>");
	menuBox.append(confirmButton);
	
	searchBox.html('SELECT DISH');
	searchBox.append(searchInput);
	searchBox.append(searchButton);
	searchDropDown.append("<option>Starter</option><option>Main</option><option>Dessert</option>");
	searchBox.append(searchDropDown);

	left.append(peoplebox);
	left.append(menubox);

	right.append(searchBox);

	div.append(left);
	div.append(right);

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
	}
}
 
