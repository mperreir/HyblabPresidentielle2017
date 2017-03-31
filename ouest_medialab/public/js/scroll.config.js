$(function() {
    $.scrollify({
        section : "body > section",
        scrollbars : false,
        updateHash : false,
        // touchScroll: false,
        before: function(index) {
            d3.selectAll("nav li a").attr('class', function(d, i) { return i==index?'selected':''})
        }
    });
    $(".scroll").click(function(e) {
        e.preventDefault();
        $.scrollify.move(e.currentTarget.hash);
    });
});
