$(function() {
	//The global variable so we can access it from other controller and views
	window.stage = "starter";
	
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"),model);
   	var exampleViewController = new ExampleViewController(exampleView,model);

   	var dishView = new DishView($("#dishView"),model);
   	var dishViewController = new DishViewController(dishView,model);

   	var landingView = new LandingView($("#landingView"),model);
   	var landingViewController = new LandingViewController(landingView,model);

   	var overView = new OverView($("#overView"),model);
   	var overViewController = new OverViewController(overView,model);

   	var preparationView = new PreparationView($("#preparationView"),model);
   	var preparationViewController = new PreparationViewController(preparationView,model);

   	var selectionView = new SelectionView($("#selectionView"),model);
   	var selectionViewController = new SelectionViewController(selectionView,model);
});