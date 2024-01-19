const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");

// Iterate through each anchor link
for (let index = 0; index < smoothScrollAnchor.length; index++) {
    const el = smoothScrollAnchor[index];

    el.addEventListener('click', function (ev) {
        ev.preventDefault();
        console.log(this.getAttribute("href"));
    });
}