!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o);var a=o("bpxeT"),i=o("2TvXO"),l=o("5IjG7"),s=o("h6c0i"),c=o("1DGNh"),d=o("dPIwi"),u=new(e(l))(".photo-card a",{captionsData:"alt",captionDelay:250,captions:"true"}),f="",h=1,p=0;(0,c.default)().then(console.log);var y={form:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more"),gallery:document.querySelector(".gallery"),galleryText:document.querySelector(".gallery__text")};function g(e){var t=e.map((function(e){return(0,d.default)(e)})).join("");y.gallery.insertAdjacentHTML("beforeend",t)}function m(){return(m=e(a)(e(i).mark((function t(r){var n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),h=1,""!==(f=r.currentTarget.searchQuery.value.trim())){e.next=6;break}return s.Notify.info("This field cannot be empty!"),e.abrupt("return");case 6:return y.loadMoreBtn.classList.add("is-hidden"),y.galleryText.classList.add("is-hidden"),e.prev=8,e.next=11,(0,c.default)(f,h);case 11:n=e.sent,p=n.hits.length,n.totalHits>40?y.loadMoreBtn.classList.remove("is-hidden"):y.loadMoreBtn.classList.add("is-hidden"),n.totalHits>0&&(s.Notify.success("Hooray! We found ".concat(n.totalHits," images.")),y.gallery.innerHTML="",g(n.hits),u.refresh(),y.galleryText.classList.add("is-hidden"),x()),0===n.totalHits&&(y.gallery.innerHTML="",document.querySelector("input").value="",s.Notify.failure("Sorry, there are no images matching your search query. Please try again."),y.loadMoreBtn.classList.add("is-hidden"),y.galleryText.classList.add("is-hidden")),e.next=23;break;case 18:e.prev=18,e.t0=e.catch(8),s.Notify.failure("Ooops...Something goes wrong"),document.querySelector("input").value="",console.log(e.t0);case 23:case"end":return e.stop()}}),t,null,[[8,18]])})))).apply(this,arguments)}function v(){return(v=e(a)(e(i).mark((function t(){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+=1,e.prev=1,e.next=4,(0,c.default)(f,h);case 4:g((r=e.sent).hits),u.refresh(),(p+=r.hits.length)===r.totalHits&&(y.loadMoreBtn.classList.add("is-hidden"),y.galleryText.classList.remove("is-hidden")),w(),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),s.Notify.failure("Ooops...Something goes wrong"),document.querySelector("input").value="";case 16:case"end":return e.stop()}}),t,null,[[1,12]])})))).apply(this,arguments)}function x(){window.scrollBy({top:0,behavior:"smooth"})}function w(){var e=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:3*e,behavior:"smooth"})}y.form.addEventListener("submit",(function(e){return m.apply(this,arguments)})),y.loadMoreBtn.addEventListener("click",(function(){return v.apply(this,arguments)}))}();
//# sourceMappingURL=withButton.9dcc1ef3.js.map
