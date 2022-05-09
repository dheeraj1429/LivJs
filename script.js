(function (window) {
    "use strict";

    // ** store the all methods inside the object ** //
    const globalFnObject = {};

    // ** global variables ** //
    let targetElm,
        char = 0,
        allChar,
        domCreateElem;

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

    // ** bounce animation  ** //
    globalFnObject.loadingBounce = function (elem, option) {
        let target = _grabDocumentElements(elem);
        let ballNumbers = 6;

        // ** if there is no elements found then throw a new error on to console ** //
        if (!target) throw new Error(`slide text dom elements is not found!!`);

        const divElm = document.createElement("div");
        divElm.className = "bounce-div-element";

        for (const styled in option) {
            divElm.style[`${styled}`] = `${option[styled]}`;
        }

        for (let i = 0; i < ballNumbers; i++) {
            const innerDivElm = document.createElement("div");
            innerDivElm.className = "ball";

            if (i === 3 || i > 3) {
                innerDivElm.className = "shadow";
            }

            divElm.appendChild(innerDivElm);
        }

        target.replaceWith(divElm);
    };

    // ** slide options object ** //
    const slideOptionsFn = function (options) {
        const Option = {
            root: null,
            threshold: 0,
            rootMargin: `${options.rootMargin}px`,
        };

        return Option;
    };

    // ** observer function ** //
    const ObserverFunction = function (targetElem, observer) {
        // ** loop over all target elements ** //
        if (targetElem.length === undefined) {
            observer.observe(targetElem);
        } else {
            targetElem.forEach((el) => {
                observer.observe(el);
            });
        }
    };

    // ** IntersectionObsert function ** //
    const IntersectionFn = function (callback, option) {
        const observer = new IntersectionObserver(function (entries, observe) {
            entries.forEach((el, i, array) => {
                callback(el);
            });
        }, option);

        return observer;
    };

    // ** scroll function ** //
    const scrollFunction = function (el, targetElem, addClass, removeClass) {
        // ** grab the target from the el object ** //
        const target = el.target;

        if (!el.isIntersecting) {
            // ** if the element counte is one then add the class into the one element ** //
            target.classList.add(`${addClass}`);
            target.classList.remove(`${removeClass}`);

            // ** if there is multy elements then add the class for each element ** //
            if (!targetElem.length === undefined) {
                targetElem.forEach((elm) => {
                    elm.classList.add(`${addClass}`);
                    elm.classList.remove(`${removeClass}`);
                });
            }
        }

        if (el.isIntersecting) {
            target.classList.add(`${removeClass}`);
            target.classList.remove(`${addClass}`);

            if (!targetElem.length === undefined) {
                targetElem.forEach((el) => {
                    el.classList.add(`${removeClass}`);
                    el.classList.remove(`${addClass}`);
                });
            }
        }
    };

    // ** error function ** //
    const errorHandler = function () {
        throw new Error("DOM elements is not found");
    };

    // ** scroll down animation ** //
    globalFnObject.slide = function (elem, options) {
        const targetElem = _grabDocumentElements(elem, options);
        let IntersectionObsertFn;

        if (!targetElem || targetElem.length === 0) errorHandler();

        // ** animation options object ** //
        const Option = slideOptionsFn(options);

        // ** create the observer for targeting the dom elems section ** //
        if (options.slide === "slideUp" || options.slide === "top") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "fade_down", "fade_up");
            }, Option);
        } else if (options.slide === "slideRight" || options.slide === "right") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "fade_right", "fade_center");
            }, Option);
        } else if (options.slide === "slideDown" || options.slide === "down") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "fade_down_al", "fade_center_al");
            }, Option);
        } else if (options.slide === "slideLeft" || options.slide === "left") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "fade_slide_left", "fade_center");
            }, Option);
        }

        // ** observer fucntion to capture the target elem for each action fire ** //
        ObserverFunction(targetElem, IntersectionObsertFn);
    };

    // checking fucntions ** //
    const _checkClass = function (options, domCreateElem) {
        if (options.class) {
            domCreateElem.setAttribute("class", options.class);
        }
    };

    const _checkId = function (options, domCreateElem) {
        if (options.id) {
            domCreateElem.setAttribute("id", options.id);
        }
    };

    const _checkTextContent = function (options, domCreateElem) {
        if (options.textContent) {
            domCreateElem.textContent = options.textContent;
        }
    };

    const _checkDataTargetFunction = function (options, domCreateElem) {
        // ** setting the data attribute into the dom elements ** //
        if (options.dataAttribute) {
            const dataTargetValue = options.dataAttribute;
            const splitData = dataTargetValue.split(",");

            // ** set the attribute into the dom element ** //
            domCreateElem.setAttribute(`data-${splitData[0]}`, `${splitData[1].trim()}`);
        }
    };

    // ** convert the tags into the a tag if the tag has no link property then convert the tag into the a tag and then add the link into them ** //
    const _convertIntoATag = function (options, property) {
        const a = document.createElement("a");
        a.href = options.link;

        const domELem = document.createElement(property);

        // ** checking class function ** //
        _checkClass(options, domELem);

        // ** checking id function ** //
        _checkId(options, domELem);

        // ** checking inner text content function ** //
        _checkTextContent(options, domELem);

        // ** checking data target function ** //
        _checkDataTargetFunction(options, domELem);

        // ** insert the elements inside the a tag element ** //
        a.append(domELem);

        return a;
    };
    // checking fucntions ** //

    // ** creat the dom elements  ** //
    globalFnObject.createDomElements = function (elem, options) {
        const targetDiv = _grabDocumentElements(elem);

        if (!targetDiv) return;

        // ** creating dom elements ** //
        for (const property in options) {
            // ** first we want to ceate the element then if there is a option object to add the classes and text content the add the class and content into that div ** //
            domCreateElem = document.createElement(property);

            // ** checking class function ** //
            _checkClass(options[property], domCreateElem);

            // ** checking id function ** //
            _checkId(options[property], domCreateElem);

            // ** checking inner text content function ** //
            _checkTextContent(options[property], domCreateElem);

            // ** checking data target function ** //
            _checkDataTargetFunction(options[property], domCreateElem);

            // ** setting the link && herf tag into the dom element ** //
            if (options[property].link) {
                // ** first we want to check the element is the 'a' tag if the element is 'a' tag then add the link to it, if the elements is not 'a' tag then first creat the a tag an place the element into the a tag and then add the link to into the a tag ** //
                if (property === "a") {
                    domCreateElem.setAttribute("href", options[property].link);
                } else {
                    domCreateElem = _convertIntoATag(options[property], property);
                }
            }

            // ** checking inner elements ** //
            if (options[property].innerElements) {
                for (const innerElementProperty in options[property].innerElements) {
                    let key = innerElementProperty;
                    let value = options[property].innerElements[innerElementProperty];

                    // ** creating a dom element ** //
                    let innerDomElements = document.createElement(key);

                    // ** checking class function ** //
                    _checkClass(value, innerDomElements);

                    // ** checking id function ** //
                    _checkId(value, innerDomElements);

                    // ** checking inner text content function ** //
                    _checkTextContent(value, innerDomElements);

                    // ** checking data target function ** //
                    _checkDataTargetFunction(value, innerDomElements);

                    if (value.link) {
                        if (key === "a") {
                            innerDomElements.setAttribute("href", value.link);
                        } else {
                            // convert into a tag...
                            innerDomElements = _convertIntoATag(value, key);
                        }
                    }

                    // ** insert the creating elements into the parent div elements ** //
                    domCreateElem.append(innerDomElements);
                }
            }

            // ** inserting the dom elements into the target element ** //
            targetDiv.insertAdjacentElement("beforeend", domCreateElem);
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
