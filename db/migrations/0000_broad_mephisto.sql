CREATE TABLE "character_likes" (
	"character_name" text NOT NULL,
	"ip" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "character_likes_character_name_ip_pk" PRIMARY KEY("character_name","ip")
);
