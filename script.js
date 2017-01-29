var meetLicorne = false;

function gotoSection(key) {
	var url = 'history/' + key + '.html';
	$.get(url, function(data) {
		$('.section').html(data);
		$.getScript('binding.js');
	})
}

function gotoSectionAttack(key, x, background) {
	gotoSection(key);
	animationDmg();
	loseLife(x);
	if (background) {
		setBackground(key);
	}
}

function setBackground(key) {
	$('body').css('background-image', "url(img/" + key + ".jpg)");
	$('body').css('background-size', 'cover');
}

function getLife() {
	return $('#lifeValue').html();
}

function setLife(v) {
	$('#lifeValue').html(v);
}

function loseLife(x) {
	setLife(getLife() - x);
	if (getLife() <= "0") {
		endGame();
	}
}

function startGame() {
	setLife(5);
	gotoSection('wakeUp');
}

function endGame() {
	gotoSection("death");
	setBackground("death");
}

function animationDmg() {
	$('html').effect("highlight", {color: 'red'}, 200);
}

function addInventory(object) {
	var span = $('<span id=' + object + '></span>');
	var img = $('<img src="img/' + object + '.jpg" />');
	img.css('vertical-align', "middle");
	img.css('width', '20px');
	span.append(img);
	$('.inventory').append(span);
}

function removeInventory(object) {
	$('#'+object).remove();
}
