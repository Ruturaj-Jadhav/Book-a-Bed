
(function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		
	//Animation
	
	$(document).ready(function() {
		$('body.hero-anime').removeClass('hero-anime');
	});

	//Menu On Hover
		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	
	//Switch light/dark
	
	$("#switch").on('click', function () {
		if ($("body").hasClass("dark")) {
			$("body").removeClass("dark");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("dark");
			$("#switch").addClass("switched");
		}
	});  
	
  })(jQuery);


  // Update Check-in date
  const data = {};
  flatpickr("#checkin-btn", {
	dateFormat: "Y-m-d",
	onClose: function(selectedDates, dateStr, instance) {
		var checkoutDate = new Date(selectedDates[0]);
        checkoutDate.setDate(checkoutDate.getDate() + 30);
        var checkoutDateStr = instance.formatDate(checkoutDate, "Y-m-d");
        document.getElementById("checkin-btn").textContent = dateStr;
        document.getElementById("checkout-btn").textContent = checkoutDateStr;
        document.getElementById("date-input").value = dateStr;
        document.getElementById("date-out").value = checkoutDateStr;
		data.checkin = checkinDate;
		data.checkout = checkoutDate;
		

	},

});

  // Update Check-out date

function updateRoom (roomType){
	data.roomType = roomType;
	document.getElementById("roomType").textContent = roomType;
}
// Send data
document.getElementById("book-now-btn").addEventListener("click", function() {
	var checkin = document.getElementById("checkin-btn").textContent;
	var checkout = document.getElementById("checkout-btn").textContent;
	var roomType = document.getElementById("roomType").textContent;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/book");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4 && xhr.status === 200) {
		console.log("Booking successful!");
	  }
	};
	var data = JSON.stringify({
	  checkin: checkin,
	  checkout: checkout,
	  roomType: roomType
	});
	xhr.send(data);
  });









