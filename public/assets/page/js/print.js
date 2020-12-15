let divDOM = document.getElementById("info");
let barcodeValue = document.getElementById("barcodeValue").value;
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute('jsbarcode-value', barcodeValue);
svg.setAttribute('jsbarcode-width', '1')
svg.setAttribute('jsbarcode-height', '30')

svg.className.baseVal = "barcode";
divDOM.appendChild(svg);

console.log(document.querySelector('.barcode'));
JsBarcode(".barcode").init();