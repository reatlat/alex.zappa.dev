module.exports = function (src, callback) {
	if (document.querySelector(`script[src="${src}"]`)) {
		return;
	}
	const script = document.createElement("script");
	script.src = src;
	script.async = true;
	script.crossOrigin = "anonymous";
	script.onload = script.onreadystatechange = () => {
		if (
			!this.readyState ||
			this.readyState === "loaded" ||
			this.readyState === "complete"
		) {
			if (callback) callback();
			script.onload = script.onreadystatechange = null;
		}
	};
	document.body.appendChild(script);
};
