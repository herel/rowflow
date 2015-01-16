/*
 * Plugin Name: row-flow 
 * Version: 1
 * Author: Herel Sanchez
 * Email : herelss@hotmail.com
 * License: GPL2
 */
 $.fn.extend({
 	rowflow : function (options){
 		var opts = options;
 		return  this.each(function(e){
 			var self = $(this);
 			var defaults = {
 						columns 		: 2,
 						width			: 'auto',
 						items   		: '.item',
 						left_space 		: 40,
 						bottom_space 	: 30,
 						responsive		: true,
 						breakPoint		: ['Small','ExtraSmall'] // indica donde no funciona en plugin
						}
			var options 	= $.extend(defaults,opts);
 			$(window).bind('resize',loadscript);
 			$(window).load(loadscript);
 			function loadscript(){
 				var items_objs 	= [];
				var columns  	= 0;
				var item  		= 0;
				var layout 		= 0;
				if(options.responsive){
					if(options.breakPoint.indexOf(findBootstrapEnvironment())  == -1 ){
						self.find(options.items).each(function(){
							console.log(columns);
							var el = $(this);
							items_objs.push({
								objec : el ,
								w  : el.width(),
								h: el.height(),
							});
							if(item == 0){
								layout = layout + el.height() + options.bottom_space ;
							}
							var top_pos = 0;
							if(columns > 1){
								var new_obj = jQuery(items_objs[(columns*2)+item-2].objec);
								top_pos =  new_obj.position().top + new_obj.height();
							}
							if(columns == 1)
								top_pos = items_objs[(columns*2)+item-1].h ;
							var left =  (item == 0 ) ?   0 : el.prev().width() + options.left_space  ;
							var top  =  (columns == 0) ? 0 :   top_pos + options.bottom_space  ;
							$(this).css({
								position : 'absolute',
								left     : left,
								top 	 : top  
							})
							item ++ ;
							if(item == (options.columns) ){
								item = 0;
								columns++;
							}
						});
						self.css({
							'height' : layout+'px',
							'position' : 'relative'
						})
					}else{
						self.removeAttr('style');
						self.find(options.items).removeAttr('style');
					}
				}
 			}
			/*call  responsive state*/
			function findBootstrapEnvironment() {
			    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
			    var envValues = ["xs", "sm", "md", "lg"];

			    var $el = $('<div>');
			    $el.appendTo($('body'));

			    for (var i = envValues.length - 1; i >= 0; i--) {
			        var envVal = envValues[i];

			        $el.addClass('hidden-'+envVal);
			        if ($el.is(':hidden')) {
			            $el.remove();
			            return envs[i]
			        }
			    };
			}
 		});
 	}
 });