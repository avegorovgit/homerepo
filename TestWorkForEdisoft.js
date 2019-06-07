function FormParamsObject(objectParams) {
	this.errorCode = 0;

	this.getFullObject = function() {
		return objectParams || this.errorCode;
	};

	this.convertObjectToArray = function(propPath) {
		var arr = [], key, keys,
			obj = this.getObjectProperty(propPath);

		if (toString.call(obj) === '[object Object]') {
			for (key in obj) {
				if (toString.call(obj[key]) === '[object Array]') {
					for (var i = 0; i < obj[key].length; i++) {
						if (!arr[i]) {
							arr[i] = {};
						} 
						arr[i][key] = obj[key][i];
					}
				} else return this.errorCode;
			}
			return this.setObjectProperty(propPath, arr);
		} else return this.errorCode;
	};

	this.getObjectProperty = function(propPath) {
		var propArray,
			currentProp = objectParams;

		if (propPath.split) {
			propArray = propPath.split(".");
			for (var i = 0; i < propArray.length; i++) {
				if (currentProp) {
					currentProp = currentProp[propArray[i]] || null;
				} else break;
			}
		} else return this.errorCode;
		return currentProp;
	};

	this.setObjectProperty = function(propPath, value) {
		var propArray,
			currentProp = objectParams;

		if (propPath.split) {
			propArray = propPath.split(".");
			for (var i = 0; i < propArray.length-1; i++) {
				if (toString.call(currentProp[propArray[i]]) !== '[object Object]') { 
					currentProp[propArray[i]] = {};
				}
				currentProp = currentProp[propArray[i]];
			}
			currentProp[propArray[i]] = value;
		} else return this.errorCode;
		return value;
	};
}




	
