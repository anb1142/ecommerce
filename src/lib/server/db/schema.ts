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

export const products = createTable('products', {
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
	url: text('url').notNull()
});

export const product_images = createTable('product_images', {
	id: serial('id').primaryKey(),
	product_id: serial('product_id'),
	image_id: text('image_id').notNull()
});
