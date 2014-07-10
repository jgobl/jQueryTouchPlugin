/**
* plugin for drag/drop on mobile devices
* events are bound to touchstart, touchmove and touchend events. 
*/


(function ($) {
    //
    // Extend jQuery feature detection
    //
    $.extend($.support, {
        touch: "ontouchend" in document
    });


    //
    // Hook up touch events
    //
    $.fn.addTouchDragDrop = function (options) {
        if ($.support.touch) {
            var settings = $.extend({
                onMoveEvent: null,
                onEndEvent: null,
                onStartEvent: null
            }, options || {});

            this.each(function (i, el) {
                var self = el;
                $(el).bind("touchstart.DragDrop", function (e) { return onTouchStart(e, self, settings); });
            })
        }

        return this;
    }
        

    function onTouchStart(e, element, settings) {

        var originalEvent = e.originalEvent;
       
        if (originalEvent.targetTouches.length != 1 || originalEvent.touches.length != 1)
            return;

        //remove any move or end events in case any are hanging around.
        $(element).unbind("touchmove.DragDrop").unbind("touchend.DragDrop");

        var touchparams = {};
        touchparams.touchX = originalEvent.targetTouches[0].clientX;
        touchparams.touchY = originalEvent.targetTouches[0].clientY;
        touchparams.elementInitialX = touchparams.elementX = element.offsetLeft;
        touchparams.elementInitialY = touchparams.elementY = element.offsetTop;
        var self = element;

        if (settings.onStartEvent) {
            settings.onStartEvent(element, settings, touchparams);
        }

        $(element).bind('touchmove.DragDrop', function (e) { return onTouchMove(e, self, touchparams, settings) });
        $(element).one('touchend.DragDrop', function (e) { return onTouchEnd(e, self, settings, touchparams) });
        
    }

    function onTouchMove(e, element, touchparams, settings) {

        var originalEvent = e.originalEvent;

        if (originalEvent.targetTouches.length != 1 || originalEvent.touches.length != 1)
            return;

        e.preventDefault();
        
        var leftDelta = originalEvent.targetTouches[0].clientX - touchparams.touchX;
        var topDelta = originalEvent.targetTouches[0].clientY - touchparams.touchY;

        var newLeft = touchparams.elementX + leftDelta;
        var newTop = touchparams.elementY + topDelta;
               
        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';

        touchparams.elementX = newLeft;
        touchparams.elementY = newTop;
        touchparams.touchX = originalEvent.targetTouches[0].clientX;
        touchparams.touchY = originalEvent.targetTouches[0].clientY;
        
        if (settings.onMoveEvent) {
            settings.onMoveEvent(element, settings, touchparams);
        }

        return false;

    }


    function onTouchEnd(e, element, settings, touchparams) {

        e.preventDefault();
        var originalEvent = e.originalEvent;
       
        if (originalEvent.targetTouches.length > 0 || originalEvent.changedTouches.length != 1) {
            //trying to do something with multiple fingers which is not allowed so reset back to original position
            element.style.left = touchparams.elementInitialX + 'px';
            element.style.top = touchparams.elementInitialY + 'px';
        }
        else {

            e.stopImmediatePropagation();
            if (settings.onEndEvent) {
                settings.onEndEvent(element, settings, touchparams);                
            }
        }
       
        $(element).unbind("touchmove.DragDrop");

        return false;

    }    


})(jQuery);






