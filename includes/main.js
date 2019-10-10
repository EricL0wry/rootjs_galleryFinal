$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp(){

	// If localStorage has an item 'pictures', parse the JSON and overwrite pictures array
	if(localStorage.getItem('pictures') !== null){
		var retrievedArray = localStorage.getItem('pictures');
		pictures = JSON.parse(retrievedArray);
		}

	// Calls function to create the image gallery, passes in the pictures array
	makeGallery(pictures);
	// Apply click handler to figure children of #gallery, call display image function
	$('#gallery').on('click', 'figure.imageGallery', displayImage);
	// Apply click handler to modal, call addModalCloseHandler function
	$('.modal').on('click', addModalCloseHandler);
	// Apply jQueryUI sortable to gallery
	$('#gallery').sortable({
		update: function(){
			// Declare variable, select gallery, use "toArray" to return array of element IDs
			var updatedArray = $('#gallery').sortable('toArray');
			// Loop through updated array, format IDs into filenames
			for(var i = 0; i < updatedArray.length; i++){
				updatedArray[i] = 'images/' + updatedArray[i] + '.jpg';
			}
			// Updates pictures array with new order, saves to localStorage as JSON
			pictures = updatedArray;
			localStorage.setItem("pictures", JSON.stringify(pictures));
		}
	});
}

// Takes in images array, creates gallery
function makeGallery(imageArray){
	// Loop through array of photos
	for(var i=0; i < imageArray.length; i++){
		// Form variables to extract just the file name from the array items
		var period = imageArray[i].lastIndexOf(".");  // Finds number of the period
		var fileName = imageArray[i].substring(7, period);  // Extracts substring between character 7 and the character number of the period
		// Set html variables for dynamically created elements
		var figure = $('<figure id="' + fileName + '" class="imageGallery col-xs-12 col-sm-6 col-md-4"></figure>').css('background-image', 'url(' + imageArray[i] + ')');
		var figCaption = $('<figcaption>' + fileName + '</figcaption>');
		var fullFigure = figure.append(figCaption);
		// Appends html for each index item to the gallery ID
		$('#gallery').append(fullFigure);

	}
}

// Activated by click handler, selects and hides modal
function addModalCloseHandler(){
	$('.modal').modal('hide');
}

// Triggered by click handler on the figure, formats file name and modal title, opens modal
function displayImage(){
	// Declare variable, set it to the css background-image source
	var fullUrl = ($(this).css("background-image"));
	// Find the number of the character before and after the section of the src that we want to extract
	var urlStart = fullUrl.lastIndexOf('image');
	var urlEnd = fullUrl.lastIndexOf('"');
	// Extract the filename from the src string
	var url = fullUrl.substring(urlStart, urlEnd);
	// Extract the text from the figure (file name minus .jpg)
	var name = $(this).text();
	// Change the modal title to the name of the file
	$('.modal-title').text(name);
	// Change the src of the clicked figure to the modal body
	$('.modal-body').html('<img src="' + url +'">');
	// Open the modal with the updated html
	$('.modal').modal();
}
