export function addClass(e, classes) {
    if (e.classList) {
        e.classList.add(...classes.split(" "));
    }
}

export function removeClass(e, classes) {
    if (e && e.classList) {
        e.classList.remove(...classes.split(" "));
    }
}

