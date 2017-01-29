
	var buttons = $(".section button");
	var status = $("#status");

	// unbind button in case already binded
	buttons.off('click');

	buttons.click( function() {
			// $(this).closest('.section').hide();
			// gotoSection($(this).attr('go'));
			var go = $(this).attr('go');

			switch (go) {
				case "wakeUp":
					startGame();
					break;
				case "intro":
					location.reload();
					break;
				case "lac":
					gotoSectionAttack(go, 2, true)
					break;
				case "ignoreCarotte":
				case "helpCarotte":
					gotoSectionAttack(go, 1, false);
					break;
				case "attackCarotte":
					gotoSectionAttack(go, 1, false);
					addInventory('carotte');
					break;
				case "caverne":
					gotoSection(go);
					setBackground(go);
					setLife(0);
					break;
				case "attackLicorne":
					gotoSectionAttack(go, 2, false);
					break;
				case "eatCarotte":
					gotoSection(go);
					removeInventory('carotte');
					setBackground(go);
					break;
				case "askLicorne":
					gotoSection(go);
					break;
				default:
					gotoSection(go);
					setBackground(go);
			}
	} );

	function gotoSection(key) {
		var url = 'history/' + key + '.html';
		$.get(url, function(data) {
			$('.section').html(data);
			$.getScript('sorcery.js');
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

	function loseOneLife() {
		setLife(getLife() - 1);
		if (getLife() === "0") {
			endGame();
		}
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
