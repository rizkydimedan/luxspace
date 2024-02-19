// Select all anchor links with href starting with '#'
const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");


// Iterate through each anchor link
for (let index = 0; index < smoothScrollAnchor.length; index++) {
    const el = smoothScrollAnchor[index];

    el.addEventListener('click', function (ev) {
        // Prevent the default behavior of the link
        ev.preventDefault();

        // Check if an element with the ID exists
        if (document.getElementById(this.getAttribute("href").replace("#", ""))) ;

        // Scroll smoothly to the target element
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
}
