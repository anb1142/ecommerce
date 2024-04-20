export type ICartItem = {
	id: string;
	quantity: number;
	checked: boolean;
};
export type ICartState = { [id: string]: ICartItem };

const setCart = (cart: ICartState) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = (): ICartState => {
	return JSON.parse(localStorage.getItem('cart') || '{}');
};
export const addToCart = (id: string) => {
	const cart = getCart();
	if (cart[id]) cart[id] = { id: id, quantity: cart[id].quantity + 1, checked: true };
	else cart[id] = { id: id, quantity: 1, checked: true };
	setCart(cart);
};
export const removeFromCart = (id: string) => {
	const cart = getCart();
	if (!cart[id]) return;
	if (cart[id].quantity > 1)
		cart[id] = { id: id, quantity: cart[id].quantity - 1, checked: true };
	else delete cart[id];
	setCart(cart);
};
export const deleteCartItem = (id: string) => {
	const cart = getCart();
	delete cart[id];
	setCart(cart);
};
