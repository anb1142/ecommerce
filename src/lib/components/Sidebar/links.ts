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
	categories: {
		text: 'Categories',
		new: true
	},
	media: {
		text: 'Media',
		new: true
	},
	products: {
		text: 'Products',
		new: true
	}
};
export default links;
