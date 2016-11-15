$(document).ready(function() {

    var Character = class {
        constructor(healthPoints, attackPower, counterAttack) {
            this.healthPoints = healthPoints;
            this.attackPower = attackPower;
            this.counterAttack = counterAttack;
        }
    };

    var yoda = new Character(90, 10, 20);
    var han = new Character(85, 10, 15);
    var vader = new Character(200, 15, 20);
    var trooper = new Character(75, 8, 10);

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

    var showHP = function () {
        for (var key in characterMap) {
            $("#" + key + " p").html(" " + characterMap[key].healthPoints);
        }
    }

    showHP();

    $(".character").on("click", function() {
        if (player === undefined) {
            playerName = $(this).attr("id");
            player = characterMap[playerName];
            $(this).prependTo("#player");
            $("#playerSelection").html("Select Your Opponent");
            $(".character").css("border", "5px solid red");
            $("#player .character").css("border", "none");
        } else if (opponent === undefined && win === 0) {
            opponentName = $(this).attr("id");
            opponent = characterMap[opponentName];
            $(".btn-danger").css("visibility", "visible");
            $(this).prependTo("#opponent");
            $("#opponent .character").css("border", "none");
            $("#instructions").empty();
        }
    });

    $("button").on("click", function() {
        opponent.healthPoints -= player.attackPower;
        $("#attackDamage").html("You attacked for " + player.attackPower + " damage.");
        player.attackPower = Math.floor(player.attackPower * 1.5);
        showHP();
        if (opponent.healthPoints > 0) {
            player.healthPoints -= opponent.counterAttack;
            $("#counterAttackDamage").html(opponentName.toUpperCase() + " counter attacked for " + opponent.counterAttack + " damage.");
            showHP();
            if (player.healthPoints < 1) {
                //want to show hp as 0
                $("#announce").html("NoooOOOOooooOOO! You Lose")
                opponent = undefined;
                win = -1;
                $(".btn-primary").css("visibility", "visible");
            }
        } else {
            if ( $('#characterGallery').children().length == 1 ) {
                $("#announce").html("The Force Is Strong With You...You Win!");
                opponent = undefined;
                //want to show hp as 0
                win = 1;
                $(".btn-primary").css("visibility", "visible");
            } else {
                $("#instructions").html("Search your feelings and select another opponet!")
                $("#" + opponentName).remove();
                $("#counterAttackDamage").html("");
                opponent = undefined;
            }
        }
    });

    // TODO on click for Reset Button that resets js variables and reloads the html.

});