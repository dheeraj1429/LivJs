(function (window) {
    "use strict";

    // ** store the all methods inside the object ** //
    const globalFnObject = {};

    // ** global variables ** //
    let targetElm,
        char = 0,
        allChar;

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

    // ** convert the text into the span element ** //
    const _convertSpanFn = function (elem) {
        const span = elem.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        return span;
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
        target.innerHTML = _convertSpanFn(target);

        // ** adding class every single span tag for adding css style and animation ** //
        const onTick = function (event) {
            const spanElm = document.querySelectorAll(".letter");

            const eachSpanELm = spanElm[char];

            eachSpanELm.classList[`${event}`]("fade");

            char++;

            // ** if the spaan array length is end the the stop the animation and adding the class into the dom elements ** //
            if (char === spanElm.length) {
                clearInterval(timer);

                return;
            }
        };

        // ** loop animation function ** //
        let timer = setInterval(() => {
            onTick("add");
        }, 50);
    };

    // checking fucntions ** //
    const checkClass = function (options, domCreateElem) {
        if (options.class) {
            domCreateElem.setAttribute("class", options.class);
        }
    };

    const checkId = function (options, domCreateElem) {
        if (options.id) {
            domCreateElem.setAttribute("id", options.id);
        }
    };

    const checkTextContent = function (options, domCreateElem) {
        if (options.textContent) {
            domCreateElem.textContent = options.textContent;
        }
    };

    const checkDataTargetFunction = function (options, domCreateElem) {
        // ** setting the data attribute into the dom elements ** //
        if (options.dataAttribute) {
            const dataTargetValue = options.dataAttribute;
            const splitData = dataTargetValue.split(",");

            // ** set the attribute into the dom element ** //
            domCreateElem.setAttribute(`data-${splitData[0]}`, `${splitData[1].trim()}`);
        }
    };
    // checking fucntions ** //

    // ** creat the dom elements  ** //
    globalFnObject.createDomElm = function (elem, options) {
        const targetDiv = _grabDocumentElements(elem);

        if (!targetDiv) return;

        // ** creating dom elements ** //
        for (const property in options) {
            // ** first we want to ceate the element then if there is a option object to add the classes and text content the add the class and content into that div ** //
            let domCreateElem = document.createElement(property);

            // ** checking class function ** //
            checkClass(options[property], domCreateElem);

            // ** checking id function ** //
            checkId(options[property], domCreateElem);

            // ** checking inner text content function ** //
            checkTextContent(options[property], domCreateElem);

            // ** checking data target function ** //
            checkDataTargetFunction(options[property], domCreateElem);

            // ** setting the link && herf tag into the dom element ** //
            if (options[property].link) {
                // ** first we want to check the element is the 'a' tag if the element is 'a' tag then add the link to it, if the elements is not 'a' tag then first creat the a tag an place the element into the a tag and then add the link to into the a tag ** //

                if (property === "a") {
                    domCreateElem.setAttribute("href", options[property].link);
                } else {
                    const a = document.createElement("a");
                    a.href = options[property].link;

                    const domELem = document.createElement(property);

                    // ** checking class function ** //
                    checkClass(options, property, domELem);

                    // ** checking id function ** //
                    checkId(options, property, domELem);

                    // ** checking inner text content function ** //
                    checkTextContent(options, property, domELem);

                    // ** checking data target function ** //
                    checkDataTargetFunction(options, property, domELem);

                    // ** insert the elements inside the a tag element ** //
                    a.append(domELem);

                    domCreateElem = a;
                }
            }

            // ** inserting the dom elements into the target element ** //
            targetDiv.insertAdjacentElement("beforeend", domCreateElem);

            // ** checking inner elements ** //
            if (options[property].innerElements) {
                for (const innerElementProperty in options[property].innerElements) {
                    let key = innerElementProperty;
                    let value = options[property].innerElements[innerElementProperty];

                    // ** creating a dom element ** //
                    let innerDomElements = document.createElement(key);

                    // ** checking class function ** //
                    checkClass(value, innerDomElements);

                    // ** checking id function ** //
                    checkId(value, innerDomElements);

                    // ** checking inner text content function ** //
                    checkTextContent(value, innerDomElements);

                    // ** checking data target function ** //
                    checkDataTargetFunction(value, innerDomElements);

                    console.log(innerDomElements);
                }
            }
        }
    };

    // ** return the global object for the user can access the libray object ** //
    const _myLibraryFn = function () {
        return globalFnObject;
    };

    // ** when the library object is undefined then return the libray object by calling the function ** //
    if (typeof window.livJs === "undefined") {
        window.livJs = _myLibraryFn();
    }
})(window);

// ** testing ** //

// for animation text
// livJs.textAnimation(".lvText");

// adding dom style
// livJs.addDomStyle(".lvText", {
//     color: "red",
//     fontSize: "10px",
// });

// creating dom elements
// livJs.createDomElm(".para", {
//     div: {
//         class: "documents",
//         textContent: "demo data",
//         id: "demo-div",
//         dataAttribute: "target, some-data",
//     },
//     p: {
//         class: "para",
//         textContent: "this is some deta for learnig somthing new",
//         dataAttribute: "speen, speen-data",
//         link: "www.google.com",
//     },
//     a: {
//         textContent: "some demo new text",
//     },
// });

livJs.createDomElm(".para", {
    div: {
        class: "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4",
        dataAttribute: "target, some-dataTarget",
        innerElements: {
            p: {
                class: "para",
                textContent: "some demo content",
            },
            div: {
                class: "row",
                textContent: "new text content",
            },
            h1: {
                class: "heading",
                textContent: "some heading class",
                dataAttribute: "target, heading-target",
            },
        },
    },
    p: {
        class: "para-heading",
        dataAttribute: "target,some-target",
        innerElements: {
            a: {
                class: "link",
                textContent: "some demo text",
            },
            p: {
                class: "demo_para",
                id: "new-elem",
                textContent: "demo content",
            },
        },
    },
});
