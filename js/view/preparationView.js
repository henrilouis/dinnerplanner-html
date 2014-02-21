// The view of the preparations should be created here like this : 
// https://kth-csc.mybalsamiq.com/projects/dh2641-vt14-lab4assignment-web/dinner_preparation


//PreparationView Object constructor
var PreparationView = function (container,model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	var row = $("<div>");
	var div = $("<div>");
	var p = $("<P>");
	var button = $("<button>");
	var image = ("<image>");
	


    $("#numberofguest").html("My dinner: " + model.getNumberOfGuests() + "people");
    image.html


    image.addClass(img-responsive alt="Responsive image");

	button.html("Go back and edit dinner");

	row.addClass('row');
	
	
	button.addClass('btn');
	button.attr('id','GoBackEditButton');
	
	div.append(image);
	div.append(p);
	div.append(button);

	row.append(div);

	this.GoBackEditButton = button;

	container.append(row);


    //<img src="toast.jpg" class="img-responsive" alt="Responsive image">


	//this.numberOfGuests = container.find("#numberOfGuests");
	//this.plusButton = container.find("#plusGuest");
	//this.minusButton = container.find("#minusGuest");
	
	//Creating the components dynamically. Here we create the following HTML content:
	//
	//<div class="row">
	//  Total menu price <span id="totalPrice"></span>
	//</div>
	//
	//and add it to the the PreparationView 
	
	//div we just store in temporary variable because we won't need it later
	var div = $("<div>");
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
	//this.numberOfGuests.html(model.getNumberOfGuests());
	//this.totalPrice.html(model.getTotalMenuPrice());
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	//model.addObserver(this);
	
	//This function gets called when there is a change at the model
	//this.update = function(arg){
		//this.numberOfGuests.html(model.getNumberOfGuests());
		//this.totalPrice.html(model.getTotalMenuPrice());
	}
}
 
