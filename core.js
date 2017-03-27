/*
* Core scripts
* @author DIF Design http://difdesign.com/
* @version 0.2
*/

let difCoreUtilities = new DIFCOREUTILITIES();

/*
* Site core
*/
(function main(D,$){
    'use strict';
	
	/*
	* Injects the agents into the agentFeed section on the home page.
	*/
	if ( document.body.classList.contains('home') ) {
		let agentsFeed;
		do {
			agentsFeed = document.getElementById('agentsFeed');
		} while ( !agentsFeed );
		D.pull('http://difdev.com/gallagher/agent-list/')
			.then( data => {
			/*
			* Intrasite XHR get the agents listing page and parse the
			* response doc to be scraped for content. 
			*/
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
			/*
			* Mash up all the elements, scrub default classes/styles,
			* replace with new classes. Remove un-needed elements.
			*/
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
			/*
			* Shuffle the agents. Pull agents into array for later use.
			*/
			let agentNodes = [];
			for ( let i = agents.length; i >= 0; --i ) {
				let rnum = Math.random() * i | 0;
				if ( agents[rnum] !== undefined ) {
					agentNodes.push(agents[rnum]);
					agents[rnum].remove();
				}
			}
			/*
			* Inject the first three rows of agent nodes back into agentsWrapper.
			*/
			const agentSize = agentResizer();
			for ( let a = 0; a < agentNodes.length; ++a) {
				agentNodes[a].style.flexBasis = agentSize.width + '%';
				agentNodes[a].style.height = 'calc(' + agentSize.width + 'vw * 1.4)';
			}
			for ( let i = agentSize.columns * 3 - 1; i >= 0; --i) {
				wrapper.appendChild(agentNodes.shift());
			}
			/*
			* Insert the agentsWrapper into agentsFeed section.
			*/
			agentsFeed.appendChild(wrapper);
			return agentNodes;
		}).then( agents => {
			/*
			* Inject the load more button and attatch its functionality.
			* Attatch handlers for window resizing.
			*/
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

	/*
	* Set any section tagged with the class 'dif_fullHeight' or 'dif_halfHeight'
	* to the height of the viewport or half that respectively.
	*/
	window.addEventListener('resize', () => {
		let fullHeightSections = document.getElementsByClassName('dif_fullHeight'),
			halfHeightSections = document.getElementsByClassName('dif_halfHeight'),
			wpBarH;
		if ( $('#wpadminbar') ) {
			wpBarH = $('#wpadminbar').height();
		}
		[].forEach.call(fullHeightSections, (element) => {
			element.style.minHeight = D.H - wpBarH + 'px';
		});
		[].forEach.call(halfHeightSections, (element) => {
			element.style.minHeight = D.H / 2 - wpBarH + 'px';
		});
	});
	window.dispatchEvent(new Event('resize'));
	window.addEventListener('load', () => {
		window.dispatchEvent(new Event('resize'));
	});
	
	/*
	* Handles footer form ui animations
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
				if ( e.target.value === '' ) {
					let a = e.target.parentElement.previousElementSibling;
					a.style.transform = 'translateY(0%)';
					a.style.opacity = 1.0;
				}
			}, true);
		}
		for ( let f = 0; f < fields.length; ++f ) {
			focusedState(fields[f]);
			blurredState(fields[f]);
		}
	});
	
	polyfill();
	function polyfill() {
		let w = window,
			d = w.document;
		if ( w.onfocusin === undefined ) {
			d.addEventListener('focus', addPolyfill, true);
			d.addEventListener('blur', addPolyfill, true);
			d.addEventListener('focusin', removePolyfill, true);
			d.addEventListener('focusout', removePolyfill, true);
		}
		function addPolyfill (e) {
			let type = e.type === 'focus' ? 'focusin' : 'focusout',
				event = new window.CustomEvent(type, { bubbles: true, cancelable: false });
			event.c1Generated = true;
			e.target.dispatchEvent(event);
		}
		function removePolyfill (e) {
			if ( !e.c1Generated ) {
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
	
})(difCoreUtilities,jQuery);

/*
* DIFCORE
*/
function DIFCOREUTILITIES() {
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
	* Overlord will, in the future, replace event listeners for most use cases.
	* !! This is still in developement and should not be considered anything other than experimental,
	* be expected to function properly, or at all. !!
	* @Use - Don't, not yet.
	*/
    this.overlord = function initOverlord(fuu) {
		new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				console.log(mutation.type);
			});
    	});
	};

    /*
    * Cross-browser implementation of element.addEventListener()
	* @param {function Array} fu - 
    * @param {String} target - 
    * @param {String} event - 
    * @Use listen(function, 'target', 'event');
    */
    this.listen = function(fu, target = 'window', event = 'load') {
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
	* Basically just shitty jQuery.
	* @param {String} target - Takes a css selector or an array of css selectors.
	* @todo - Finish and make it actually work.
	*/
	this.get = function(target = ['document']) {
		let gotten = [];
		try {
			if (Array.isArray(target)) {
				target.forEach((query) => {
					let firstChar = String(query.charAt(0));
					if ( firstChar === '#' ) {
						query = query.replace('#','');
						[].forEach.call(document.getElementById(query), (el) => {
							gotten.push(el);
						});
					} else if ( firstChar === '.' ) {
						query = query.replace('.','');
						[].forEach.call(document.getElementsByClassName(query), (el) => {
							console.log('is class');
							gotten.push(el);
						});
					} else {
						if ( query === 'document' || query === 'doc' ) {
							gotten.push(document.documentElement);
						} else if ( query === 'body' ) {
							gotten.push(document.body);
						} else {
							[].forEach.call(document.getElementsByTagName(query), (el) => {
								gotten.push(el);
							});
						}
					}
				});
			}
		} catch(e) {
			console.error('DIFCOREUTILITIES.get() failed: ' + e);
		}
		return ( gotten.length > 0 ? gotten : null );
    };

	/*
	* Directly manipulate stylesheets instead on inline styles.
	* @todo - this needs to be modified to get existing stylesheets
	* @research - is this actually faster, better, harder, or stronger? use cases?
	*/
	this.mutate = function(element, rules) {
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
	this.pull = function(source) {
		return new Promise((resolve, reject) => {
			let r = new XMLHttpRequest();
			r.responseType = "document";
			r.open("get", source);
			r.onload = () => {
				if ( r.readyState === r.DONE && ( r.status >= 200 && r.status <= 300 ) ) {
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
    this.round = function(rnum, rlength) {
        return Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    };

    this.getOpposite = function(angle, adjacent) {
        return adjacent * Math.tan( angle * Math.PI / 180 );
    };

    /*
    * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
    * @param {String} text - The text to be rendered.
    * @param {String} font  - The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
    */
    this.getTextWidth = function(text, font) {
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
    this.stripClasses = function(el, ignores = [], recursive = true) {
        if ( el.classList.length > 0 ) {
            [].forEach.call(el.classList,(className) => {
                className = String(className);
                if ( ignores.length > 0 ) {
                    // where cn is the nth class of classList
                    for ( let cn = 0; cn < el.classList.length; ++cn) {
                        let ignore = false;
                        // where ig is the nth String of ignores
                        for ( let ig = 0; ig < ignores.length; ++ig) {
                            if ( String(el.classList[cn]).includes(ignores[ig]) ) {
                                ignore = true;
                            }
                        }
                        if ( !ignore ) {
                            el.classList.remove(className);
                        }
                    }
                } else {
                    el.classList.remove(className);
                }
            });
        }
        if ( el.hasChildNodes && recursive) {
            [].forEach.call(el.children,(child) => {
                this.stripClasses(child,ignores,recursive);
            });
        }
    };
	
	/*
	* Simple JS animation for elements, needs a lot of work.
	* All the these animations should be roled into one object.
	*/
    this.slide = function(el, initialOffset, finalOffset, callback = null) {
        let slideIn = false;
        if ( finalOffset > initialOffset ) {
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
                if ( offset >= finalOffset - 0.01 ) {
                    offset = finalOffset;
                }
            } else {
                offset = self.round((baseOffset - Math.sin(angle)), 2);
                if ( offset <= finalOffset + 0.01 ) {
                    offset = finalOffset;
                }
            }
            el.style.transform = 'translateX(' + ( parseFloat(offset) * -100 ) + '%)';
            angle += speed;
            if ( offset !== finalOffset ) {
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
    this.fade = function(el, initialAlpha, finalAlpha, callback = null) {
        let fadeIn = false;
        if ( finalAlpha > initialAlpha ) {
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
                if ( alpha >= finalAlpha - 0.01 ) {
                    alpha = finalAlpha;
                }
            } else {
                alpha = self.round((baseAlpha - Math.sin(angle) * offset), 2);
                if ( alpha <= finalAlpha + 0.01 ) {
                    alpha = finalAlpha;
                }
            }
            el.style.opacity = alpha;
            angle += speed;
            if ( alpha !== finalAlpha ) {
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
    this.setCookie = function(cookieName, value, lifespan) {
        let deathDate = new Date();
        deathDate.setDate(deathDate.getDate() + lifespan);
        let cookieValue = encodeURIComponent(value) + ((lifespan === null) ? '' : ('; expires=' + deathDate.toUTCString()));
        document.cookie = cookieName + '=' + cookieValue;
    };
	/*
	* All your cookie are belong to us.
	*/
    this.getCookie = function(cookieName) {
        let retrievedCookieName,
            retrievedCookieValue,
            cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; ++i) {
            retrievedCookieName = cookies[i].substr(0, cookies[i].indexOf('='));
            retrievedCookieValue = cookies[i].substr(cookies[i].indexOf('=') + 1);
            retrievedCookieName = retrievedCookieName.replace(/^\s+|\s+$/g,'');
            if ( retrievedCookieName === cookieName ) {
                return decodeURIComponent(retrievedCookieValue);
            }
        }
    };
}




