(function (window) {
    "use strict";

    // ** store the all methods inside the object ** //
    const globalFnObject = {};

    // ** global variables ** //
    let targetElm,
        char = 0;

    // ** document selection function to grab the document from the dom return the values based on the conditon ** //
    const _grabDocumentElements = function (elem, options) {
        // ** if the user slided the multypal dopcument then select the element using the selectorAll **//
        if (options && options.elements) {
            if (options.elements === "many" || options.elements >= 2)
                return (targetElm = document.querySelectorAll(`${elem}`));

            if (options.elements === "one" || options.elements === 1 || options.element === "once")
                return (targetElm = document.querySelector(`${elem}`));
        }

        return (targetElm = document.querySelector(`${elem}`));
    };

    // ** adding style into the dom elements ** //
    globalFnObject.addDomStyle = function (elem, styleOptions) {
        const targetElm = _grabDocumentElements(elem, styleOptions);

        // ** if the target is not find then the function return nothing ** //
        if (!targetElm) return;

        // ** remove the elemtns property from the object if the elements poperty is removed from the object then we can easy loop over the object and add the styled into the dom element ** //
        delete styleOptions.elements;

        // ** creating the function for loop over the object and added the styled into the target element ** //
        const grabStyleOption = function (elem) {
            for (const styled in styleOptions) {
                elem.style[`${styled}`] = `${styleOptions[styled]}`;
            }
        };

        if (targetElm.length === undefined) {
            grabStyleOption(targetElm);
        } else {
            targetElm.forEach((el, i) => {
                grabStyleOption(el);
            });
        }
    };

    // ** animation text ** //
    globalFnObject.textAnimation = function (elem, options) {
        const target = _grabDocumentElements(elem, options);

        // ** grab the target element then replace the element tag into the span ** //
        target.innerHTML = target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // ** adding class every single span tag for adding css style and animation ** //
        const onTick = function () {
            const spanElm = document.querySelectorAll(".letter");
            const eachSpanELm = spanElm[char];
            eachSpanELm.classList.add("fade");

            char++;

            // ** if the spaan array length is end the the stop the animation and adding the class into the dom elements ** //
            if (char === spanElm.length) {
                clearInterval(timer);
                return;
            }
        };

        // ** loop animation function ** //
        let timer = setInterval(onTick, 50);
    };

    const _myLibraryFn = function () {
        // ** return the global object for the user can access the libray object ** //
        return globalFnObject;
    };

    // ** when the library object is undefined then return the libray object by calling the function ** //
    if (typeof window.livJs === "undefined") {
        window.livJs = _myLibraryFn();
    }
})(window);

// ** testing ** //

livJs.textAnimation(".ani_text");

// livJs.addDomStyle(".para", {
//     elements: "many",
//     color: "red",
//     fontSize: "20px",
//     cursor: "pointer",
// });
