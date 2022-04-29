(function (window) {
    "use strict";

    // ** store the all methods inside the object ** //
    const globalFnObject = {};

    // ** document selection function to grab the document from the dom return the values based on the conditon ** //
    const _grabDocumentElements = function (elem, options) {
        let targetElm;

        // ** if the user slided the multypal dopcument then select the element using the selectorAll **//
        if (options && options.elements) {

            if (options.elements === "many" || options.elements >= 2)
                return (targetElm = document.querySelectorAll(`${elem}`));


            if (options.elements === "one" || options.elements === 1)
                return (targetElm = document.querySelector(`${elem}`));
        }

        return (targetElm = document.querySelector(`${elem}`));
    };

    // ** animation text ** //
    globalFnObject.textAnimation = function (elem, options) {

        let loopCount = 0,
            fps = 100,
            loopReverse = false;

        const target = _grabDocumentElements(elem, options);

        // ** grab the target element then replace the element tag into the span ** //
        target.innerHTML = target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        const spanTag = _grabDocumentElements(".letter", { elements: "many" });

        // ** loop the animation count ** //
        function loopAnimationFunction() {

            if (loopCount === 100) {

                loopReverse = true;

            } else if (loopCount == 0) {

                loopReverse = false;
            }

            if (loopReverse) {

                loopCount--;

            } else {

                loopCount++;
            }

            // ** loop count number check function when the number is less then 9 then add to 00pad start into the loop count if the loop count is graterthen 99 then loop count is = 1 ** //
            const checkFunction = function () {

                if (loopCount >= 99) {

                    return 1

                } else if (loopCount <= 9) {

                    return `.${loopCount.toString().padStart(2, 0)}`

                } else if (loopCount >= 9) {

                    return `.${loopCount}`

                }
            }




            setTimeout(() => {

                requestAnimationFrame(loopAnimationFunction);
            }, 1000 / fps);
        };

        // ** grab the all span elements from the dom then loop over the span elemtns from tracking the each elements target and element index ** //
        spanTag.forEach((el, i) => {

            // el.style.opacity = checkFunction()
        })

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
