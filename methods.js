livJs.textAnimation(".lvText");

livJs.textAnimation(".lvText");

// bounce animation
livJs.loadingBounce(".bounce");

// adding dom style
livJs.addDomStyle(".point", {
    color: "red",
    fontSize: "100px",
});

livJs.animation(".box", {
    rootMargin: -100,
    slide: "top",
    elements: "many",
});

livJs.createDomElements(".container", {
    div: {
        class: "main-div",
        id: "div_id",
        dataAttribute: "target, demo-target",
        innerElements: {
            h1: {
                textContent: "some demo content",
            },
            div: {
                class: "box",
            },
        },
    },
});

livJs.toggle(".box", {
    toogleClass: "randomClass",
    clickTarget: ".box",
    elements: "many",
});

livJs.CreateElements(".container", "div", {
    class: "box",
    id: "id",
    dataAttribute: [{ animation: "bounce" }],
    parentInnerElements: [
        {
            element: "div",
            class: "box",
            dataAttribute: [{ animation: "shakeY" }],
        },
    ],
});

livJs.mouse(".box", { elements: "many", event: "click" });
livJs.mouse(".box", { elements: "many" });
