// Ich bin zu Deutsch neu.
const /*Variable ständig*/ AttributStiles = "style"
const /*Variable ständig*/ istListe = "isArray"
hervorheben = function(text, stil, dontwraparound, saferCharCode){
	/*[Deutsch]*/
	"use-strict";
	
	if /*falls*/ (stil && (stil instanceof /*istInstanz*/ Array /*Liste*/ || stil[istListe])){
		stil = {
			'background:yellow': stil
		}
	}
	/* var => variabel */
	var neuListe = saferCharCode ? Array.from(text) : [].slice.call(text),
		LängeListe = neuListe.length,
		aktuell,
		value_start,
		value_end,
		neuStil,
		Zahl,
		Schlüssel;
	if /*falls*/ (dontwraparound){
		for /*für*/ (Schlüssel in /*im*/ stil){
			aktuell = stil[Schlüssel], Zahl=aktuell.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + Schlüssel + '">';
			while /*während*/ (Zahl--)
				neuListe[aktuell[Zahl][0]] = neuStil + neuListe[aktuell[Zahl][0]], neuListe[aktuell[Zahl][1]] += '</Rüberstrecken>';
		}
	} else /*andernfalls*/ {
		for /*für*/ (Schlüssel in /*im*/ stil){
			aktuell = stil[Schlüssel], Zahl=aktuell.length, neuStil = '<Rüberstrecken ' + AttributStiles + '="' + Schlüssel + '">';
			while /*während*/ (Zahl--){
				value_start = (LängeListe + (aktuell[Zahl][0] % LängeListe)) % LängeListe;
				value_end = (LängeListe + (aktuell[Zahl][1] % LängeListe)) % LängeListe;
				if /*falls*/ (value_start <= value_end){
					neuListe[value_start] = neuStil + neuListe[value_start];
					neuListe[value_end] += '</Rüberstrecken>';
				} else /*andernfalls*/ {
					neuListe[value_end] = neuStil + neuListe[value_end];
					neuListe[value_start] += '</Rüberstrecken>';
				}
			}
		}
	}
	return /*Rückkehr*/ neuListe.join('');
};
