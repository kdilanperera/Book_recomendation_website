var priceList = [];


//Create List of cart
var cart = [];
const classNames = document.querySelectorAll(".addToCart");

for (let i = 0; i < classNames.length; i++) {
  classNames[i].addEventListener("click", function() {
    cart.push(classNames[i].value);
  });
}

//Bookmark toggling
var bookmarkList = [];
function addBookmark(){
	document.getElementById("bookmark").src = "Images/bookmarkafter.png";
	bookmarkList.push(document.getElementById("bookmark").value);			
}

var price = "";
var priceList = [];
var sum = 0;
cartSplit = [];


const imgs = document.querySelectorAll(".bookmarks");

	for (let i = 0; i < imgs.length; i++) {
	  imgs[i].addEventListener("click", function() {
		imgs[i].classList.toggle("bookmarked");
		if (imgs[i].classList.contains("bookmarked")) {
		  imgs[i].src = "Images/bookmarkafter.png";
		} else {
		  imgs[i].src =
			"Images/bookmark.png";
		}
	  });
	}


//Font size changing
function changeFontSize(id) {
  var all = document.getElementById("all");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(all) 
        : all.currentStyle;    
  var fontSize;

  if (computedStyle) { 
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);

      if (id == document.getElementById("button1")) {
        fontSize += 2;
      } else if (id == document.getElementById("button2")) {
        fontSize -= 2;
      }
      all.style.fontSize = fontSize + "px";
  }
}



//Redirect to checkout page
function checkoutredirect(){
	if(cart.length == 0){
		alert("Your Cart Is Empty");
	}
	else{
	var cartItems = cart.toString();
	localStorage.setItem("cart",cartItems);
	localStorage.setItem("orders",orders);
	window.open("checkout.html");
	}
	return cartItems;
}

//Count orders and show Message
var orders = 0;
function addedToCartMessage() {
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	orders += 1
}


