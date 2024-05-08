import {
	boolean,
	integer,
	numeric,
	pgTableCreator,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

const timestamps = {
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at', { mode: 'date' })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
};

export const createTable = pgTableCreator((name) => `ecommerce_${name}`);

export const tb_category = createTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	parent_category_id: integer('parent_category_id'),
	...timestamps
});

export const tb_product = createTable('product', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	price: numeric('price').notNull(),
	description: text('description'),
	category_id: integer('category_id').notNull(),
	visible: boolean('visible').notNull().default(false),
	...timestamps
});

export const tb_image = createTable('image', {
	id: serial('id').primaryKey(),
	alt: text('alt').notNull(),
	url: text('url').notNull(),
	...timestamps
});

export const tb_product_image = createTable('product_image', {
	id: serial('id').primaryKey(),
	product_id: integer('product_id')
		.notNull()
		.references(() => tb_product.id),
	image_id: integer('image_id')
		.notNull()
		.references(() => tb_image.id),
	...timestamps
});

export const tables = {
	category: tb_category,
	product: tb_product,
	image: tb_image,
	product_image: tb_product_image
};

export type ITableName = keyof typeof tables;
