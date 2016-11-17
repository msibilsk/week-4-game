$(document).ready(function() {

    var Character = class {
        constructor(healthPoints, attackPower, counterAttack) {
            this.healthPoints = healthPoints;
            this.attackPower = attackPower;
            this.counterAttack = counterAttack;
        }
    };

    var yoda = new Character(110, 12, 20);
    var han = new Character(100, 10, 15);
    var vader = new Character(200, 15, 20);
    var trooper = new Character(90, 8, 10);

    var characterMap = {
        yoda: yoda,
        han: han,
        vader: vader,
        trooper: trooper,
    };

    var player = undefined;
    var opponent = undefined;
    var playerName;
    var opponentName;
    var win = 0;
    var currentAttackPower;

    var showHP = function () {
        for (var key in characterMap) {
            $("#" + key + " span").html(" " + characterMap[key].healthPoints);
        }
    }

    showHP();

    //handles selection of characters
    $(".character").on("click", function() {
        if (player === undefined) {
            playerName = $(this).attr("id");
            player = characterMap[playerName];
            currentAttackPower = player.attackPower;
            $(this).prependTo("#player");
            $("#playerSelection").html("Select Your Opponent");
            $(".character").css("border", "5px solid red");
            $("#player .character").css("border", "none");
        } else if (opponent === undefined && win === 0 && $(this).attr("id") !== playerName) {
            opponentName = $(this).attr("id");
            opponent = characterMap[opponentName];
            $(".btn-danger").css("visibility", "visible");
            $(this).prependTo("#opponent");
            $("#opponent .character").css("border", "none");
            $("#instructions").empty();
        }
    });

    //attack and counter attack functionality with checks for win/loss
    $(".btn-danger").on("click", function() {
        opponent.healthPoints -= currentAttackPower;
        $("#attackDamage").html("You attacked for " + currentAttackPower + " damage.");
        currentAttackPower += player.attackPower;
        showHP();
        if (opponent.healthPoints > 0) {
            player.healthPoints -= opponent.counterAttack;
            $("#counterAttackDamage").html(opponentName.toUpperCase() + " counter attacked for " + opponent.counterAttack + " damage.");
            showHP();
            if (player.healthPoints < 1) {
                $("#announce").html("NoooOOOOooooOOO! You Lose")
                opponent = undefined;
                win = -1;
                $(".btn-primary").css("visibility", "visible");
                var no = new Audio("assets/sound/nooo.mp3");
                no.play();
            }
        } else {
            if ( $('#characterGallery').children().length == 1 ) {
                $("#announce").html("The Force Is Strong With You...You Win!");
                opponent = undefined;
                win = 1;
                $(".btn-primary").css("visibility", "visible");
                var song = new Audio("assets/sound/starwars.mp3");
                song.play();
            } else {
                $("#instructions").html("Search your feelings and select another opponent!")
                $("#" + opponentName).remove();
                $("#counterAttackDamage").html("");
                opponent = undefined;
            }
        }
    });

    //reloads page to reset html and javascript
    $(".btn-primary").on("click", function() {
        location.reload();
    });

});