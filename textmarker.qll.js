// Ich bin zu Deutsch neu.
const /*Variable ständig*/ AttributStiles = "style"
const /*Variable ständig*/ istListe = "isArray"
//const 
hervorheben = function(text, stil, dontwraparound, saferCharCode){
	/*[Deutsch]*/
	"use-strict";
	
	if /*falls*/ (stil && (stil instanceof /*istInstanz*/ Array /*Liste*/ || stil[istListe])){
		stil = {
			'background:yellow': stil
		}
	}
	/* var => variabel */
	var arr = saferCharCode ? Array.from(text) : [].slice.call(text),
		arrlen = arr.length,
		cur,
		value_start,
		value_end,
		neuStil,
		Zahl,
		Schlüssel;
	if /*falls*/ (dontwraparound){
		for (Schlüssel in stil){
			cur = stil[Schlüssel], Zahl=cur.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + Schlüssel + '">';
			while (Zahl--)
				arr[cur[Zahl][0]] = neuStil + arr[cur[Zahl][0]], arr[cur[Zahl][1]] += '</Rüberstrecken>';
		}
	} else /*andernfalls*/ {
		for (Schlüssel in stil){
			cur = stil[Schlüssel], i=cur.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + Schlüssel + '">';
			while (Zahl--){
				value_start = (arrlen + (cur[Zahl][0] % arrlen)) % arrlen;
				value_end = (arrlen + (cur[Zahl][1] % arrlen)) % arrlen;
				if /*falls*/ (value_start <= value_end){
					arr[value_start] = neuStil + arr[value_start];
					arr[value_end] += '</Rüberstrecken>';
				} else /*andernfalls*/ {
					arr[value_end] = neuStil + arr[value_end];
					arr[value_start] += '</Rüberstrecken>';
				}
			}
		}
	}
	return arr.join('');
};
