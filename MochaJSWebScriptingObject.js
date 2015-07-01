var MochaJSWebScriptingObject = function(functionContainer){
	//	Create class

	var uniqueClassName = "MochaJSWebScriptingObject_DynamicClass_" + NSUUID.UUID().UUIDString();
	var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);

	//	Implement WebScripting Protocol method(s)
	//	https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Protocols/WebScripting_Protocol/index.html#//apple_ref/occ/instm/NSObject/finalizeForWebScript

	var ctx = JSContext.new();
	var convert = function(input){
		//	All return values to WebView must be Objective-C objects, otherwise things crash
		//	If anyone knows of other ways to do this, do share

		return JSValue.valueWithObject_inContext_(input, ctx).toObject();
	};

	delegateClassDesc.addInstanceMethodWithSelector_function_("invokeUndefinedMethodFromWebScript:withArguments:", function(methodName, argsArray){
		var functionToCall = functionContainer[methodName];

		if(!functionToCall) return null;

		var result = functionToCall.apply(null, argsArray);

		return convert(result);
	});

	delegateClassDesc.registerClass();

	return NSClassFromString(uniqueClassName).new();
};