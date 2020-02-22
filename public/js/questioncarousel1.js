(function()
{
    var autoUpdate =true,
    timeTrans = 4000;
    var cdSlider = document.querySelector('.cd-slider'),
    item = cdSlider.querySelectorAll("li"),
    pagination = document.querySelector('.app'),
    page =  pagination.querySelectorAll("div"),
    nav = cdSlider.querySelector("nav");

    item[0].className = "current_slide";
    for (var i =0, len = item.length; i<len; i++)
    {
        var color = item[i].getAttribute("data-color");
        
    }
    var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE");
		if ( msie > 0 ) {
			var version = parseInt(ua.substring(msie+ 5, ua.indexOf(".", msie)));
			if (version === 9) { cdSlider.className = "cd-slider ie9";}
	}

	if (item.length <= 1) {
		nav.style.display = "none";
    }
    function prevSlide()
    {
        vishnu();
        var currentSlide = cdSlider.querySelector("li.current_slide"),
        prevElement = currentSlide.previousElementSibling,
        prevSlide = (prevElement !== null) ? prevElement : item[item.length-1],
        prevColor = prevSlide.getAttribute("data-color"),
        el = document.createElement('span');

        currentSlide.className = "";
        prevSlide.className = "current_slide";
        nav.children[0].appendChild(el);

        var size =( cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth*2 : cdSlider.clientHeight*2;
        ripple = nav.children[0].querySelector("span");



        ripple.style.height = size + 'px' ;
        ripple.style.width = size + 'px';
        ripple.style.backgroundColor = prevColor;
        ripple.addEventListener("webkitTransitionEnd",function(){
            if(this.parentNode){
                this.parentNode.removeChild(this);
            }
        });
        ripple.addEventListener("transitionend",function(){
            if(this.parentNode)
            {
                this.parentNode.removeChild(this);
            }
        });
    }


    //nextslide

    function nextSlide() {
      akil();

        var currentSlide = cdSlider.querySelector("li.current_slide"),
			nextElement = currentSlide.nextElementSibling,
			nextSlide = ( nextElement !== null ) ? nextElement : item[0],
			nextColor = nextSlide.getAttribute("data-color"),
			el = document.createElement('span');

		currentSlide.className = "";
		nextSlide.className = "current_slide";

		nav.children[1].appendChild(el);

		var size = ( cdSlider.clientWidth >= cdSlider.clientHeight ) ? cdSlider.clientWidth*2 : cdSlider.clientHeight*2,
			  ripple = nav.children[1].querySelector("span");

		ripple.style.height = size + 'px';
		ripple.style.width = size + 'px';
		ripple.style.backgroundColor = nextColor;

		ripple.addEventListener("webkitTransitionEnd", function() {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		});

		ripple.addEventListener("transitionend", function() {
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		});
    }


    updateNavColor();
    function updateNavColor () {
        var currentSlide = cdSlider.querySelector("li.current_slide");
        var nextColor = (currentSlide.nextElementSibling !== null) ? currentSlide.nextElementSibling.getAttribute("data-color") : item[0].getAttribute("data-color");
        var prevColor = (currentSlide.previousElementSibling !== null) ? currentSlide.previousElementSibling.getAttribute("data-color") : item[item.length-1].getAttribute("data-color");
        if(item.length>2)
        {
            nav.querySelector(".prev").style.backgroundColor = prevColor;
            nav.querySelector(".next").style.backgroundColor = nextColor;

        }
    }
    
    nav.querySelector(".next").addEventListener('click',function(event){
        event.preventDefault();
        nextSlide();
        autoUpdate = false;
        updateNavColor();
    });
    nav.querySelector(".prev").addEventListener("click",function(event){
        event.preventDefault();
        prevSlide();
        autoUpdate = false;
        updateNavColor();

    });
   
    // var pagination = document.querySelector("app");
    // page =  pagination.querySelectorAll("div.but");
   
        

    function akil(){
        var currentslide = pagination.querySelector(".but.active"),
        nextelement = currentslide.nextElementSibling,
        nextslide = ( nextelement !== null ) ? nextelement : page[0];
        nextslide.classList.toggle('active');
        currentslide.classList.toggle('active');

    };
    function vishnu(){
        var currentslide = pagination.querySelector(".but.active"),
        nextelement = currentslide.previousElementSibling,
        nextslide = ( nextelement !== null ) ? nextelement : page[page.length-1];
        nextslide.classList.toggle('active');
        currentslide.classList.toggle('active');

    };
    

    setInterval(function(){
        if(autoUpdate){
            nextSlide();

            updateNavColor();
        };
    },timeTrans);
    
})();