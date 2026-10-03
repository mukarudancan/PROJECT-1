const pageNavigationDirection = sessionStorage.getItem("page-navigation-direction");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (pageNavigationDirection === "back") {
    if (!reducedMotion) {
        document.documentElement.classList.add("page-enter-from-left");
    }
    sessionStorage.removeItem("page-navigation-direction");
}

document.addEventListener("click", (event) => {
    const card = event.target.closest("a.card");

    if (
        !card ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (card.target && card.target !== "_self") ||
        reducedMotion
    ) {
        return;
    }

    event.preventDefault();
    sessionStorage.setItem("page-navigation-direction", "forward");
    document.documentElement.classList.add("page-exit-to-left");
    window.setTimeout(() => window.location.assign(card.href), 350);
});
