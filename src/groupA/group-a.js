/**
 * Created by gem on 04/10/2016.
 */
$(function() {
    $('#abort').click(function() {
        window.location = "../index.html"
    })

    var words = [
        "3 seconds by word",
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
        if (i > 10) {
            clearInterval(idInterval);
        } else {
            $('#label').html(words[i]);
            i++;
        }
    }, 3000);
});