
if(!String.prototype.toDomElement){
  String.prototype.toHtmlElement = String.prototype.toDomElement = function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.toString();
        var df= document.createDocumentFragment();
            df.appendChild(wrapper);
        return df.firstElementChild.firstElementChild;
    }
};

function getVendorPrefixed(prop){
    var i, 
    s = window.getComputedStyle(document.documentElement, ''), 
    v = ['ms','O','Moz','Webkit'];
    if( prop in s) return prop;
    prop = prop[0].toUpperCase() + prop.slice(1);
    for( i = v.length; i--; )
        if( v[i] + prop in s) return (v[i] + prop);
};

if(!String.prototype.toVendorPrefix){
    String.prototype.toVendorPrefix = function(){
        return getVendorPrefixed(this.toString());
    }
};


if(!String.prototype.htmlEscape){
    String.prototype.htmlEscape = function(){
      return String(this)
                .replace(/&/g, '&amp;',"g")
                .replace(/"/g, '&quot;',"g")
                .replace(/'/g, '&#39;',"g")
                .replace(/</g, '&lt;',"g")
                .replace(/>/g, '&gt;',"g"); 
    }
};

if(!String.prototype.htmlUnescape){
    String.prototype.htmlUnescape = function(){
      return String(this)
                .replace(/&amp;/g, '&',"g")
                .replace(/&quot;/g, '\"',"g")
                .replace(/&#39;/g, '\'',"g")
                .replace(/&lt;/g, '<',"g")
                .replace(/&gt;/g, '>',"g"); 
    }
};


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
};


String.prototype.toLocaleString = function(langCode){
  langCode = langCode||Session.State.currentLanguage.CODE;
  var key = this.toString();
  if(Localization){
    if(Localization[langCode]){
      return Localization[langCode][key]||
             Localization[langCode][key.toLowerCase()]||key;
    } else {
      return key;
    }
  }
  else {
    return key;
  }
};



namespace `core.ui` ( 
    class CoverFlow extends w3c.ui.WebComponent {
        constructor(){
            super();
        }

        async onConnected(){
            // await this.render({});
            await super.onConnected();
            this.transform = "transform".toVendorPrefix();
            this.isHorizontal = true;
            this.faces = [].slice.call(this.querySelectorAll("#carousel .tile"));
            this.carousel = this.querySelector("#carousel");
            this.panelSize = 200;//this.carousel[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
            this.carousel.style.width=this.panelSize+"px";
            
            this.panelCount = this.faces.length;
            this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
            this.theta = 360 / this.faces.length;
            this.radius = Math.round( ( this.panelSize / 2 ) / Math.tan( ( ( Math.PI * 2 ) / this.faces.length ) / 2 ) );//Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );
            this.rotation = 0;
            this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

            this.rotateFaces()

            this.btnLeft = this.querySelector("#move-left-btn");
            this.btnRight = this.querySelector("#move-right-btn");
            this.addEventListener("click", (e)=>this.onClick(e), false);

        }

        onClick (e){
            switch(e.target.id){
                case "move-left-btn":
                    this.onMove(-1);
                    break;
                case "move-right-btn":
                    this.onMove(1);
                    break;
            }
        }

        onMove(increment){
            this.rotation += this.theta * increment * -1;
            this.rotateCarousel();
        }

        rotateFaces(){
            var self=this;
            
            this.tz = this.radius;
            this.tz += 10;

            for(var i=0; i<=this.faces.length-1; i++){
                var face = this.faces[i];
                face.style[this.transform] = this.rotateFn + "(" + (i*this.theta) + "deg) translateZ(" + this.tz + "px)";           
            }
            
            this.rotateCarousel();
        }

        rotateCarousel (){
            this.carousel.style[this.transform] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
        }

        onEnableShadow() {
            return false
        }
     }
);

namespace `applications` (
    class InlineTest extends w3c.ui.Application {
        async onConnected() {
            await super.onConnected();
            this.addEventListener("click", e=> this.onClick(e))
            this.addEventListener("click", e=> this.onTestClick(e), false, "#test");
        }

        onClick(e){
            console.log(e.target)
        }

        onTestClick(e){
            console.log("onTestClick", e.target)
        }
    }
);