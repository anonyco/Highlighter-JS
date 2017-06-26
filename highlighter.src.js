highlight = function(text, styles, dontwraparound, saferCharCode){
	"use-strict";
	
	if (styles && (styles instanceof Array || styles.isArray)){
		styles = {
			'background:yellow': styles
		}
	}
	var arr = saferCharCode ? Array.from(text) : [].slice.call(text),
		arrlen = arr.length,
		cur,
		value_start,
		value_end,
		curstyle,
		i,
		k;
	if (dontwraparound){
		for (k in styles){
			cur = styles[k], i=cur.length, curstyle = '<span style="' + k + '">';
			while (i--)
				arr[cur[i][0]] = curstyle + arr[cur[i][0]], arr[cur[i][1]] += '</span>';
		}
	} else {
		for (k in styles){
			cur = styles[k], i=cur.length, curstyle = '<span style="' + k + '">';
			while (i--){
				value_start = (arrlen + (cur[i][0] % arrlen)) % arrlen;
				value_end = (arrlen + (cur[i][1] % arrlen)) % arrlen;
				if (value_start <= value_end){
					arr[value_start] = curstyle + arr[value_start];
					arr[value_end] += '</span>';
				} else {
					arr[value_end] = curstyle + arr[value_end];
					arr[value_start] += '</span>';
				}
			}
		}
	}
	return arr.join('');
};