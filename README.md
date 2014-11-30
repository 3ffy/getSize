getSize.js
==========

A jQuery plugin to monitoring changes on a dom element.
It is based on marcj's fabulous work : Css-element-queries library (@see: https://github.com/marcj/css-element-queries/).

Overview
-------

This plugin will detect size modification of an element :
- without polling (= no timer = native dom even based = no CPU wasted ressources).
- Whatever the origin of the size modification (js, css, console, children size modifications, percentage of a parent element, etc.).

**FYI:** 
- Some children div will be added to your element, so you can't use it on something else than a div or a span.
- You can't "detach" the resizeSensor (but if you delete your element for some reason you are fine).
- You can detach the jQuery [resize] event (ressources will be consumed by the plugin, but you won't receive notifications).
- This method is "naive", all modifications will be thrown without throttle pattern (but you can use your own one in addition of course). 
 
> PS: Be aware that if your element is in display:block your height will change but never your width (= 100% of the parent), no matter if you resize the "visible" content (ex: one if it's children). It's totally logical but it's a commun mistake.

Usage 
-------

```javascript
$(document).ready(function() {

    //get element (an error will be raised if you try to monitorize something else than div or span).
    var $elements = $('.sensor');

    //initialize the monitoring
    $elements.resizeSensor();

    //... (later) ...

    //use "normal" jQuery resize event to catch size modifications
    $elements.on('resize', function(event, data){
        console.log('The element has been resized !');
    });

    //or
    $elements.resize(function(event, data){
        console.log('The element has been resized !');
    });
    
});
```

License 
-------

**Css Element Queries:** MIT license. Copyright [Marc J. Schmidt](http://marcjschmidt.de/).

**jQuery plugin:** MIT license. Copyright [Aurélien Gy](http://aureliengy.com/).

*See the licence file for more information.*