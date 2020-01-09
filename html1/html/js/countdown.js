$(document).ready(function() {
	var date_str = "";
	for (var i = 0; i <= 59; i++) {
		var d_;
		i < 10 ? d_ = "0" + i : d_ = i;
		date_str = date_str + "<option>" + d_ + "</option><br/>"
	}
	$("#_minute").append(date_str);
	var time_str = "";
	for (var i = 0; i <= 59; i++) {
		var t_;
		i < 10 ? t_ = "0" + i : t_ = i;
		time_str = time_str + "<option>" + t_ + "</option><br/>"
	}
	$("#_second").append(time_str);
});
$(document).ready(function() {
	$("#start_").click(function() {
		var m_ = $("#_minute").val();
		var s_ = $("#_second").val();
		seconds_ = m_ * 60 + s_ * 1;
	});
	$("#reset_").click(function() {
		$("#_minute").val("00");
		$("#_second").val("00");
		seconds_ = 0;
		clearInterval(timer);
	});
});

var digitSegments = [
	[1, 2, 3, 4, 5, 6],
	[2, 3],
	[1, 2, 7, 5, 4],
	[1, 2, 7, 3, 4],
	[6, 7, 2, 3],
	[1, 6, 7, 3, 4],
	[1, 6, 5, 4, 3, 7],
	[1, 2, 3],
	[1, 2, 3, 4, 5, 6, 7],
	[1, 2, 7, 3, 6, 4]
]
var timer;
var seconds_;
document.addEventListener('DOMContentLoaded', function() {
	var _minutes = document.querySelectorAll('.minutes');
	var _seconds = document.querySelectorAll('.seconds');
	setInterval(function() {
		if (seconds_ >= 0) {
			minutes = Math.floor(seconds_ / 60);
			seconds = Math.floor(seconds_ % 60);
			minutes < 10 ? minutes = "0" + minutes : minutes = "" + minutes;
			seconds < 10 ? seconds = "0" + seconds : seconds = "" + seconds;
			setNumber(_minutes[0], Math.floor(minutes / 10), 1);
			setNumber(_minutes[1], minutes % 10, 1);
			setNumber(_seconds[0], Math.floor(seconds / 10), 1);
			setNumber(_seconds[1], seconds % 10, 1);

			if (seconds_ <= 60 || seconds_ == 0){
				$(".segment").css("background","red");
				$(".separator").css("background","red");
			}else{
				$(".segment").css("background","#000");
				$(".separator").css("background","#000");
			}
			--seconds_;
		} else {
			clearInterval(timer);
		}
	}, 1000);
});

var setNumber = function(digit, number, on) {
	var segments = digit.querySelectorAll('.segment');
	var current = parseInt(digit.getAttribute('data-value'));

	if (!isNaN(current) && current != number) {
		digitSegments[current].forEach(function(digitSegment, index) {
			setTimeout(function() {
				segments[digitSegment - 1].classList.remove('on');
			}, index * 45)
		});
	}

	if (isNaN(current) || current != number) {
		setTimeout(function() {
			digitSegments[number].forEach(function(digitSegment, index) {
				setTimeout(function() {
					segments[digitSegment - 1].classList.add('on');
				}, index * 45)
			});
		}, 250);
		digit.setAttribute('data-value', number);
	}
}