!function(){if("undefined"!=typeof EventTarget){let e=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(t,n,o){this.func=e,"boolean"!=typeof o&&((o=o||{}).passive=!1),this.func(t,n,o)}}}();