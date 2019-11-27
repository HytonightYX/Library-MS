const createResultItem = (coverURL, title) => {
    const $main_result_item = $("<div class='main-result-item'></div>");
    const $main_result_cover = $("<div class='main-result-cover'></div>").html("<img src=" + coverURL + ">");
    $main_result_item.append($main_result_cover, $("<p>" + title + "</p>"));
    return $main_result_item;
};

$(document).ready(() => {
    const book_infos = data.books;
    for (var i = 0; i < 20; i++) {
        $("#main-result-items").append(createResultItem(book_infos[i].images.small, book_infos[i].title));
    }
});