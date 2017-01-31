var buttons = $(".section button");

// unbind button in case already binded
buttons.off('click');

buttons.click( function() {
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
        meetLicorne = true;
        break;
      case "askLicorne":
        gotoSection(go);
        break;
      case "licorne":
        if (meetLicorne) {
          gotoSection("askLicorne");
          setBackground("eatCarotte");
        } else {
          gotoSection(go);
          setBackground(go);
        }
        break;
      case "forest":
        $('#wanted-img').hide();
      default:
        gotoSection(go);
        setBackground(go);
    }
} );
