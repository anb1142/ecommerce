ALTER TABLE "ecommerce_product_image" ALTER COLUMN "product_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "ecommerce_product_image" ALTER COLUMN "image_id" SET DATA TYPE integer;--> statement-breakpoint
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
