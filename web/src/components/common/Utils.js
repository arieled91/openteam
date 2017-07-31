export const dateTimeFormat = (dateTime) => {
    return new Date(dateTime).toLocaleString('es-AR',{day: 'numeric', month:'numeric' , year:'numeric' , hour: '2-digit', minute:'2-digit'});
};