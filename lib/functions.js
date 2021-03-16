export function displayDatetime(date, options) { 
	date = date ? new Date(date) : new Date();
    if (!date.getTime()) return "";
	return new Intl.DateTimeFormat('es-PE', { dateStyle: 'full',
		timeStyle: 'short', ...options}).format(date);
}

export function displayDatetimeFechaTime(fecha, time) { 
	const date = (fecha||inputDateFormat())+"T"+(time||'00:00');
	return displayDatetime(date, { dateStyle: fecha?'full':undefined, 
		timeStyle: time?'short':undefined });
}

export const displayGenero = (code) => {
    switch (code) {
        case 'M':
            return "Masculino"
        case 'F':
            return "Femenino"
        case 'O':
            return "Otro"
        default:
            return "";
    }
}