// ==UserScript==
// @name         Kotlin API reference helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Attach a TOC on the right of Kotlin API document pages
// @author       Tony Hu
// @match        https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var root = createRoot();
    var allH3 = document.querySelectorAll("h3");
    allH3.forEach(h3 => {
        var sectionMethods = tagIdAndCollectMethods(h3);
        var ul = crateUnorderedList(h3.textContent);
        sectionMethods.map(tag => createListItem(tag)).forEach(li => ul.appendChild(li));
        root.appendChild(ul);
    });
})();

function createRoot() {
    var div = document.createElement("div");
    div.style = "position:fixed; top: 150px;overflow:scroll;height: 500px;right: 20px";
    document.body.appendChild(div);
    return div;
}

function tagIdAndCollectMethods(sectionElement) {
    var sectionElements = sectionElement.nextElementSibling.querySelectorAll("h4");
    var sectionMethods = [];
    sectionElements.forEach(element => {
        element.id = element.firstChild.firstChild.nodeValue;
        element.appendChild(createAnchorElemnt(element.firstChild.firstChild.nodeValue));
        console.log(element.firstChild.firstChild.nodeValue);
        sectionMethods.push(element.firstChild.firstChild.nodeValue);
    });
    return sectionMethods;
}

function createAnchorElemnt(href) {
    var a = document.createElement("a");
    a.className = "anchor";
    a.href = `#${href}`
    return a;
}

function crateUnorderedList(tag) {
    var ul = document.createElement("ul");
    ul.id = `#{tag}`;
    var a = creatLink(tag);
    ul.appendChild(a);
    ul.style="list-style-type:square";
    return ul;
}

function createListItem(tag) {
    var li = document.createElement("li");
    li.id = `#{tag}`;
    var a = creatLink(tag);
    li.appendChild(a);
    li.style="padding:10px;color:grey;";
    return li;
}

function creatLink(href) {
    var a = document.createElement("a");
    a.href = `#${href}`;
    a.innerText = href;
    return a;
}
