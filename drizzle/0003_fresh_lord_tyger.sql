CREATE TABLE IF NOT EXISTS "ecommerce_product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"image_id" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "ecommerce_product_image";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ecommerce_product_images" ADD CONSTRAINT "ecommerce_product_images_image_id_ecommerce_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "ecommerce_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
