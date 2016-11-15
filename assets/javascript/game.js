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
        } else if (opponent === undefined) {
            opponentName = $(this).attr("id");
            opponent = characterMap[opponentName];
            $("button").css("visibility", "visible");
            $(this).prependTo("#opponent");
            $("#opponent .character").css("border", "none");
            $("#instructions").empty();
        }
    });

    // var reset = function (){
    //     $("#opponent").remove("#" + opponentName);
    //     $("#player").remove("#" + playerName);
    //     for (var key in characterMap) {
    //         $("#characterGallery").append($("<div id='" + key + "'>"));
    //     }
    // };

    $("button").on("click", function() {
        opponent.healthPoints -= player.attackPower;
        $("#attackDamage").html("You attacked for " + player.attackPower + " damage.");
        player.attackPower = Math.floor(player.attackPower * 1.5);
        showHP();
        if (opponent.healthPoints > 0) {
            player.healthPoints -= opponent.counterAttack;
            $("#counterAttackDamage").html(opponentName.toUpperCase() + " counter attacked for " + opponent.counterAttack + " damage.");
            showHP();
            if (player.healthPoints < 0) {
                $("#announce").html("NoooOOOOooooOOO! You Lose")
            }
        } else {
            if ( $('#characterGallery').children().length == 1 ) {
                $("#announce").html("The Force Is Strong With You...You Win!");
            } else {
                $("#instructions").html("Search your feelings and select another opponet!")
                $("#" + opponentName).remove();
                $("#counterAttackDamage").html("");
                opponent = undefined;
            }
        }
    });

});
