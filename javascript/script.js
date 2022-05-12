(function (window) {
    "use strict";

    // ** store the all methods inside the object ** //
    const globalFnObject = {};

    // ** global variables ** //
    let char = 0,
        domCreateElem,
        IntersectionObsertFn,
        targetElm,
        dataAttribute,
        domTarget;

    // ** error function ** //
    const errorHandler = function (error) {
        throw new Error(error);
    };

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
        if (!targetElm) errorHandler("DOM elements is not find");

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

        if (!target) errorHandler("DOM elements is not find");

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
            entries.forEach((el) => {
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
            target.classList.add(`${addClass}`);

            target.classList.remove(`${removeClass}`);
        }

        // ** if the target is intersecting the dom ** //
        if (el.isIntersecting) {
            target.style.transition = "all 0.5s ease";

            target.classList.add(`${removeClass}`);

            target.classList.remove(`${addClass}`);
        }
    };

    // ** scroll down animation ** //
    globalFnObject.animation = function (elem, options) {
        const targetElem = _grabDocumentElements(elem, options);

        if (!targetElem || targetElem.length === 0) errorHandler('"DOM elements is not find"');

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
        } else if (options.zoom === "fade-zoom" || options.zoom === "zoom") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "zoom_hide", "zoom_none");
            }, Option);
        } else if (options.zoom === "zoom-reverse") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "zoom_reverse", "zoom_none");
            }, Option);
        } else if (options.zoom === "fade") {
            IntersectionObsertFn = IntersectionFn((el) => {
                scrollFunction(el, targetElem, "zoom-fade", "zoom_none");
            }, Option);
        }

        // ** observer fucntion to capture the target elem for each action fire ** //
        ObserverFunction(targetElem, IntersectionObsertFn);
    };

    // ** capture the class is present if the elements have the class then renove the class from the elements else add the class into the element ** //
    const checkClassIsPresent = function (target, options) {
        if (options.toogleClass) {
            if (target.classList.contains(options.toogleClass)) {
                target.classList.remove(options.toogleClass);
            } else {
                target.classList.add(options.toogleClass);
            }
        }
    };

    // ** toggle function ** //
    globalFnObject.toggle = function (element, options) {
        const target = _grabDocumentElements(element);

        if (!target) errorHandler("DOM elements is not find");

        if (options.clickTarget) {
            const clickTargetElem = _grabDocumentElements(options.clickTarget, options);

            if (clickTargetElem.length === undefined) {
                clickTargetElem.addEventListener("click", function () {
                    checkClassIsPresent(target, options);
                });
            } else {
                clickTargetElem.forEach((el, i, array) => {
                    el.addEventListener("click", function () {
                        checkClassIsPresent(target, options);
                    });
                });
            }
        }

        checkClassIsPresent(target, options);
    };

    // ** mouse hover effect ** //
    globalFnObject.mouse = function (element, options) {
        const target = _grabDocumentElements(element, options);

        if (!target) errorHandler("DOM elements is not find");

        // ** remove the animation in 3s ** //
        const removeAnimationFn = function (element, attribute) {
            window.setTimeout(function () {
                element.classList.remove("animated", "infinite", attribute);
            }, 3000);
        };

        if (target.length === undefined) {
            target.addEventListener(options.event ? options.event : "mouseenter", function () {
                dataAttribute = target.getAttribute("data-animation");

                target.classList.add("animated", "infinite", dataAttribute);

                removeAnimationFn(target, dataAttribute);
            });
        } else {
            // ** if there is the multypal dom elements then loop over the dom elements and add the animation classes for each element dynamic but if there is only on element then add the class into that element ** //
            target.forEach((el, i, array) => {
                el.addEventListener(options.event ? options.event : "mouseenter", function (e) {
                    dataAttribute = e.target.getAttribute("data-animation");

                    e.target.classList.add("animated", "infinite", dataAttribute);

                    removeAnimationFn(e.target, dataAttribute);
                });
            });
        }
    };

    // ** animation effect ** //
    globalFnObject.animate = function (element, options) {
        domTarget = _grabDocumentElements(element, options);

        if (!domTarget) errorHandler("DOM elements is not find");

        return this;
    };

    // ** animation checking funtion ** //
    const _checkAnimationCount = function (options, element) {
        if (!options.animation) return;

        if (options.animation === "infinite" || options.animation === "loop") {
            element.classList.add("infinite");
        } else if (options.animation === "one" || options.animation === 1) {
            element.classList.add("repeat-1");
        } else {
            element.classList.add(`repeat-${options.animation}`);
        }
    };

    const _checkAnimationClass = function (options, element) {
        if (!options.animate) return;

        element.classList.add(options.animate);
    };

    const _checkAnimationDelay = function (options, element) {
        if (!options.delay) return;

        element.classList.add(`delay-${options.delay}`);
    };

    const _checkEventClassFn = function (options, element) {
        if (!options.event) return;

        element.classList.add(`${options.event}`);
    };

    globalFnObject.add = function (options) {
        // ** add all styled in the dom target element ** //
        if (options === undefined) return;

        if (!domTarget) errorHandler("DOM elements is not find");

        if (Object.keys(options).length === 0) return;

        domTarget.classList.add("animated");

        // ** check the animation loop ** //
        _checkAnimationCount(options, domTarget);

        // ** check the animation class in the object ** //
        _checkAnimationClass(options, domTarget);

        // ** check animation delay function ** //
        _checkAnimationDelay(options, domTarget);

        // ** check the event class function ** //
        _checkEventClassFn(options, domTarget);

        console.log(domTarget);

        return this;
    };

    // checking fucntions ** //
    const _checkClass = function (options, domCreateElem) {
        if (!options.class) return;

        domCreateElem.setAttribute("class", options.class);
    };

    const _checkId = function (options, domCreateElem) {
        if (!options.id) return;

        domCreateElem.setAttribute("id", options.id);
    };

    const _checkTextContent = function (options, domCreateElem) {
        if (!options.textContent) return;

        domCreateElem.textContent = options.textContent;
    };

    const _checkDataTargetFunction = function (options, domCreateElem) {
        if (!options.dataAttribute) return;

        // ** setting the data attribute into the dom elements ** //
        options.dataAttribute.forEach((el, i, array) => {
            for (const property in el) {
                // ** set the attribute into the dom element ** //
                domCreateElem.setAttribute(`data-${property}`, `${el[property].trim()}`);
            }
        });
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

    // ** create the dom elements  ** //
    globalFnObject.CreateElements = function (injectElementTarget, element, options) {
        // ** grab the parent element ** //
        const target = _grabDocumentElements(injectElementTarget);

        if (!target) errorHandler("DOM elements is not find");

        let domELementCreate = document.createElement(element);

        // ** checking class function ** //
        _checkClass(options, domELementCreate);

        // ** checking id function ** //
        _checkId(options, domELementCreate);

        // ** checking inner text content function ** //
        _checkTextContent(options, domELementCreate);

        // ** checking data target function ** //
        _checkDataTargetFunction(options, domELementCreate);

        // console.log(target);
        // console.log(domELementCreate);

        // ** setting the link && herf tag into the dom element ** //
        if (options.link) {
            // ** first we want to check the element is the 'a' tag if the element is 'a' tag then add the link to it, if the elements is not 'a' tag then first creat the a tag an place the element into the a tag and then add the link to into the a tag ** //
            if (element === "a") {
                domELementCreate.setAttribute("href", options.link);
            } else {
                domELementCreate = _convertIntoATag(options, element);
            }
        }

        // ** inject the create element into the select element ** //
        target.appendChild(domELementCreate);

        // ** if there is a inner elements object then craete all the inner elements and inject into the parent elements ** //
        if (!options.parentInnerElements) return;

        options.parentInnerElements.forEach((el, i, array) => {
            if (Object.keys(el).length === 0) errorHandler("inner elements array is empty");

            if (!el.element) errorHandler("DOM element tag name is required");

            let innerElementCreate = document.createElement(el.element);

            // ** checking class function ** //
            _checkClass(el, innerElementCreate);

            // ** checking id function ** //
            _checkId(el, innerElementCreate);

            // ** checking inner text content function ** //
            _checkTextContent(el, innerElementCreate);

            // ** checking data target function ** //
            _checkDataTargetFunction(el, innerElementCreate);

            if (el.link) {
                if (el.element === "a") {
                    innerElementCreate.setAttribute("href", el.link);
                } else {
                    innerElementCreate = _convertIntoATag(el, el.element);
                }
            }

            // ** the parent inner elements property is inject the elements into the injectTargetElement div which is the target element in root ** //
            target.appendChild(innerElementCreate);
        });
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
