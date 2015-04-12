MochaJSWebScriptingObject
=========================

What is it?
-----------

`MochaJSWebScriptingObject` is intended to be an simple way for Mocha CocoaScript scripts to expose functions to `WebView`.
Originally written for use in Sketch 3+.

How do I use it?
----------------

The following example will create a `WebView` and expose a function to it:

	@import 'MochaJSWebScriptingObject.js'

	//  Create a WebView

	var webView = WebView.new();

	//  Expose functions

	var webScriptingObject = MochaJSWebScriptingObject({
		demo: function(){
			var app = [NSApplication sharedApplication];
			[app displayDialog:"This is being called from a WebView! Cool!" withTitle:"Alert"];
		}
	});

	var windowScriptObject = webView.windowScriptObject();

	windowScriptObject.setValue_forKey_(webScriptingObject, "exported");
	windowScriptObject.evaluateWebScript_("exported.demo();");

How does it work?
----------------

`MochaJSWebScriptingObject` leverages [Mocha's](https://github.com/logancollins/Mocha) methods for manipulating the Objective-C runtime. It creates an NSObject complying with the [`WebScripting`](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Protocols/WebScripting_Protocol/index.html) protocol and manages function exposure between CocoaScript -> Objective-C -> WebView.