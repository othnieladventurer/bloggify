/* slick */
$(function () {
    $(".header-slider").slick({
        slidesToShow: 1,
        slidesToSroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots",
    });
});


// Simple parallax js
let parallaxImg = document.getElementsByClassName("parallax-img");

new simpleParallax(parallaxImg, {
    delay: 0.06,
    transitiojn: "cubuc-bezier(0,0,0,1)",
})




// Isotope js
let searchInput = ""; // Initialize the variable to avoid undefined behavior

// Initialize Isotope
let $blogContainer = $('.blog-container').isotope({
    itemSelector: ".blog-item",
    layoutMode: "fitRows",
    filter: function () {
        // Combine search and category filters
        let matchesSearch = searchInput ? $(this).text().match(searchInput) : true;
        let matchesCategory = $(this).is($(this).data('filter') || ':not(:hidden)'); // Matches category filter (if any)
        
        // Return true only if both filters pass
        return matchesSearch && matchesCategory;
    },
});

// Search input debounce functionality
let $search = $(".blog-search");
$search.keyup(debounce(function () {
    // Create case-insensitive regex from the search input
    searchInput = new RegExp($search.val(), "i"); // RegEx for case-insensitive search
    
    // Trigger Isotope's filtering after the search input is updated
    $blogContainer.isotope();
}, 200));

// Debounce function to control execution frequency
function debounce(fn, threshold) {
    let timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        let args = arguments;
        let _this = this;

        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}

// Filter buttons functionality
$(".blog-filters").on("click", "button", function () {
    let filterValue = $(this).attr("data-filter");

    // Apply the Isotope filter with the selected category filter
    $blogContainer.isotope({ filter: function () {
        // Apply both category and search filters together
        let matchesSearch = searchInput ? $(this).text().match(searchInput) : true;
        let matchesCategory = $(this).is(filterValue); // Category filter

        // Return true only if both filters match
        return matchesSearch && matchesCategory;
    }});

    // Highlight the active filter button
    $(".blog-filters button").removeClass("is-checked");
    $(this).addClass("is-checked");
});

// Highlight the active filter button (for the initial state when page loads)
$(".blog-filters").each(function (i, buttonGroup) {
    let $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
        $buttonGroup.find(".is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
    });
});



