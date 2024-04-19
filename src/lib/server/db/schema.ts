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

export const createTable = pgTableCreator((name) => `ecommerce_${name}`);

export const category = createTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	parent_category_id: integer('parent_category_id'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const product = createTable('product', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	price: numeric('price').notNull(),
	description: text('description'),
	category_id: integer('category_id').notNull(),
	visible: boolean('visible').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const image = createTable('image', {
	id: serial('id').primaryKey(),
	alt: text('alt').notNull(),
	url: text('url').notNull()
});

export const product_image = createTable('product_image', {
	id: serial('id').primaryKey(),
	product_id: serial('product_id'),
	image_id: integer('image_id').notNull()
});

export const tables = {
	category,
	product,
	image,
	product_image
};

export type ITableName = keyof typeof tables;
