$(document).ready(function() {

    var Character = class {
        constructor(healthPoints, attackPower, counterAttack) {
            this.healthPoints = healthPoints;
            this.attackPower = attackPower;
            this.counterAttack = counterAttack;
        }
    };

    var yoda = new Character(100, 15, 25);
    var han = new Character(100, 20, 50);
    var vader = new Character(200, 25, 75);
    var trooper = new Character(75, 10, 20);

    var characterMap = {
        yoda: yoda,
        han: han,
        vader: vader,
        trooper: trooper,
    }

    var player;
    var opponent;
    var playerName;
    var opponentName;

    var showHP = function () {
        for (var key in characterMap) {
            $("#" + key + " p").html(" " + characterMap[key].healthPoints);
        }
    }

    showHP();

    var selectOpponent = function() {
        $("h1").html("Select Your Opponent");
        $(".character").css("border", "5px solid red");
        $("#player .character").css("border", "none");
        $(".character").on("click", function() {
            opponentName = $(this).attr("id");
            opponent = characterMap[opponentName];
            console.log(opponent.healthPoints);
            $("button").css("visibility", "visible");
            $(this).appendTo("#opponent");
            $("#characterGallery").empty();
        });
    }

    $(".character").on("click", function() {
        playerName = $(this).attr("id");
        player = characterMap[playerName];
        console.log(player.healthPoints);
        $(this).appendTo("#player");
        selectOpponent();
    });

    $("button").on("click", function() {
        opponent.healthPoints -= player.attackPower;
        showHP();
        player.healthPoints -= opponent.counterAttack;
        console.log(player.healthPoints);
        showHP();
    });
    
});
