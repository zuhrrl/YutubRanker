// Jquery
var $ = require("jquery");


var keyword
var youtubeUrl
var region

function getvideoId(url) {
    var id
    if(url.includes("youtu.be")) {
        id = url.split("/")[3]
    }
    else {
        id = url.split("?v=")[1]
    }
    return id
}

$('#btn_search').click(function (e) {
    keyword = $("#keyword").val()
    region = $("#region").val()
    youtubeUrl = $("#yturl").val()
    youtubeUrl = getvideoId(youtubeUrl)
    e.preventDefault()
    $.ajax({
        url: "/youtuberanker",
        type: "post",
        data: {
            keyword: keyword,
            yturl: youtubeUrl,
            region: region
        },
        success: function (response) {

            location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});
