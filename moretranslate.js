var FunTranslations = FunTranslations || {};
FunTranslations.EmbedState = FunTranslations.EmbedState || {};
FunTranslations.EmbedState.styleSheet = FunTranslations.EmbedState.styleSheet || {};
FunTranslations.EmbedState.messageListener = FunTranslations.EmbedState.messageListener || {};

FunTranslations.Embed = FunTranslations.Embed || {};

FunTranslations.isFirstLoad = function(namesp) {
    //alert(namesp.firstLoad);
    var isFirst = namesp.firstLoad === undefined;
    namesp.firstLoad = false;

    return isFirst;
};


//alert(typeof FunTranslations.Embed);

if ( typeof FunTranslations.Embed !== 'function')
{
  FunTranslations.Embed = new function() {

    var version = "v1";
    var baseURL = "https://funtranslations.com/extensions/embed/" + version  + "/";
    var styleSheet = baseURL + "default.css";

    this.requestStyleSheet = function()
    {

        if ( !FunTranslations.isFirstLoad(FunTranslations.EmbedState.styleSheet) )
           return;

        //alert(styleSheet);
        var ss = document.createElement("link");
	ss.rel = "stylesheet";
	ss.type = "text/css";
	ss.href = styleSheet;
	ss.media = "all";
        var head  = document.getElementsByTagName('head')[0];
	head.appendChild(ss);
    }

    this.addMessageListener = function()
    {
        if ( !FunTranslations.isFirstLoad(FunTranslations.EmbedState.messageListener) )
          return;

         window.addEventListener('message', function(e) {
			var eventName = e.data[0];
			var height = e.data[1];
			var nodeId = e.data[2];
                        //alert(nodeId);
                        //alert(height);
			var iframe = document.getElementById(nodeId);
			var iframeDiv = document.getElementById(nodeId + "-div");
                        //alert(iframe);
			switch(eventName) {
				case 'setHeight':
				        iframe.height = height;
				        //iframeDiv.style.height = height;
				     break;
			}
         }, false);
   }

   this.render = function(context)
   {
        this.addMessageListener();
        this.requestStyleSheet();

	var nodeId = Math.random().toString(36).substring(7);
        if ( document.getElementById(context.nodeId)  === null )
        {
          document.write("<div id='" + nodeId + "-div'></div>");
        } else {
          nodeId = context.nodeId;
        }

        if ( typeof(context.translator) === 'undefined' )
              context.translator = 'morse';


	var ifrm = document.createElement('iframe');
	ifrm.setAttribute('id', nodeId); // assign an id
	ifrm.setAttribute('name', nodeId); // assign an id
	ifrm.setAttribute('class', 'funtranslations.com-ifrm'); // assign a class
	ifrm.setAttribute('seamless', 'seamless');
	ifrm.setAttribute('scrolling', 'no');
	ifrm.style.border = '0px none transparent';
	ifrm.style.padding = '0px';
	ifrm.style.marginTop= '10px';
	ifrm.style.marginBottom = '10px';
	ifrm.style.backgroundColor = 'transparent';

	ifrm.width = '100%';
	//ifrm.minHeight = '500px';
        var brandingDiv = document.createElement("div");
        brandingDiv.innerHTML  = '<div class="embed-branding"><a href="https://funtranslations.com/' +  context.translator  +'" title="Powered by funtranslations.com" target="_blank">funtranslations.com</a></div>';
        var embedDiv = document.getElementById(nodeId + "-div");
        embedDiv.appendChild(ifrm);
        embedDiv.appendChild(brandingDiv);

	// assign url
	ifrm.setAttribute('src', 'https://funtranslations.com/e/' + context.translator);
    }
 };
}
