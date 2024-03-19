CREATE TABLE IF NOT EXISTS "ecommerce_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"parent_category_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"image_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" numeric NOT NULL,
	"description" text,
	"category_id" integer NOT NULL,
	"visible" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
