
/**
 * jquery-tokenreplacer
 * A jQuery plugin for insert token on specific position in text and textareas field.
 *
 * (c) 2014-2016 mMAnishTrivedi <mManishtrivedi@gmail.com>
 */
	(function($) {
                           
         //tokenInsertAtCaret
		
		// Create closure. (token replacer class)	
		$.fn.tokenreplacer =  function()
                    {
						
						// @TODO :: Should be overridable
			
						// Private property
						var current_cursor = 
							{   	
								pointer_at : 0 ,    // default Pointer location where token will insert
								selector : ''       // Input selector
                        	};
						
						
                        
                        var callable_methods = {}; // all public methods define here
                        
                        // set current cursor details
                        callable_methods.set_cursor_position = 
                                function(active_element)
                                {
                        			var input = active_element.get(0);
                                    
                                    //console.log({'input is' : input});

                                    if (!input) return; // No (input) element found

                                    // set selector
                                    current_cursor.selector = input;

                                    //set pointer
                                    if ('selectionStart' in input) {
                                        // Standard browsers
                                        current_cursor.pointer_at = input.selectionStart;
                                    } else if (document.selection) {
                                        // IE :P
                                        input.focus();
                                        var selected = document.selection.createRange();
                                        var selectedLength = document.selection.createRange().text.length;
                                        selected.moveStart('character', -input.value.length);
    //                                  $("#selected").html(selected);
    //                                  $("#selectedLength").html(selectedLength);
                                        current_cursor.pointer_at = selected.text.length - selectedLength;
                                    }
                                    
                                };
                       
                        // token insert on proper location
                        callable_methods.insert_at_cursor = 
                            function(token) 
                            { 
                                var input = $(current_cursor.selector),     // Element selector
                                    start = current_cursor.pointer_at,      // where token will be inserted 
                                    val = input.val();                      // get input selector value
                                    
                                // write new string with token replacement
								input.val(val.substring(0, start) + token + val.substring(start, val.length));
                                
                                // reset cursor pointer
                                current_cursor.pointer_at = start + token.length;
                                
                                //focus element where we will change it
                                input.focus();
                            };
                      
                        return callable_methods;
                            
                    }();
		
		    // End of closure.
			})(jQuery);
	
