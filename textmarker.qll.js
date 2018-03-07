// Ich bin zu Deutsch neu.
const AttributStiles = "style"
//const 
hervorheben = function(text, stil, dontwraparound, saferCharCode){
	"use-strict";
	
	if (stil && (stil instanceof Array || stil.isArray)){
		stil = {
			'background:yellow': stil
		}
	}
	var arr = saferCharCode ? Array.from(text) : [].slice.call(text),
		arrlen = arr.length,
		cur,
		value_start,
		value_end,
		neuStil,
		i,
		k;
	if (dontwraparound){
		for (k in stil){
			cur = stil[k], i=cur.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + k + '">';
			while (i--)
				arr[cur[i][0]] = neuStil + arr[cur[i][0]], arr[cur[i][1]] += '</span>';
		}
	} else {
		for (k in stil){
			cur = stil[k], i=cur.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + k + '">';
			while (i--){
				value_start = (arrlen + (cur[i][0] % arrlen)) % arrlen;
				value_end = (arrlen + (cur[i][1] % arrlen)) % arrlen;
				if (value_start <= value_end){
					arr[value_start] = neuStil + arr[value_start];
					arr[value_end] += '</Rüberstrecken>';
				} else {
					arr[value_end] = neuStil + arr[value_end];
					arr[value_start] += '</Rüberstrecken>';
				}
			}
		}
	}
	return arr.join('');
};
