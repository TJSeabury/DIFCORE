/*
 * Core scripts
 * @author DIF Design http://difdesign.com/
 * @version 0.3.1
 */


let DIFDesignCoreUtilities = new DIFDESIGNCOREUTILITIES();
DIFDesignCoreUtilities.announceReady();

function DIFDESIGNCOREUTILITIES() {
    'use strict';

    let self = this;

    /*
     * Handy-Dandy nifty properties
     */
    window.addEventListener('resize', () => {
        this.W = document.body.clientWidth;
        this.H = document.body.clientHeight;
    });
    window.dispatchEvent(new Event('resize'));

    /*
     *
     * !! TODO !!
     *
     * Overlord will, in the future, replace event listeners for most use cases.
     * !! This is still in development and should not be considered anything other than experimental,
     * be expected to function properly, or at all. !!
     * @Use - Don't, not yet.
     */
    this.eyeOfSauron = new EyeOfSauron();
    function EyeOfSauron(subject) {
        this.watchers = [];

        /*
        * { name, target, callback }
        */
        this.regard = function(obj) {
            let ob = new MutationObserver( mutations => {
                for ( let m = 0; m < mutations.length; ++m ) {

                }
                // Object.prototype.toString.call( mutation.addedNodes[i] ) === '[object HTMLDivElement]'
            });

            observer.observe( document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });

        }

    }
    /*
     *
     * !! TODO !!
     *

     Pick this apart and make it modular and usable in general.
     The secret to overlord is within our grasp; we need but seize it.

     //Animate testimonials on home page

     if ( document.body.classList.contains('home') ) {
     let testimonials, slider, start = performance.now(), now = start;
     do {
     now = performance.now();
     testimonials = document.getElementsByClassName('testimonials')[0];
     } while ( testimonials === undefined && ( now - start < 5000 ) );
     if ( testimonials !== undefined ) {

     } else {
     console.error('Testimonials does not exist.');
     }
     }
     function intiSlider(el) {
     let slides = el.getElementsByClassName('vc_grid-item');
     el.style.display = 'flex';
     el.style.width = el.offsetWidth * slides.length + 'px';
     el.style.transition = '1s ease-in-out all';
     el.parentElement.style.overflow = 'hidden';
     el.active = 0;
     el.slides = slides.length;
     el.slideWidth = 100 / el.slides;
     for ( let s = 0; s < el.slides; ++s ) {
     slides[s].style.flexBasis = el.slideWidth + '%';
     }
     el.slide = function() {
     el.active = ( el.active < el.slides - 1 ) ? el.active + 1 : 0;
     el.style.transform = 'translateX('+ ( -1 * ( el.slideWidth * el.active ) ) +'%)';
     };
     return el;
     }

     */

    /*
     *
     * !! TODO !!
     *

     add some custom logging methods that use these styles.

     const red = 'padding: 8px 0; color: #ed4b37; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
     green = 'padding: 8px 0; color: #21b15c; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
     blue = 'padding: 8px 0; color: #1c80bf; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
     grey = 'padding: 8px 0; color: #444; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
     lightGrey = 'padding: 8px 0; color: hsla(220,15%,60%,1); font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);';
     console.log('%c D%cI%cF%cDesign%c:%cCoreUtilities %c> %cReady ',red,green,blue,lightGrey,grey,blue,grey,green);

     */


    /*
     *
     * !! TODO !!
     *
     Research and implement a system for catching errors and reporting them to a single point of collection.

     */

    /*

     I did some interesting things in this block of code. Most importantly the promises should be studied and made into some sort method
     that can be integrated here to make asynchronous scripting easier.
     Also of note is XHR get and DOM parsing. Need to implement both of those into methods also.

     *
     * Injects the agents into the agentFeed section on the home page.
     *
     if ( document.body.classList.contains('home') ) {
     let agentsFeed;
     do {
     agentsFeed = document.getElementById('agentsFeed');
     } while ( !agentsFeed );
     D.pull('http://difdev.com/gallagher/agent-list/')
     .then( data => {
     *
     * Intrasite XHR get the agents listing page and parse the
     * response doc to be scraped for content.
     *
     let parser = new DOMParser(),
     doc = parser.parseFromString(data.documentElement.innerHTML, 'text/html'),
     main = doc.getElementById('ihf-main-container');
     main = main.getElementsByClassName('row')[0];
     main.id = 'agentsWrapper';
     return main;
     }).then( wrapper => {
     wrapper.classList.remove('mt-25');
     let agents;
     do {
     agents = wrapper.children;
     } while ( !agents );
     *
     * Mash up all the elements, scrub default classes/styles,
     * replace with new classes. Remove un-needed elements.
     *
     for ( let i = 0; i < agents.length; ++i ) {
     agents[i].classList.remove('col-sm-6','mt-10');
     agents[i].classList.add('agent');
     agents[i].getElementsByClassName('clearfix')[0].parentNode.removeChild(agents[i].getElementsByClassName('clearfix')[0]);
     let divs = agents[i].getElementsByClassName('pull-left');
     for ( let d = 0; d < divs.length; ++d ) {
     if ( divs[d].classList.contains('mr-10') && divs[d].classList.contains('pull-left') ) {
     divs[d].classList.add('image');
     divs[d].classList.remove('mr-10','pull-left');
     }
     if ( divs[d].classList.contains('pull-left') ) {
     divs[d].classList.add('meta');
     divs[d].classList.remove('pull-left');
     }
     }
     agents[i].innerHTML = agents[i].getElementsByClassName('thumbnail')[0].innerHTML;
     let img = agents[i].getElementsByTagName('img')[0],
     imgSrc;
     if ( img && img.src ) {
     imgSrc = img.src;
     img.parentNode.removeChild(img);
     let link = agents[i].getElementsByClassName('image')[0].getElementsByTagName('a')[0];
     link.style.backgroundImage = 'url('+imgSrc+')';
     }
     let meta = agents[i].getElementsByClassName('meta')[0];
     if ( meta.getElementsByClassName('ihf_officeroster_agent_designation')[0] ) {
     meta.removeChild(meta.getElementsByClassName('ihf_officeroster_agent_designation')[0]);
     }
     if ( meta.getElementsByClassName('ihf_officeroster_agent_email')[0] ) {
     meta.removeChild(meta.getElementsByClassName('ihf_officeroster_agent_email')[0]);
     }
     let brs = meta.getElementsByTagName('br');
     for ( let b = 0; b < brs.length; ++b ) {
     brs[b].parentNode.removeChild(brs[b]);
     }
     }
     *
     * Shuffle the agents. Pull agents into array for later use.
     *
     let agentNodes = [];
     for ( let i = agents.length; i >= 0; --i ) {
     let rnum = Math.random() * i | 0;
     if ( agents[rnum] !== undefined ) {
     agentNodes.push(agents[rnum]);
     agents[rnum].remove();
     }
     }
     *
     * Inject the first three rows of agent nodes back into agentsWrapper.
     *
     const agentSize = agentResizer();
     for ( let a = 0; a < agentNodes.length; ++a) {
     agentNodes[a].style.flexBasis = agentSize.width + '%';
     agentNodes[a].style.height = 'calc(' + agentSize.width + 'vw * 1.4)';
     }
     for ( let i = agentSize.columns * 3 - 1; i >= 0; --i) {
     wrapper.appendChild(agentNodes.shift());
     }
     *
     * Insert the agentsWrapper into agentsFeed section.
     *
     agentsFeed.appendChild(wrapper);
     return agentNodes;
     }).then( agents => {
     *
     * Inject the load more button and attatch its functionality.
     * Attatch handlers for window resizing.
     *
     const wrapper = document.getElementById('agentsWrapper');
     wrapper.expanded = false;
     wrapper.agentsHopper = agents;
     agents = null;
     let loadMore = document.createElement('div');
     loadMore.classList.add('loadMoreAgents');
     loadMore.innerHTML = 'VIEW MORE';
     agentsFeed.appendChild(loadMore);
     loadMore.addEventListener('click', () => {
     expandAgents();
     wrapper.expanded = true;
     loadMore.remove();
     });
     loadMore.addEventListener('touchstart', () => {
     expandAgents();
     wrapper.expanded = true;
     loadMore.remove();
     });
     window.addEventListener('resize', () => {
     const size = agentResizer();
     agentsWrapperRespond(size);
     if ( wrapper.expanded !== true ) {
     loadMore.style.width = size.width + '%';
     loadMore.style.height = 'calc(' + size.width + 'vw * 1.4)';
     }
     });
     window.dispatchEvent(new Event('resize'));
     function expandAgents() {
     for ( let a = wrapper.agentsHopper.length; a >= 0; --a ) {
     const agent = wrapper.agentsHopper.shift();
     if ( agent ) {
     wrapper.appendChild(agent);
     }
     }
     }
     function agentsWrapperRespond(size) {
     const visibleAgents = wrapper.children;
     const nAgentsInView = size.columns * 3;
     for ( let a = 0; a < wrapper.agentsHopper.length; ++a ) {
     wrapper.agentsHopper[a].style.flexBasis = size.width + '%';
     wrapper.agentsHopper[a].style.height = 'calc(' + size.width + 'vw * 1.4)';
     }
     for ( let a = visibleAgents.length - 1; a >= 0; --a ) {
     visibleAgents[a].style.flexBasis = size.width + '%';
     visibleAgents[a].style.height = 'calc(' + size.width + 'vw * 1.4)';
     }
     if ( wrapper.expanded !== true ) {
     if ( visibleAgents.length > nAgentsInView ) {
     while ( visibleAgents.length > nAgentsInView ) {
     const agent = wrapper.removeChild(visibleAgents[visibleAgents.length - 1]);
     wrapper.agentsHopper.push(agent);
     }
     } else {
     while ( visibleAgents.length < nAgentsInView ) {
     const agent = wrapper.agentsHopper.shift();
     wrapper.appendChild(agent);
     }
     }
     }
     }
     }).catch( data => {
     console.log(data);
     });
     }
     function agentResizer() {
     let agentWidth = null,
     columns = null;
     const minWidth = 212;
     if ( D.W / 2 < minWidth ) {
     agentWidth = 100;
     columns = 1;
     } else if ( D.W / 3 < minWidth ) {
     agentWidth = 50;
     columns = 2;
     } else if ( D.W / 4 < minWidth ) {
     agentWidth = 33.33333;
     columns = 3;
     } else if ( D.W / 6 < minWidth ) {
     agentWidth = 25;
     columns = 4;
     } else if ( D.W / 8 < minWidth ) {
     agentWidth = 16.66667;
     columns = 6;
     } else {
     agentWidth = 12.5;
     columns = 8;
     }
     return {
     width: agentWidth,
     columns: columns
     };
     }

     */

    /*
     * Useful polyfill I found, though it might not be needed for much longer.
     *
     * !! TODO !!
     *
     * It would be wise to study its implementation and maybe integrate it.
     */
    polyfill();
    function polyfill() {
        let w = window,
            d = w.document;
        if (w.onfocusin === undefined) {
            d.addEventListener('focus', addPolyfill, true);
            d.addEventListener('blur', addPolyfill, true);
            d.addEventListener('focusin', removePolyfill, true);
            d.addEventListener('focusout', removePolyfill, true);
        }
        function addPolyfill(e) {
            let type = e.type === 'focus' ? 'focusin' : 'focusout',
                event = new window.CustomEvent(type, {bubbles: true, cancelable: false});
            event.c1Generated = true;
            e.target.dispatchEvent(event);
        }

        function removePolyfill(e) {
            if (!e.c1Generated) {
                d.removeEventListener('focus', addPolyfill, true);
                d.removeEventListener('blur', addPolyfill, true);
                d.removeEventListener('focusin', removePolyfill, true);
                d.removeEventListener('focusout', removePolyfill, true);
            }
            setTimeout(function () {
                d.removeEventListener('focusin', removePolyfill, true);
                d.removeEventListener('focusout', removePolyfill, true);
            });
        }
    }

    /*
    * Validate links.
    */
    this.validateLinks = function() {
        return new Promise( (resolve, reject) => {
            let links = document.getElementsByTagName('a'),
                valid = [],
                broken = [];
            for ( let a = 0; a < links.length; ++a ) {
                if ( links[a].getAttribute('href') !== undefined ) {
                    if ( links[a].getAttribute('href').replace(links[a].baseURI, '') === '#' ) {
                        broken.push(links[a]);
                    } else {
                        valid.push(links[a]);
                        // and follow link to see if valid, but I'll write that later because
                        // that functionality will require get requests and DOM parsing, and I
                        // don't feel like doing all that right now.
                    }
                } else {
                    broken.push(links[a]);
                }
            }
            resolve(valid);
            reject(broken);
        });
    };

    /*
     * Handles form ui animations
     *
     * !! TODO !!
     *
     * This is usefull but needs to be more generalized.
     */
    window.addEventListener('load', () => {
        let fields = document.getElementsByClassName('dif_movingLabel');

        function focusedState(element) {
            element.addEventListener('focusin', (e) => {
                let a = e.target.parentElement.previousElementSibling;
                a.style.transform = 'translateY(-50%)';
                a.style.opacity = 0.3;
            }, true);
        }

        function blurredState(element) {
            element.addEventListener('focusout', (e) => {
                if (e.target.value === '') {
                    let a = e.target.parentElement.previousElementSibling;
                    a.style.transform = 'translateY(0%)';
                    a.style.opacity = 1.0;
                }
            }, true);
        }

        for (let f = 0; f < fields.length; ++f) {
            focusedState(fields[f]);
            blurredState(fields[f]);
        }
    });

    /*
     * Set any section tagged with the class 'dif_fullHeight' or 'dif_halfHeight'
     * to the height of the viewport or half that respectively.
     *
     * !! TODO !!
     *
     * Very usefull, make it more robust and integrate.
     */
    window.addEventListener('resize', () => {
        let fullHeightSections = document.getElementsByClassName('dif_fullHeight'),
            halfHeightSections = document.getElementsByClassName('dif_halfHeight'),
            wpBarH = document.getElementById('wpadminbar'),
            header = document.getElementsByClassName('mk-header')[0];
        wpBarH = wpBarH ? wpBarH.offsetHeight : 0;
        header = header ? header.offsetHeight : 0;
        for ( let fhs = 0; fhs < fullHeightSections.length; ++fhs ) {
            if ( fullHeightSections[fhs].classList.contains('dif_firstFullHeight') ) {
                fullHeightSections[fhs].style.marginTop = header + 'px';
                fullHeightSections[fhs].style.minHeight = self.H - wpBarH - header + 'px';
            } else {
                fullHeightSections[fhs].style.minHeight = self.H - wpBarH + 'px';
            }
        }
        for ( let hhs = 0; hhs < halfHeightSections.length; ++hhs ) {
            halfHeightSections[hhs].style.minHeight = self.H / 2 - wpBarH + 'px';
        }
    });
    window.dispatchEvent(new Event('resize'));
    window.addEventListener('load', () => {
        window.dispatchEvent(new Event('resize'));
    });

    /*
     *
     * !! TODO !!
     *
     * Cross-browser implementation of element.addEventListener()
     * @param {function Array} fu -
     * @param {String} target -
     * @param {String} event -
     * @Use listen(function, 'target', 'event');
     */
    this.listen = function (fu, target = 'window', event = 'load') {
        let listeners = new Promise((resolve, reject) => {
            let validFunctions = [],
                invalidFunctions = [];
            if (Array.isArray(fu)) {
                for (let i = 0; i < fu.length; ++i) {
                    if (typeof fu[i] === 'function') {
                        validFunctions.push(fu[i]);
                    } else {
                        invalidFunctions.push(fu[i]);
                    }
                }
            } else if (typeof fu === 'function') {
                validFunctions.push(fu);
            }
            else {
                invalidFunctions.push(fu);
            }
            resolve(validFunctions);
            reject(invalidFunctions);
        });
        listeners.then((valid) => {
            for (let i = 0; i < valid.length; ++i) {
                if (window.addEventListener) { // W3C DOM
                    target.addEventListener(event, valid[i], false);
                } else if (window.attachEvent) { // IE DOM
                    target.attachEvent('onload', valid[i]);
                }
            }
        }).catch((rejected) => {
            for (let i = 0; i < rejected; ++i) {
                console.error(rejected[i] + " is not a function!");
            }
        });
    };

    /*
     *
     * !! TODO !!
     *
     * Basically just shitty jQuery.
     * @param {String} target - Takes a css selector or an array of css selectors.
     * @todo - Finish and make it actually work.
     */
    this.get = function (target = ['document']) {
        let gotten = [];
        try {
            if (Array.isArray(target)) {
                target.forEach((query) => {
                    let firstChar = String(query.charAt(0));
                    if (firstChar === '#') {
                        query = query.replace('#', '');
                        [].forEach.call(document.getElementById(query), (el) => {
                            gotten.push(el);
                        });
                    } else if (firstChar === '.') {
                        query = query.replace('.', '');
                        [].forEach.call(document.getElementsByClassName(query), (el) => {
                            console.log('is class');
                            gotten.push(el);
                        });
                    } else {
                        if (query === 'document' || query === 'doc') {
                            gotten.push(document.documentElement);
                        } else if (query === 'body') {
                            gotten.push(document.body);
                        } else {
                            [].forEach.call(document.getElementsByTagName(query), (el) => {
                                gotten.push(el);
                            });
                        }
                    }
                });
            }
        } catch (e) {
            console.error('DIFCOREUTILITIES.get() failed: ' + e);
        }
        return ( gotten.length > 0 ? gotten : null );
    };

    /*
     *
     * !! TODO !!
     *
     * Directly manipulate stylesheets instead on inline styles.
     * @todo - this needs to be modified to get existing stylesheets
     * @research - is this actually faster, better, harder, or stronger? use cases?
     */
    this.mutate = function (element, rules) {
        let styleElement = document.createElement('style'),
            styleSheet;
        document.head.appendChild(styleElement);
        styleSheet = styleElement.sheet;
        for (let i = 0, rl = rules.length; i < rl; i++) {
            let j = 1,
                rule = rules[i],
                selector = rules[i][0],
                propStr = '';
            // If the second argument of a rule is an array of arrays, correct our variables.
            if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
                rule = rule[1];
                j = 0;
            }
            for (let pl = rule.length; j < pl; j++) {
                let prop = rule[j];
                propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
            }
            styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
        }
    };

    /*
     * Simple XHR GET that returns a promise to allow chaining and,
     * properly handle asynchronus behavior of XHR.
     * @param {String} source - The source URL.
     */
    this.pull = function (source) {
        return new Promise((resolve, reject) => {
            let r = new XMLHttpRequest();
            r.responseType = "document";
            r.open("get", source);
            r.onload = () => {
                if (r.readyState === r.DONE && ( r.status >= 200 && r.status <= 300 )) {
                    resolve(r.response);
                } else {
                    reject({status: this.status, statusText: r.statusText});
                }
            };
            r.onerror = () => {
                reject({status: this.status, statusText: r.statusText});
            };
            r.send(null);
        });
    };


    /*
     * Rounds a number to the specified decimal place obviously.
     * This doesn't support rounding whole numbers. Use Math.round() for that.
     * @param {float} rnum - The decimal number.
     * @param {int} rlength - The decimal places to round to.
     */
    this.round = function (rnum, rlength) {
        return Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    };

    this.getOpposite = function (angle, adjacent) {
        return adjacent * Math.tan(angle * Math.PI / 180);
    };

    /*
     * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
     * @param {String} text - The text to be rendered.
     * @param {String} font  - The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
     */
    this.getTextWidth = function (text, font) {
        let canvas = canvas || document.createElement('canvas');
        let context = canvas.getContext("2d");
        context.font = font;
        let metrics = context.measureText(text);
        return metrics.width;
    };

    /*
     * Strips all the classes, except classes specified to be ignored,
     * from the element and all it's children if recursive is enabled.
     * @param {Element} el - The element to be stripped of classes.
     * @param {String Array} ignores - The prefixes of classes, or just classes, to be ignored.
     * @param {boolean} recursive - True to also strip classes from the element's children.
     */
    this.stripClasses = function (el, ignores = [], recursive = true) {
        if (el.classList.length > 0) {
            [].forEach.call(el.classList, (className) => {
                className = String(className);
                if (ignores.length > 0) {
                    // where cn is the nth class of classList
                    for (let cn = 0; cn < el.classList.length; ++cn) {
                        let ignore = false;
                        // where ig is the nth String of ignores
                        for (let ig = 0; ig < ignores.length; ++ig) {
                            if (String(el.classList[cn]).includes(ignores[ig])) {
                                ignore = true;
                            }
                        }
                        if (!ignore) {
                            el.classList.remove(className);
                        }
                    }
                } else {
                    el.classList.remove(className);
                }
            });
        }
        if (el.hasChildNodes && recursive) {
            [].forEach.call(el.children, (child) => {
                this.stripClasses(child, ignores, recursive);
            });
        }
    };

    function scrollToElement(target, duration, callback = null) {
        let scrollUp = false,
            scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            targetTop = target.getBoundingClientRect().top + scrollTop,
            distance = (-1 * parseInt(scrollTop - targetTop)),
            angle = 0,
            speed = 0.05;
        const offset = 0.5,
            baseAlpha = 0.5;
        let targetEl = target,
            targetYOffset = 0;
        while (targetEl) {
            targetYOffset += (targetEl.offsetTop);
            targetEl = targetEl.offsetParent;
        }
        if (scrollTop > targetTop) {
            scrollUp = true;
        }
        let then = performance.now();
        render();
        function render(now) {
            let alpha;
            if (scrollUp) {
                alpha = self.round((baseAlpha + Math.sin(angle) * offset), 2);
            } else {
                alpha = self.round((baseAlpha - Math.sin(angle) * offset), 2);
            }
            console.log(scrollTop, targetTop, distance, targetYOffset);
            //window
            angle += speed;
            then = now;
            //requestAnimationFrame(render);
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }

    this.shellSort = function (array) {
        let length = array.length,
            h = 1;
        while (h < length / 3) {
            h = 3 * h + 1;
        }
        while (h > 0) {
            for (let i = h; i < length; i++) {
                for (let j = i; j > 0 && array[j] < array[j - h]; j -= h) {
                    self.swap(array, j, j - h);
                }
            }
            //decreasing h
            h = --h / 3;
        }
        return array;
    };

    /*
     * Simple JS animation for elements, needs a lot of work.
     * All the these animations should be roled into one object.
     */
    this.slide = function (el, initialOffset, finalOffset, callback = null) {
        let slideIn = false;
        if (finalOffset > initialOffset) {
            slideIn = true;
        }
        el.style.zIndex = 1000010;
        el.style.transform = 'translateX(' + ( parseFloat(initialOffset) * -100 ) + '%)';
        let angle = 0,
            speed = 0.05,
            baseOffset = 0.5;
        render();
        function render() {
            let offset;
            if (slideIn) {
                offset = self.round((baseOffset + Math.sin(angle)), 2);
                if (offset >= finalOffset - 0.01) {
                    offset = finalOffset;
                }
            } else {
                offset = self.round((baseOffset - Math.sin(angle)), 2);
                if (offset <= finalOffset + 0.01) {
                    offset = finalOffset;
                }
            }
            el.style.transform = 'translateX(' + ( parseFloat(offset) * -100 ) + '%)';
            angle += speed;
            if (offset !== finalOffset) {
                requestAnimationFrame(render);
            } else {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };

    /*
     * Simple JS animation for elements, needs a lot of work.
     * All the these animations should be roled into one object.
     */
    this.fade = function (el, initialAlpha, finalAlpha, callback = null) {
        let fadeIn = false;
        if (finalAlpha > initialAlpha) {
            fadeIn = true;
        }
        el.style.zIndex = 1000010;
        el.style.opacity = parseFloat(initialAlpha);
        let angle = 0,
            speed = 0.05,
            offset = 0.5,
            baseAlpha = 0.5;
        render();
        function render() {
            let alpha;
            if (fadeIn) {
                alpha = self.round((baseAlpha + Math.sin(angle) * offset), 2);
                if (alpha >= finalAlpha - 0.01) {
                    alpha = finalAlpha;
                }
            } else {
                alpha = self.round((baseAlpha - Math.sin(angle) * offset), 2);
                if (alpha <= finalAlpha + 0.01) {
                    alpha = finalAlpha;
                }
            }
            el.style.opacity = alpha;
            angle += speed;
            if (alpha !== finalAlpha) {
                requestAnimationFrame(render);
            } else {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };

    /*
     * Sets a cookie.
     */
    this.setCookie = function (cookieName, value, lifespan) {
        let deathDate = new Date();
        deathDate.setDate(deathDate.getDate() + lifespan);
        let cookieValue = encodeURIComponent(value) + ((lifespan === null) ? '' : ('; expires=' + deathDate.toUTCString()));
        document.cookie = cookieName + '=' + cookieValue;
    };
    /*
     * All your cookie are belong to us.
     */
    this.getCookie = function (cookieName) {
        let retrievedCookieName,
            retrievedCookieValue,
            cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; ++i) {
            retrievedCookieName = cookies[i].substr(0, cookies[i].indexOf('='));
            retrievedCookieValue = cookies[i].substr(cookies[i].indexOf('=') + 1);
            retrievedCookieName = retrievedCookieName.replace(/^\s+|\s+$/g, '');
            if (retrievedCookieName === cookieName) {
                return decodeURIComponent(retrievedCookieValue);
            }
        }
    };

    this.elementLibrary = {
        comment: {
            name: 'comment',
            tag: '<!--',
            end: '-->',
            wrap: true
        },
        doctype: {
            name: 'doctype',
            tag: '<!DOCTYPE>',
            end: null,
            wrap: false
        },
        a: {
            name: 'a',
            tag: '<a>',
            end: '</a>',
            wrap: true
        },
        abbr: {
            name: 'abbr',
            tag: '<abbr>',
            end: '</abbr>',
            wrap: true
        },
        address: {
            name: 'address',
            tag: '<address>',
            end: '</address>',
            wrap: true
        },
        area: {
            name: 'area',
            tag: '<area>',
            end: 'null',
            wrap: false
        },
        article: {
            name: 'article',
            tag: '<article>',
            end: '</article>',
            wrap: true
        },
        aside: {
            name: 'aside',
            tag: '<aside>',
            end: '</aside>',
            wrap: true
        },
        audio: {
            name: 'audio',
            tag: '<audio>',
            end: '</audio>',
            wrap: true
        },
        b: {
            name: 'b',
            tag: '<b>',
            end: '</b>',
            wrap: true
        },
        base: {
            name: 'base',
            tag: '<base>',
            end: 'null',
            wrap: false
        },
        bdi: {
            name: 'bdi',
            tag: '<bdi>',
            end: '</bdi>',
            wrap: true
        },
        bdo: {
            name: 'bdo',
            tag: '<bdo>',
            end: '</bdo>',
            wrap: true
        },
        blockquote: {
            name: 'blockquote',
            tag: '<blockquote>',
            end: '</blockquote>',
            wrap: true
        },
        body: {
            name: 'body',
            tag: '<body>',
            end: '</body>',
            wrap: true
        },
        br: {
            name: 'br',
            tag: '<br>',
            end: 'null',
            wrap: false
        },
        button: {
            name: 'button',
            tag: '<button>',
            end: '</button>',
            wrap: true
        },
        canvas: {
            name: 'canvas',
            tag: '<canvas>',
            end: '</canvas>',
            wrap: true
        },
        caption: {
            name: 'caption',
            tag: '<caption>',
            end: '</caption>',
            wrap: true
        },
        cite: {
            name: 'cite',
            tag: '<cite>',
            end: '</cite>',
            wrap: true
        },
        code: {
            name: 'code',
            tag: '<code>',
            end: '</code>',
            wrap: true
        },
        col: {
            name: 'col',
            tag: '<col>',
            end: 'null',
            wrap: false
        },
        colgroup: {
            name: 'colgroup',
            tag: '<colgroup>',
            end: '</colgroup>',
            wrap: true
        },
        datalist: {
            name: 'datalist',
            tag: '<datalist>',
            end: '</datalist>',
            wrap: true
        },
        dd: {
            name: 'dd',
            tag: '<dd>',
            end: '</dd>',
            wrap: true
        },
        del: {
            name: 'del',
            tag: '<del>',
            end: '</del>',
            wrap: true
        },
        details: {
            name: 'details',
            tag: '<details>',
            end: '</details>',
            wrap: true
        },
        dfn: {
            name: 'dfn',
            tag: '<dfn>',
            end: '</dfn>',
            wrap: true
        },
        dialog: {
            name: 'dialog',
            tag: '<dialog>',
            end: '</dialog>',
            wrap: true
        },
        div: {
            name: 'div',
            tag: '<div>',
            end: '</div>',
            wrap: true
        },
        dl: {
            name: 'dl',
            tag: '<dl>',
            end: '</dl>',
            wrap: true
        },
        dt: {
            name: 'dt',
            tag: '<dt>',
            end: '</dt>',
            wrap: true
        },
        em: {
            name: 'em',
            tag: '<em>',
            end: '</em>',
            wrap: true
        },
        embed: {
            name: 'embed',
            tag: '<embed>',
            end: '</embed>',
            wrap: true
        },
        fieldset: {
            name: 'fieldset',
            tag: '<fieldset>',
            end: '</fieldset>',
            wrap: true
        },
        figcaption: {
            name: 'figcaption',
            tag: '<figcaption>',
            end: '</figcaption>',
            wrap: true
        },
        figure: {
            name: 'figure',
            tag: '<figcaption>',
            end: '</figcaption>',
            wrap: true
        },
        footer: {
            name: 'footer',
            tag: '<footer>',
            end: '</footer>',
            wrap: true
        },
        form: {
            name: 'form',
            tag: '<form>',
            end: '</form>',
            wrap: true
        },
        h1: {
            name: 'h1',
            tag: '<h1>',
            end: '</h1>',
            wrap: true
        },
        h2: {
            name: 'h2',
            tag: '<h2>',
            end: '</h2>',
            wrap: true
        },
        h3: {
            name: 'h3',
            tag: '<h3>',
            end: '</h3>',
            wrap: true
        },
        h4: {
            name: 'h4',
            tag: '<h4>',
            end: '</h4>',
            wrap: true
        },
        h5: {
            name: 'h5',
            tag: '<h5>',
            end: '</h5>',
            wrap: true
        },
        h6: {
            name: 'h6',
            tag: '<h6>',
            end: '</h6>',
            wrap: true
        },
        head: {
            name: 'head',
            tag: '<head>',
            end: '</head>',
            wrap: true
        },
        header: {
            name: 'header',
            tag: '<header>',
            end: '</header>',
            wrap: true
        },
        hr: {
            name: 'hr',
            tag: '<hr>',
            end: 'null',
            wrap: false
        },
        html: {
            name: 'html',
            tag: '<html>',
            end: '</html>',
            wrap: true
        },
        i: {
            name: 'i',
            tag: '<i>',
            end: '</i>',
            wrap: true
        },
        iframe: {
            name: 'iframe',
            tag: '<iframe>',
            end: '</iframe>',
            wrap: true
        },
        img: {
            name: 'img',
            tag: '<img>',
            end: 'null',
            wrap: false
        },
        input: {
            name: 'input',
            tag: '<input>',
            end: 'null',
            wrap: false
        },
        ins: {
            name: 'ins',
            tag: '<ins>',
            end: '</ins>',
            wrap: true
        },
        kbd: {
            name: 'kbd',
            tag: '<kbd>',
            end: '</kbd>',
            wrap: true
        },
        keygen: {
            name: 'keygen',
            tag: '<keygen>',
            end: 'null',
            wrap: false
        },
        label: {
            name: 'label',
            tag: '<label>',
            end: '</label>',
            wrap: true
        },
        legend: {
            name: 'legend',
            tag: '<legend>',
            end: '</legend>',
            wrap: true
        },
        li: {
            name: 'li',
            tag: '<li>',
            end: '</li>',
            wrap: true
        },
        link: {
            name: 'link',
            tag: '<link>',
            end: null,
            wrap: false
        },
        main: {
            name: 'main',
            tag: '<main>',
            end: '</main>',
            wrap: true
        },
        map: {
            name: 'map',
            tag: '<map>',
            end: '</map>',
            wrap: true
        },
        mark: {
            name: 'mark',
            tag: '<mark>',
            end: '</mark>',
            wrap: true
        },
        menu: {
            name: 'menu',
            tag: '<menu>',
            end: '</menu>',
            wrap: true
        },
        menuitem: {
            name: 'menuitem',
            tag: '<menuitem>',
            end: '</menuitem>',
            wrap: true
        },
        meta: {
            name: 'meta',
            tag: '<meta>',
            end: null,
            wrap: false
        },
        meter: {
            name: 'meter',
            tag: '<meter>',
            end: '</meter>',
            wrap: true
        },
        nav: {
            name: 'nav',
            tag: '<nav>',
            end: '</nav>',
            wrap: true
        },
        noscript: {
            name: 'noscript',
            tag: '<noscript>',
            end: '</noscript>',
            wrap: true
        },
        object: {
            name: 'object',
            tag: '<object>',
            end: '</object>',
            wrap: true
        },
        ol: {
            name: 'ol',
            tag: '<ol>',
            end: '</ol>',
            wrap: true
        },
        optgroup: {
            name: 'optgroup',
            tag: '<optgroup>',
            end: '</optgroup>',
            wrap: true
        },
        option: {
            name: 'option',
            tag: '<option>',
            end: '</option>',
            wrap: true
        },
        output: {
            name: 'output',
            tag: '<output>',
            end: '</output>',
            wrap: true
        },
        p: {
            name: 'p',
            tag: '<p>',
            end: '</p>',
            wrap: true
        },
        param: {
            name: 'param',
            tag: '<param>',
            end: null,
            wrap: false
        },
        pre: {
            name: 'pre',
            tag: '<pre>',
            end: '</pre>',
            wrap: true
        },
        progress: {
            name: 'progress',
            tag: '<progress>',
            end: '</progress>',
            wrap: true
        },
        q: {
            name: 'q',
            tag: '<q>',
            end: '</q>',
            wrap: true
        },
        rp: {
            name: 'rp',
            tag: '<rp>',
            end: '</rp>',
            wrap: true
        },
        rt: {
            name: 'rt',
            tag: '<rt>',
            end: '</rt>',
            wrap: true
        },
        ruby: {
            name: 'ruby',
            tag: '<ruby>',
            end: '</ruby>',
            wrap: true
        },
        s: {
            name: 's',
            tag: '<s>',
            end: '</s>',
            wrap: true
        },
        samp: {
            name: 'samp',
            tag: '<samp>',
            end: '</samp>',
            wrap: true
        },
        script: {
            name: 'script',
            tag: '<script>',
            end: '</script>',
            wrap: true
        },
        section: {
            name: 'section',
            tag: '<section>',
            end: '</section>',
            wrap: true
        },
        select: {
            name: 'select',
            tag: '<select>',
            end: '</select>',
            wrap: true
        },
        small: {
            name: 'small',
            tag: '<small>',
            end: '</small>',
            wrap: true
        },
        source: {
            name: 'source',
            tag: '<source>',
            end: null,
            wrap: false
        },
        span: {
            name: 'span',
            tag: '<span>',
            end: '</span>',
            wrap: true
        },
        strong: {
            name: 'strong',
            tag: '<strong>',
            end: '</strong>',
            wrap: true
        },
        style: {
            name: 'style',
            tag: '<style>',
            end: '</style>',
            wrap: true
        },
        sub: {
            name: 'sub',
            tag: '<sub>',
            end: '</sub>',
            wrap: true
        },
        summary: {
            name: 'summary',
            tag: '<summary>',
            end: '</summary>',
            wrap: true
        },
        sup: {
            name: 'sup',
            tag: '<sup>',
            end: '</sup>',
            wrap: true
        },
        table: {
            name: 'table',
            tag: '<table>',
            end: '</table>',
            wrap: true
        },
        tbody: {
            name: 'tbody',
            tag: '<tbody>',
            end: '</tbody>',
            wrap: true
        },
        td: {
            name: 'td',
            tag: '<td>',
            end: '<td>',
            wrap: true
        },
        textarea: {
            name: 'textarea',
            tag: '<textarea>',
            end: '</textarea>',
            wrap: true
        },
        tfoot: {
            name: 'tfoot',
            tag: '<tfoot>',
            end: '</tfoot>',
            wrap: true
        },
        th: {
            name: 'th',
            tag: '<th>',
            end: '</th>',
            wrap: true
        },
        thead: {
            name: 'thead',
            tag: '<thead>',
            end: '</thead>',
            wrap: true
        },
        time: {
            name: 'time',
            tag: '<time>',
            end: '</time>',
            wrap: true
        },
        title: {
            name: 'title',
            tag: '<title>',
            end: '</title>',
            wrap: true
        },
        tr: {
            name: 'tr',
            tag: '<tr>',
            end: '</tr>',
            wrap: true
        },
        track: {
            name: 'track',
            tag: '<track>',
            end: null,
            wrap: false
        },
        u: {
            name: 'u',
            tag: '<u>',
            end: '</u>',
            wrap: true
        },
        ul: {
            name: 'ul',
            tag: '<ul>',
            end: '</ul>',
            wrap: true
        },
        var: {
            name: 'var',
            tag: '<var>',
            end: '</var>',
            wrap: true
        },
        video: {
            name: 'video',
            tag: '<video>',
            end: '</video>',
            wrap: true
        },
        wbr: {
            name: 'wbr',
            tag: '<wbr>',
            end: null,
            wrap: false
        }
    };

    /*
     * Announce loaded and ready.
     */
    this.announceReady = function () {
        window._DIFDesignCoreReady = new CustomEvent('DIFDesignCoreReady', { bubbles: true, cancelable: false, timestamp: performance.now() });
        console.log(
            '%c D%cI%cF%cDesign%c:%cCoreUtilities %c> %cReady ',
            'padding: 8px 0; color: #ed4b37; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #21b15c; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #1c80bf; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: hsla(220,15%,60%,1); font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #444; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #1c80bf; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #444; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);',
            'padding: 8px 0; color: #21b15c; font-family: Verdana; font-size: 16px; font-weight: 900; line-height: 18px; text-shadow: 0px 1px 1px rgba(0,0,0,0.5);'
        );
        window.dispatchEvent(window._DIFDesignCoreReady);
    };

}