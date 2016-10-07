/**
 * Created by gem on 04/10/2016.
 */
$(function() {
    $('#abort').click(function() {
        window.location = "../index.html"
    });

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '../rsc/audio/homeless.mp3');

    var words = [
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

    var i = 0;

    var idInterval = setInterval(function () {
        if (i > 9) {
            clearInterval(idInterval);
            window.location = "../commonTest/test.html?group=B";
        } else {
            audioElement.setAttribute('src', '../rsc/audio/' + words[i] + '.mp3');
            audioElement.play();
            $('#label').html("<i class=\"material-icons volume-icon\">volume_up</i>");
            i++;
        }
    }, 3000);
});