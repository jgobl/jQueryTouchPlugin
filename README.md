jQueryTouchPlugin
=================

A pluging for drag and drop on touch enabled devices.

Example usage.  

You have the following piece of html.

```html
<div style="position:relative; height:250px;background:lightgrey">    
       <div id="move" style="position:absolute;border:1px solid black; top:50px; left:50px">Move me</div>
</div>
```

Use the following piece of javascript to add the drag and drop behavior

```javascript
$(document).ready(function () {

                    $("#move").addTouchDragDrop({
                        onEndEvent: function (element, settings, touchparams) {
                            element.style.left = touchparams.elementInitialX + 'px';
                            element.style.top = touchparams.elementInitialY + 'px';
                            alert("moves " + touchparams.Moves);
                        },
                        onStartEvent: function (element, settings, touchparams) {
                            touchparams.Moves = 15;
                        },
                        onMoveEvent: function (element, settings, touchparams) {
                            touchparams.Moves = touchparams.Moves + 1;
                        }
                    });

                });

```
