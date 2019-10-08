/* your javascript goes here */

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
	/*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
	*/

	makeGallery(pictures);
	addModalCloseHandler();
	$('#gallery').on('click', 'figure.imageGallery', displayImage);
	$('.modal').on('click', addModalCloseHandler);
	checkStorage();
	$('#gallery').sortable({
		update: function(){
			var updatedArray = $('#gallery').sortable('toArray');
			for(var i = 0; i < updatedArray.length; i++){
				updatedArray[i] = 'images/' + updatedArray[i] + '.jpg';
			}
			pictures = updatedArray;
			localStorage.setItem("pictures", JSON.stringify(pictures));
			console.log(pictures);
		}
	});
}
function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section
	//create a loop to go through the images in the imageArray
	for(var i=0; i < imageArray.length; i++){
		var period = imageArray[i].lastIndexOf(".");
		var fileName = imageArray[i].substring(7, period);
		var figure = $('<figure id="' + fileName + '" class="imageGallery col-xs-12 col-sm-6 col-md-4"></figure>').css('background-image', 'url(' + imageArray[i] + ')');
		var figCaption = $('<figcaption>' + fileName + '</figcaption>');
		var fullFigure = figure.append(figCaption);
		$('#gallery').append(fullFigure);
	}
		//create the elements needed for each picture, store the elements in variable
		//attach a click handler to the figure you create.  call the "displayImage" function.
		//append the element to the #gallery section
	// side note: make sure to remove the hard coded html in the index.html when you are done!

}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$('.modal').modal('hide');
}

function displayImage(){
	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need
	var fullUrl = ($(this).css("background-image"));
	var urlStart = fullUrl.lastIndexOf('image');
	var urlEnd = fullUrl.lastIndexOf('"');
	var url = fullUrl.substring(urlStart, urlEnd);
	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
	// pexels-photo-132037
	//take a look at the lastIndexOf method
	var name = $(this).text();




	//change the modal-title text to the name you found above
	$('.modal-title').text(name);
	//change the src of the image in the modal to the url of the image that was clicked on
	$('.modal-body').html('<img src="' + url +'">');
	//show the modal with JS.  Check for more info here:
	$('.modal').modal();
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}

function checkStorage(){
	var retrievedArray = localStorage.getItem('pictures');
	JSON.parse(retrievedArray);
	console.log(retrievedArray);
	pictures = retrievedArray;
	// if(retrievedArray != []){

	// }
}
