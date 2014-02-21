$(function() {

	if(window.location.href.indexOf("index.html") > -1) 
	{
		
		//Hiding the windows on start and only showing the landing page
		$("#dishView, #overView, #preparationView, #selectionView").hide();
		$("#landingView").show();

		//The global variable so we can access it from other controller and views
		window.stage = function(value)
		{
			switch(value)
	   		{
		   		case "landingView":
		   			$("#dishView, #overView, #preparationView, #selectionView").hide();
		   			$("#landingView").show();
		   			break;

		   		case "dishView":
		   			$("#landingView, #overView, #preparationView, #selectionView").hide();
		   			$("#dishView").show();
		   			break;

		   		case "overView":
		   			$("#dishView, #landingView, #preparationView, #selectionView").hide();
		   			$("#overView").show();
		   			break;

		   		case "preparationView":
		   			$("#dishView, #overView, #landingView, #selectionView").hide();
		   			$("#preparationView").show();
		   			break;

		   		case "selectionView":
		   			$("#dishView, #overView, #preparationView, #landingView").hide();
		   			$("#selectionView").show();
		   			break;
	   		}
		}

	}
	
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
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