(function(){
	'use strict';

	let thumbnailContainer = document.getElementById("thumbnail-container");
	let gallerythumb = document.getElementsByClassName("gallerythumb")

	if(thumbnailContainer === null || gallerythumb === null || gallerythumb.length === 0) return;

	let hrefAr = []

	let sheet = (function() {
		let style = document.createElement("style");
		style.appendChild(document.createTextNode(""));
		document.head.appendChild(style);
		return style.sheet;
	})();

	sheet.insertRule("#thumbnail-container > img { width: 100%; min-height:40px; background: gray; }", 0);

	for (let a of gallerythumb) {
		hrefAr.push(a.href);
	}
	thumbnailContainer.innerHTML = "";

	let lastId = 0;

	let xhr = new XMLHttpRequest();

	xhr.open('GET', hrefAr[lastId], true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
			setTimeout(xhr.send, 1000);
		} 
		else{
			let tempDoc = document.createElement('html');
			tempDoc.innerHTML = xhr.responseText;


			let src = tempDoc.querySelector("#image-container").getElementsByTagName("img")[0].src;

			let image = new Image()
			image.src = src;
			thumbnailContainer.append(image)
			lastId++;

			if(lastId < hrefAr.length){
				xhr.open('GET', hrefAr[lastId], true);
				xhr.send();
			}
		}
	}
})()