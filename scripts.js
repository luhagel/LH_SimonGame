$(document).ready(function () {
    //GLOBALS
    var intervalId;
    var intervalSpeed = 800;
    var currHighlight = 0;
    var colSeq = [];
    var usrSeq = [];
    var seqRunning = false;
    var hardcore = false;
    //SOUNDS
    var audioRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    var audioBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    var audioYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var audioGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

    //MAIN
    playSimon();

    //FUNCTIONS
    function playSimon() {
        nextSeq();

        $(".reset").on("click", function () {
            reset(function () {
                seqFinished();
                nextSeq();
            });
        });

        $(".hardcore").on("click", function () {
            if (!hardcore) {
                hardcore = true;
                console.log(hardcore);
                $(".info-hc").text("Hardcore Mode is: ON");
                reset(function () {
                    seqFinished();
                    nextSeq();
                });
            } else {
                hardcore = false;
                $(".info-hc").text("Hardcore Mode is: OFF");
                console.log(hardcore);
                reset(function () {
                    seqFinished();
                    nextSeq();
                });
            }
        });

        $("#red").on("click", function () {
            if (!seqRunning) {
                audioRed.play();
                handleInput(1, function (result) {
                    if (result === "next") {
                        usrSeq = [];
                        seqFinished();
                        nextSeq();
                    } else if (result === "fail") {
                        alert("Wrong Color!");
                        if (hardcore) {
                            reset(function () {
                                seqFinished();
                                nextSeq();
                            });
                        } else {
                            playSeq();
                        }
                    } else if (result === "win") {
                        alert("Victory!");
                        reset(function () {
                            seqFinished();
                            nextSeq();
                        });
                    }
                });
            }
        });

        $("#blue").on("click", function () {
            if (!seqRunning) {
                audioBlue.play();
                handleInput(2, function (result) {
                    if (result === "next") {
                        usrSeq = [];
                        seqFinished();
                        nextSeq();
                    } else if (result === "fail") {
                        alert("Wrong Color!");
                        if (hardcore) {
                            reset(function () {
                                seqFinished();
                                nextSeq();
                            });
                        } else {
                            playSeq();
                        }
                    } else if (result === "win") {
                        alert("Victory!");
                        reset(function () {
                            seqFinished();
                            nextSeq();
                        });
                    }
                });
            }
        });
        $("#yellow").on("click", function () {
            if (!seqRunning) {
                audioYellow.play();
                handleInput(3, function (result) {
                    if (result === "next") {
                        usrSeq = [];
                        seqFinished();
                        nextSeq();
                    } else if (result === "fail") {
                        alert("Wrong Color!");
                        if (hardcore) {
                            reset(function () {
                                seqFinished();
                                nextSeq();
                            });
                        } else {
                            playSeq();
                        }
                    } else if (result === "win") {
                        alert("Victory!");
                        reset(function () {
                            seqFinished();
                            nextSeq();
                        });
                    }
                });
            }
        });
        $("#green").on("click", function () {
            if (!seqRunning) {
                audioGreen.play();
                handleInput(4, function (result) {
                    if (result === "next") {
                        usrSeq = [];
                        seqFinished();
                        nextSeq();
                    } else if (result === "fail") {
                        alert("Wrong Color!");
                        if (hardcore) {
                            reset(function () {
                                seqFinished();
                                nextSeq();
                            });
                        } else {
                            playSeq();
                        }
                    } else if (result === "win") {
                        alert("Victory!");
                        reset(function () {
                            seqFinished();
                            nextSeq();
                        });
                    }
                });
            }
        });
    }

    function handleInput(color, callback) {
        if (checkColor(color)) {
            if (usrSeq.length === colSeq.length) {
                if (usrSeq.length === 20) {
                    callback("win");
                } else if (usrSeq.length === 5) {
                    intervalSpeed -= 100;
                } else if (usrSeq.length === 9) {
                    intervalSpeed -= 200;
                } else if (usrSeq.length === 13) {
                    intervalSpeed -= 300;
                }
                usrSeq = [];
                callback("next");
            }
        } else {
            callback("fail");
        }
    }

    function checkColor(color) {
        if (color === colSeq[usrSeq.length]) {
            usrSeq.push(color);
            return true;
        } else {
            return false;
        }
    }

    function nextSeq() {
        colSeq.push(colGen());
        updateCorrectColors();
        playSeq();
    }

    function reset(callback) {
        intervalId;
        intervalSpeed = 600;
        currHighlight = 0;
        colSeq = [];
        usrSeq = [];
        callback();
    }

    function colGen() {
        return Math.floor((Math.random() * 4) + 1);
    }

    function updateCorrectColors() {
        $(".info").text("Correct Colors: " + (colSeq.length - 1));
    }

    //INTERVAL FUNCTIONS
    function playSeq() {
        currHighlight = 0;
        seqRunning = true;
        intervalId = setInterval(highLight, intervalSpeed);
    }

    function highLight() {
        $(".color-panel").removeClass("active");
        switch (colSeq[currHighlight]) {
            case 1:
                $("#red").addClass("active");
                audioRed.play();
                break;
            case 2:
                $("#blue").addClass("active");
                audioBlue.play();
                break;
            case 3:
                $("#yellow").addClass("active");
                audioYellow.play();
                break;
            case 4:
                $("#green").addClass("active");
                audioGreen.play();
                break;
            default:
                seqFinished();
                console.log("Unexpected value in color Seq");
                break;
        }
        if (currHighlight === colSeq.length - 1 || colSeq.length === 0) {
            seqFinished();
        } else {
            currHighlight++;
        }
    }

    function seqFinished() {
        seqRunning = false;
        clearInterval(intervalId);
        setTimeout(function () {
            $(".color-panel").removeClass("active");
        }, intervalSpeed);
    }
});
