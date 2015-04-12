var MochaJSWebScriptingObject = function(functionContainer){
	//	Create class

	var uniqueClassName = "MochaJSWebScriptingObject_DynamicClass_"+new Date().getTime();
	var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);

	//	Implement WebScripting Protocol method(s)
	//	https://developer.apple.com/library/mac/documentation/Cocoa/Reference/WebKit/Protocols/WebScripting_Protocol/index.html#//apple_ref/occ/instm/NSObject/finalizeForWebScript

	delegateClassDesc.addInstanceMethodWithSelector_function_("invokeUndefinedMethodFromWebScript:withArguments:", function(methodName, argsArray){
		var functionToCall = functionContainer[methodName];

		if(!functionToCall) return null;

		var result = functionToCall.apply(null, argsArray);

		return result;
	});

	delegateClassDesc.registerClass();

	return NSClassFromString(uniqueClassName).new();
};