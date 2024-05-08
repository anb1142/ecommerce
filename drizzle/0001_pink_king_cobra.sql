ALTER TABLE "ecommerce_category" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "ecommerce_image" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ecommerce_image" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "ecommerce_product" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "ecommerce_product_image" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ecommerce_product_image" ADD COLUMN "updated_at" timestamp;