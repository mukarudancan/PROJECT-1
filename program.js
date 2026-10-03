const pageNavigationDirection = sessionStorage.getItem("page-navigation-direction");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
if (pageNavigationDirection === "forward" && !reducedMotion) {
    root.classList.add("page-enter-from-right");
}
sessionStorage.removeItem("page-navigation-direction");

document.querySelector(".back-link").addEventListener("click", (event) => {
    const link = event.currentTarget;

    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (link.target && link.target !== "_self") ||
        reducedMotion
    ) {
        return;
    }

    event.preventDefault();
    sessionStorage.setItem("page-navigation-direction", "back");
    root.classList.add("page-exit-to-right");
    window.setTimeout(() => window.location.assign(link.href), 350);
});
