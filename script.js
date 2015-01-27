var COUNT = 8;
var blocks = $(".blocks");
var actions = {
    "fill": function (v) {
        if (v === undefined) v = 1;
        var $this = $(this);
        $this.data("value", v);
        if (v) {
            $this.addClass("on");
        } else {
            $this.removeClass("on");
        }
    },
    "clear": function () {
        actions.fill.call(this, false);
    },
    "toggle": function () {
        var $this = $(this);
        if ($this.length > 1) {
            $this.each(actions.toggle);
        } else {
            actions.fill.call(this, !$this.data("value"));
        }
    }
};
var getmap = function () {
    var m1 = [], m2 = [];
    for (var i = 1; i <= COUNT; i++) {
        var row1 = "", row2 = "";
        for (var j = 1; j <= COUNT; j++) {
            row1 += $(".block-" + i + "-" + j).data("value") ? "1" : "0";
            row2 += $(".block-" + j + "-" + i).data("value") ? "1" : "0";
        }
        m1.push(row1);
        m2.push(row2);
    }
    return [m1, m2];
};
var summery = function () {
    var m = getmap();
    var h1 = m[0].map(function (v) { return 'B' + v; }).join(", ");
    var h2 = m[0].map(function (v) { return 'B' + v.split("").reverse().join(""); }).join(", ");
    var v1 = m[1].map(function (v) { return 'B' + v; }).join(", ");
    var v2 = m[1].map(function (v) { return 'B' + v.split("").reverse().join(""); }).join(", ");

    $(".h1").val(h1 + ",");
    $(".h2").val(h2 + ",");
    $(".v1").val(v1 + ",");
    $(".v2").val(v2 + ",");
};

for (var i = 1; i <= COUNT; i++) {
    var row = $("<div></div>").addClass("row").appendTo(blocks);
    for (var j = 1; j <= COUNT; j++) {
        $("<div></div>")
            .addClass("block")
            .addClass("row-" + i)
            .addClass("col-" + j)
            .addClass("block-" + i + "-" + j)
            .data("value", false)
            .data("target", ".block-" + i + "-" + j)
            .data("action", "toggle")
            .addClass("function-key")
            .appendTo(row);
    }
    $("<button></button>")
        .text("F")
        .data("target", ".row-" + i)
        .data("action", "fill")
        .addClass("function-key")
        .appendTo(row);
    $("<button></button>")
        .text("C")
        .data("target", ".row-" + i)
        .data("action", "clear")
        .addClass("function-key")
        .appendTo(row);
    $("<button></button>")
        .text("T")
        .data("target", ".row-" + i)
        .data("action", "toggle")
        .addClass("function-key")
        .appendTo(row);
    $("<span></span>").appendTo(row);
}

var row = $("<div></div>").addClass("row").appendTo(blocks);
for (var i = 1; i <= COUNT; i++) {
    $("<button></button>")
        .text("F")
        .data("target", ".col-" + i)
        .data("action", "fill")
        .addClass("function-key")
        .appendTo(row);
}
$("<span></span>").appendTo(row);

var row = $("<div></div>").addClass("row").appendTo(blocks);
for (var i = 1; i <= COUNT; i++) {
    $("<button></button>")
        .text("C")
        .data("target", ".col-" + i)
        .data("action", "clear")
        .addClass("function-key")
        .appendTo(row);
}
$("<span></span>").appendTo(row);

var row = $("<div></div>").addClass("row").appendTo(blocks);
for (var i = 1; i <= COUNT; i++) {
    $("<button></button>")
        .text("T")
        .data("target", ".col-" + i)
        .data("action", "toggle")
        .addClass("function-key")
        .appendTo(row);
}
$("<span></span>").appendTo(row);

var panel = $(".main .panel");
$("<button></button>")
    .text("Clear All")
    .data("target", ".blocks .row .block")
    .data("action", "clear")
    .addClass("function-key")
    .appendTo(panel);

$("<button></button>")
    .text("Fill All")
    .data("target", ".blocks .row .block")
    .data("action", "fill")
    .addClass("function-key")
    .appendTo(panel);

$("<button></button>")
    .text("Toggle All")
    .data("target", ".blocks .row .block")
    .data("action", "toggle")
    .addClass("function-key")
    .appendTo(panel);

$(".function-key").click(function () {
    var $this = $(this);
    var target = $this.data("target");
    var action = $this.data("action");
    console.log("[Target] " + target);
    console.log("[Action] " + action);
    actions[action].call($(target));

    summery();
});
