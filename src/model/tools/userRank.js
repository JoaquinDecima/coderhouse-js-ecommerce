// Utilidad a modo ejemplo que determina si un usuario es admin o no
// ATTENCION: Actualmente esto returna true siempre
function canSell(user){
	return (user.isSeller);
}

export {canSell};
