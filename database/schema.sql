set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."posts" (
	"postId" serial NOT NULL,
	"userId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"price" integer NOT NULL,
	"description" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"uploadedAt" timestamptz(6) not null default now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"nickname" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."chats" (
	"channel_url" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "chats_pk" PRIMARY KEY ("channel_url")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorites" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"favoritedAt" timestamptz(6) not null default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."pictures" (
	"pictureId" serial NOT NULL,
	"postId" serial NOT NULL,
  "url" TEXT,
	CONSTRAINT "pictures_pk" PRIMARY KEY ("pictureId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
