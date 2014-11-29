/**
 * Thanks to the marcj's Css-element-queries library (@see: http://marcj.github.io/css-element-queries/),
 * this plugin will detect size modification of an element :
 *   - witout polling (= no timer = native dom even based = no CPU wasted ressources).
 *   - Whatever the origin of the size modification (js, css, console, children size modifications,
 *     percentage of a parent element, etc.).
 *
 * FYI: 
 *   - Some children div will be added to your element, so you can't use it on something else than a div or a span.
 *   - You can't "detach" the resizeSensor (but if you delete your element for some reason you are fine).
 *   - You can detach the jQuery [resize] event (ressources will be consumed by the plugin, but you won't receive notifications).
 *   - This method is "naive", all modifications will be thrown without throttle pattern 
 *     (but you can use your own one in addition of course). 
 *   
 * PS: Be aware that if your element is in display:block your height will change but never your width (= 100% of the parent),
 *     no matter if you resize the "visible" content (ex: one if it's children). It's tottaly logical but it's a commun mistake. 
 */
;(function ( $, window, document, undefined ) {

    var notify = function(info){
        var elem = info.element;
        delete info.element;
        $(elem).trigger("resize", info);
    };

    /**
     * Initialize the resize sensor.
     *
     * When the element size will be modified, a custom jquery even will be thrown.
     * NB: only div and span can be monitored, to use it on another kind of element, 
     * just wrapp it into a parent div.
     * 
     * ex: 
     * 
     * $(elem).on('resize', [data], callback);
     *
     * 
     * use the callback: 
     * 
     * function([event], [data]){
     *     //get back original values
     *     var elem = this;
     *     var data = event.data;
     *     var info = data;
     *     //get size modifications
     *     var height = info.height;
     *     var lastHeight = info.lastHeight;
     *     var lastWidth = info.lastWidth;
     *     var width = info.width;
     * }
     */
    $.fn.resizeSensor = function() {
        var $this;
        //check unviable types and raise error
        this.each(function() {
            $this = $(this);
            if(($this.is('div') == false) && ($this.is('span') == false)){
                throw 'ResizeSensor: Your selector contain some elements impossible to monitoring';
            }
        });
        //if all selector are div or span, instanciate the sensor
        new ResizeSensor(this, notify, true);
        //don't break the jquery chain event
        return this;
    };

})( jQuery, window, document );