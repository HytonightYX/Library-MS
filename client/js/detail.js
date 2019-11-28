const initInfos = (book) => {
    $(".detail-content-info").append($("<p><span>作者: </span><span>" + book.author.join("&nbsp;/&nbsp;") + "</span></p>"));
    if (book.origin_title.length > 0) $(".detail-content-info").append($("<p><span>原作名: </span><span>" + book.origin_title + "</span></p>"));
    if (book.translator.length > 0) $(".detail-content-info").append($("<p><span>译者: </span><span>" + book.translator.join("&nbsp;/&nbsp;") + "</span></p>"));
    $(".detail-content-info").append($("<p><span>出版社: </span><span>" + book.publisher + "</span></p>"));
    $(".detail-content-info").append($("<p><span>出版时间: </span><span>" + book.pubdate + "</span></p>"));
    $(".detail-content-info").append($("<p><span>页数: </span><span>" + book.pages + "</span></p>"));
    $(".detail-content-info").append($("<p><span>定价: </span><span>" + book.price + "</span></p>"));
    $(".detail-content-info").append($("<p><span>装帧: </span><span>" + book.binding + "</span></p>"));
    if (book.isbn13) $(".detail-content-info").append($("<p><span>ISBN: </span><span>" + book.isbn13 + "</span></p>"));
    else $(".detail-content-info").append($("<p><span>ISBN: </span><span>" + book.isbn10 + "</span></p>"));
}
const initIntro = (book) => {
    if (book.subtitle.length > 0) $("#content").append($("<p>" + book.subtitle + "</p>"));
    if (book.summary.length > 0) $("#content").append($("<p>" + book.summary.replace(/\n/g, "</p><p>") + "</p>"));

    $("#author").append($("<p>" + book.author_intro.replace(/\n/g, "</p><p>") + "</p>"));
    book.tags.forEach((item) => {
        $("#tags").append($("<span class='detail-tag'>" + item.title + "</span>&nbsp;"));
    });

    $("#catalog").append($("<p>" + book.catalog.replace(/\n/g, "</p><p>") + "</p>"));
}

$(document).ready(() => {
    const sample = data.books[19];
    $("h4.main-detail-title").text(sample.title);
    $(".detail-content-cover img").attr("src", sample.images.small);
    $(".detail-content-rating strong").text(sample.rating.average);
    $(".detail-content-rating i").text(sample.rating.numRaters + "人评价");
    initInfos(sample);
    initIntro(sample);
});