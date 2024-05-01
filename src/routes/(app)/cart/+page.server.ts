export async function load({ parent }) {
	const layout = await parent();
	return { allProducts: layout.allProducts };
}
