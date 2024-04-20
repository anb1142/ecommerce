CREATE TABLE IF NOT EXISTS "ecommerce_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"parent_category_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" numeric NOT NULL,
	"description" text,
	"category_id" integer NOT NULL,
	"visible" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ecommerce_product_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ecommerce_product_image" ADD CONSTRAINT "ecommerce_product_image_product_id_ecommerce_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "ecommerce_product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ecommerce_product_image" ADD CONSTRAINT "ecommerce_product_image_image_id_ecommerce_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "ecommerce_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
