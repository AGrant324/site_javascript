YUI.add('spinner', function(Y) {

 var animations = {}, /* Animation rules keyed by their name */
		div = '<div>',
		Node = Y.Node;

var Spinner = Y.Base.create('Spinner', Y.Widget, [], {
	
	initializer: function() {
		this.get('contentBox').setStyles({position: 'relative'}).setAttribute('aria-role', 'progressbar');
   },
	
	render : function() {
		this._lines();
	},
	
	_lines : function() {
    var seg,
				el = this.get('contentBox'),
				i = 0,
				pre = this._getVendorPrefix(),
				color = this.get('color'),
				length = this.get('length'),
				lines = this.get('lines'),
				opacity = this.get('opacity'),
				radius = this.get('radius'),
				speed = this.get('speed'),
				trail = this.get('trail'),
				width = this.get('width');


    for (; i < lines; i++) {
	
      seg = Node.create(div).setStyles({
        position: 'absolute',
        top: 1+~(width/2) + 'px',
        transform: 'translate3d(0,0,0)',
        opacity: opacity
      });
			
			seg.setStyle( pre + 'animation', this._addAnimation(opacity, trail, i, lines) + ' ' + 1/speed + 's linear infinite');
			seg.appendChild(this._fill(i, length, width, color, lines, radius));
			el.appendChild(seg);
    }
  },
	
	_fill : function(i, length, width, color, lines, radius) {

		var node = Node.create(div).setStyles({
			position: 'absolute',
       width: (length + width) + 'px',
       height: width + 'px',
       background: color,
       boxShadow: '0 0 1px rgba(0,0,0,.1)',
       transformOrigin: 'left',
       transform: 'rotate(' + ~~(360/lines * i ) + 'deg) translate(' + radius +'px' +',0)',
       borderRadius: (width >>1 ) + 'px'
		});
		
     return node;
   },
	
	_getVendorPrefix : function() {
		var pre;
		
		if(Y.UA.webkit) {
			pre = '-webkit-';
		}
		else if(Y.UA.opera) {
			pre = '-o-';
		}
		else if(Y.UA.gecko) {
			pre = '-moz-';
		}
		else {
			pre = '-ms-';
		}
		
		return pre;
	},
	
	_addAnimation : function(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-'),
        start = 0.01 + i/lines*100,
        z = Math.max(1-(1-alpha)/trail*(100-start) , alpha),
				pre = this._getVendorPrefix();

    if (!animations[name]) {
      var css = 
				'@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:'+z+'}' +
        start + '%{opacity:'+ alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail)%100 + '%{opacity:'+ alpha + '}' +
        '100%{opacity:'+ z + '}' +
        '}';
			Y.StyleSheet(css);
      animations[name] = 1;
    }

    return name;
  }
},
{
	ATTRS : {
		// The number of lines to draw
		lines : {
			value : 12
		},
		// The length of each line
		length : {
			value : 7
		},
		// The line thickness
		width : {
			value : 4
		},
		// The radius of the inner circle
		radius : {
			value : 15
		},
		// #rgb or #rrggbb
		color : {
			value : '#666'
		},
		// Rounds per second
		speed : {
			value : 1
		},
		// Afterglow percentage
		trail : {
			value : 100
		},
		// Opacity of the trail
		opacity : {
			value : 0.25
		}
	}
});

 Y.Spinner = Spinner;

}, '0.0.1' , { requires: ['node', 'event', 'stylesheet', 'widget', 'base'] });

