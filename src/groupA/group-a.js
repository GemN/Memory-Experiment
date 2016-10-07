/**
 * Created by gem on 04/10/2016.
 */
$(function() {

    $.extend({
        form: function(url, data, method) {
            if (method == null) method = 'POST';
            if (data == null) data = {};

            var form = $('<form>').attr({
                method: method,
                action: url
            }).css({
                display: 'none'
            });

            var addData = function(name, data) {
                if ($.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        var value = data[i];
                        addData(name + '[]', value);
                    }
                } else if (typeof data === 'object') {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            addData(name + '[' + key + ']', data[key]);
                        }
                    }
                } else if (data != null) {
                    form.append($('<input>').attr({
                        type: 'hidden',
                        name: String(name),
                        value: String(data)
                    }));
                }
            };

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    addData(key, data[key]);
                }
            }

            return form.appendTo('body');
        }
    });

    $('#abort').click(function() {
        window.location = "../index.html"
    });

    var words = [
        "2 seconds by word",
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
            window.location = "../commonTest/test.html?group=A";
        } else {
            $('#label').html(words[i]);
            i++;
        }
    }, 2000);
});