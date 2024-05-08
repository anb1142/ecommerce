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
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date())
};

export const createTable = pgTableCreator((name) => `ecommerce_${name}`);

export const category = createTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	parent_category_id: integer('parent_category_id'),
	...timestamps
});

export const product = createTable('product', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	price: numeric('price').notNull(),
	description: text('description'),
	category_id: integer('category_id').notNull(),
	visible: boolean('visible').notNull().default(false),
	...timestamps
});

export const image = createTable('image', {
	id: serial('id').primaryKey(),
	alt: text('alt').notNull(),
	url: text('url').notNull(),
	...timestamps
});

export const product_image = createTable('product_image', {
	id: serial('id').primaryKey(),
	product_id: integer('product_id')
		.notNull()
		.references(() => product.id),
	image_id: integer('image_id')
		.notNull()
		.references(() => image.id),
	...timestamps
});

export const tables = {
	category,
	product,
	image,
	product_image
};

export type ITableName = keyof typeof tables;
