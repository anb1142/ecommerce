type ILink = {
	text: string;
	new?: boolean;
};
type ILinks = {
	[key: string]: ILink;
};

const links: ILinks = {
	dashboard: {
		text: 'Dashboard'
	},
	category: {
		text: 'Categories',
		new: true
	},
	image: {
		text: 'Images',
		new: true
	},
	product: {
		text: 'Products',
		new: true
	}
};
export default links;
