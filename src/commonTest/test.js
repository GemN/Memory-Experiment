/**
 * Created by gem on 04/10/2016.
 */
$(function() {
    $('#abort').click(function() {
        window.location = "../index.html"
    });

    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function checkWord(current, isRead) {
        if (current.word !== "") {
            if (current.space === false && learned_words.indexOf(current.word) === -1) {
                current.accurate = true;
            }
            if (isRead) {
                testData.readData.push(current);
            } else {
                testData.audioData.push(current);
            }
        }
    }

    function readTest() {
        var i = 0;
        var testStarted = false;
        var current = {
            word: "",
            space: false,
            accurate: false,
            time: 0
        };

        $(window).keypress(function (e) {
            if ((e.keyCode === 0 || e.keyCode === 32) && testStarted === true) {
                e.preventDefault();

                if (learned_words.indexOf(current.word) > -1) {
                    current.accurate = true;
                    current.time = timeCount;
                } else {
                    current.accurate = false;
                }
                current.space = true;
                $('#label').addClass("selected");
            }
        });

        var idInterval = setInterval(function () {
            testStarted = true;
            if (i > 19) {
                checkWord(current, true);
                $('#label').removeClass("selected true-answer wrong-answer");
                clearInterval(idInterval);
                testStarted = false;
                $('#label').html("End of reading part, now Audio part: press space when you hear word you recognize");
                setTimeout(audioTest, 4000);
            } else {
                checkWord(current, true);
                $('#label').removeClass("selected true-answer wrong-answer");
                current = {
                    word: words[i],
                    space: false,
                    accurate: false,
                    time: 0
                };
                $('#label').html(words[i]);
                timeCount = 0;
                i++;
            }
        }, 2500);
    }

    function audioTest() {
        words = shuffleArray(words);
        var audioElement = document.createElement('audio');
        var i = 0;
        var testStarted = false;
        var current = {
            word: "",
            space: false,
            accurate: false,
            time: 0
        };

        $(window).keypress(function (e) {
            if ((e.keyCode === 0 || e.keyCode === 32) && testStarted === true) {
                e.preventDefault();

                if (learned_words.indexOf(current.word) > -1) {
                    current.accurate = true;
                    current.time = timeCount;
                } else {
                    current.accurate = false;
                }
                current.space = true;
                $('#label').addClass("selected");
            }
        });

        var idInterval = setInterval(function () {
            testStarted = true;
            if (i > 19) {
                checkWord(current, false);
                $('#label').removeClass("selected true-answer wrong-answer");
                clearInterval(idInterval);
                testStarted = false;
                $('#label').html("End of Audio part");
                showStats();
            } else {
                checkWord(current, false);
                $('#label').removeClass("selected true-answer wrong-answer");
                current = {
                    word: words[i],
                    space: false,
                    accurate: false,
                    time: 0
                };
                audioElement.setAttribute('src', '../rsc/audio/' + words[i] + '.mp3');
                audioElement.play();
                $('#label').html("<i class=\"material-icons volume-icon\">volume_up</i>");
                timeCount = 0;
                i++;
            }
        }, 3000);
    }

    function showStats() {
        $('#label').hide();
        var table = $('<table></table>').append($('<tr/>')
            .append($('<th/>').text('Test type'))
            .append($('<th/>').text('Accuracy'))
            .append($('<th/>').text('Mean time response'))
        );

        var accuracy = 0;
        var time = 0;
        var nbSpace = 0;

        for(var i = 0; i < testData.readData.length; i++){
            if (testData.readData[i].accurate === true) {
                accuracy++;
                if (testData.readData[i].space === true) {
                    time += testData.readData[i].time;
                    nbSpace++;
                }
            }

        }
        var row = $('<tr></tr>')
            .append($('<td/>').text("Read"))
            .append($('<td/>').text((accuracy * 100 / testData.readData.length ) + "%"))
            .append($('<td/>').text(Math.floor((time / nbSpace)) + "ms"))
            ;
        table.append(row);
        testData.stats.read = {
            accuracy:  accuracy * 100 / testData.readData.length,
            time: Math.floor((time / nbSpace))
        };

        accuracy = 0;
        time = 0;
        nbSpace = 0;

        for(i = 0; i < testData.audioData.length; i++){
            if (testData.audioData[i].accurate === true) {
                accuracy++;
                if (testData.audioData[i].space === true) {
                    time += testData.audioData[i].time;
                    nbSpace++;
                }
            }

        }
        row = $('<tr></tr>')
            .append($('<td/>').text("Audio"))
            .append($('<td/>').text((accuracy * 100 / testData.audioData.length ) + "%"))
            .append($('<td/>').text(Math.floor((time / nbSpace)) + "ms"))
            ;
        table.append(row);
        testData.stats.audio = {
            accuracy:  accuracy * 100 / testData.readData.length,
            time: Math.floor((time / nbSpace))
        };

        $('#stats').append(table);
        $.post("registerData.php", {json: JSON.stringify(testData)});
    }

    var learned_words = [
        "homeless",
        "chemical",
        "disagree",
        "optimal",
        "fabulous",
        "invention",
        "overflow",
        "malicious",
        "pollution",
        "camera"
    ];

    var fake_words = [
        "salary",
        "humanist",
        "displeasure",
        "protestant",
        "famously",
        "touristic",
        "equation",
        "instructive",
        "orchestra",
        "cosmetic"
    ];

    var words = shuffleArray(learned_words.concat(fake_words));
    var timeCount = 0;
    var testData = {
        group: QueryString.group,
        readData: [],
        audioData: [],
        stats: {
            read: [],
            audio: []
        }
    };

    setInterval(function() {
        timeCount += 10;
    }, 10);

    if (testData.group === undefined) {
        window.location = "../index.html"
    }

    setTimeout(readTest, 4000);
});