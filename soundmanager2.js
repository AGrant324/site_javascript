/*!
   SoundManager 2: Javascript Sound for the Web
   --------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2008, Scott Schiller. All rights reserved.
   Code licensed under the BSD License:
   http://schillmania.com/projects/soundmanager2/license.txt

   V2.95a.20090501

   Modified slightly for YUI demo to include some basic
   flash block handling / error messaging

*/

var soundManager = null;

function SoundManager(smURL,smID) {
 
  this.flashVersion = 8;           // version of flash to require, either 8 or 9. Some API features require Flash 9.
  this.debugMode = true;           // enable debugging output (div#soundmanager-debug, OR console if available + configured)
  this.useConsole = true;          // use firebug/safari console.log()-type debug console if available
  this.consoleOnly = false;        // if console is being used, do not create/write to #soundmanager-debug
  this.waitForWindowLoad = false;  // force SM2 to wait for window.onload() before trying to call soundManager.onload()
  this.nullURL = 'null.mp3';       // path to "null" (empty) MP3 file, used to unload sounds (Flash 8 only)
  this.allowPolling = true;        // allow flash to poll for status update (required for "while playing", peak, sound spectrum functions to work.)
  this.useMovieStar = false;	   // enable support for Flash 9.0r115+ (codename "MovieStar") MPEG4 audio + video formats (AAC, M4V, FLV, MOV etc.)
  this.bgColor = '#ffffff';	       // movie (.swf) background color, '#000000' useful if showing on-screen/full-screen video etc.
  this.useHighPerformance = false; // position:fixed flash movie gives increased js/flash speed
  this.flashLoadTimeout = 750;     // ms to wait for flash movie to load before failing (0 = infinity)
  this.wmode = null;	   		   // mode to render the flash movie in - null, transparent, opaque (last two allow layering of HTML on top)
  this.allowFullScreen = true;     // enter full-screen (via double-click on movie) for flash 9+ video

  this.defaultOptions = {
    'autoLoad': false,             // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
    'stream': true,                // allows playing before entire file has loaded (recommended)
    'autoPlay': false,             // enable playing of file as soon as possible (much faster if "stream" is true)
    'onid3': null,                 // callback function for "ID3 data is added/available"
    'onload': null,                // callback function for "load finished"
    'whileloading': null,          // callback function for "download progress update" (X of Y bytes received)
    'onplay': null,                // callback for "play" start
    'onpause': null,               // callback for "pause"
    'onresume': null,              // callback for "resume" (pause toggle)
    'whileplaying': null,          // callback during play (position update)
    'onstop': null,                // callback for "user stop"
    'onfinish': null,              // callback function for "sound finished playing"
    'onbeforefinish': null,        // callback for "before sound finished playing (at [time])"
    'onbeforefinishtime': 5000,    // offset (milliseconds) before end of sound to trigger beforefinish (eg. 1000 msec = 1 second)
    'onbeforefinishcomplete':null, // function to call when said sound finishes playing
    'onjustbeforefinish':null,     // callback for [n] msec before end of current sound
    'onjustbeforefinishtime':200,  // [n] - if not using, set to 0 (or null handler) and event will not fire.
    'multiShot': true,             // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
    'position': null,              // offset (milliseconds) to seek to within loaded sound data.
    'pan': 0,                      // "pan" settings, left-to-right, -100 to 100
    'volume': 100                  // self-explanatory. 0-100, the latter being the max.
  };

  this.flash9Options = {           // flash 9-only options, merged into defaultOptions if flash 9 is being used
    'isMovieStar': null,	  	   // "MovieStar" MPEG4 audio/video mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
    'usePeakData': false,          // enable left/right channel peak (level) data
    'useWaveformData': false,      // enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
    'useEQData': false,            // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
    'onbufferchange': null,	   	   // callback for "isBuffering" property change
    'ondataerror': null			   // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
  };

  this.movieStarOptions = {        // flash 9.0r115+ MPEG4 audio/video options, merged into defaultOptions if flash 9 + movieStar mode is enabled
    'onmetadata': null,		   	   // callback for when video width/height etc. are received
    'useVideo': false,		   	   // if loading movieStar content, whether to show video
    'bufferTime': null		   	   // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try up to 3 seconds)
  };

  // jslint global declarations
  /*global SM2_DEFER, sm2Debugger, alert, console, document, navigator, setTimeout, window */

  var SMSound = null; // defined later

  var _s = this;
  this.version = null;
  this.versionNumber = 'V2.95a.20090501';
  this.movieURL = null;
  this.url = null;
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.o = null;
  this.id = (smID||'sm2movie');
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.isFullScreen = false; // set later by flash 9+
  this.isIE = (navigator.userAgent.match(/MSIE/i));
  this.isSafari = (navigator.userAgent.match(/safari/i));
  this.isGecko = (navigator.userAgent.match(/gecko/i));
  this.debugID = 'soundmanager-debug';
  this.specialWmodeCase = false;
  this._debugOpen = true;
  this._didAppend = false;
  this._appendSuccess = false;
  this._didInit = false;
  this._disabled = false;
  this._windowLoaded = false;
  this._hasConsole = (typeof console != 'undefined' && typeof console.log != 'undefined');
  this._debugLevels = ['log','info','warn','error'];
  this._defaultFlashVersion = 8;
  this._oRemoved = null;
  this._oRemovedHTML = null;

