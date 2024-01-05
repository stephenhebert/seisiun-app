CREATE TABLE "users" (
  "id" serial NOT NULL,
  "auth_id" VARCHAR(255) NOT NULL UNIQUE,
  "username" VARCHAR(255) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "sessions" (
  "id" serial NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "created_by" integer NOT NULL,
  CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "tunes" (
  "id" serial NOT NULL,
  "databaseId" integer NOT NULL,
  "databaseTuneId" integer NOT NULL,
  CONSTRAINT "tunes_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "user_tunes" (
  "user_id" integer NOT NULL,
  "tune_id" integer NOT NULL,
  "created" TIMESTAMP NOT NULL,
  "is_favorite" BOOLEAN NOT NULL,
  "status" VARCHAR(255) NOT NULL,
  CONSTRAINT "user_tunes_pk" PRIMARY KEY ("user_id", "tune_id")
) WITH (OIDS = FALSE);

CREATE TABLE "tune_names" (
  "id" serial NOT NULL,
  "tune_id" integer NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  CONSTRAINT "tune_names_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "tune_comments" (
  "id" serial NOT NULL,
  "tune_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "comment" TEXT NOT NULL,
  "created" TIMESTAMP NOT NULL,
  "has_abc" integer NOT NULL,
  CONSTRAINT "tune_comments_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "databases" (
  "id" serial NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  CONSTRAINT "databases_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "user_sessions" (
  "session_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  CONSTRAINT "user_sessions_pk" PRIMARY KEY ("session_id", "user_id")
) WITH (OIDS = FALSE);

ALTER TABLE
  "sessions"
ADD
  CONSTRAINT "sessions_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");

ALTER TABLE
  "tunes"
ADD
  CONSTRAINT "tunes_fk0" FOREIGN KEY ("databaseId") REFERENCES "databases"("id");

ALTER TABLE
  "user_tunes"
ADD
  CONSTRAINT "user_tunes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "user_tunes"
ADD
  CONSTRAINT "user_tunes_fk1" FOREIGN KEY ("tune_id") REFERENCES "tunes"("id");

ALTER TABLE
  "tune_names"
ADD
  CONSTRAINT "tune_names_fk0" FOREIGN KEY ("tune_id") REFERENCES "tunes"("id");

ALTER TABLE
  "tune_comments"
ADD
  CONSTRAINT "tune_comments_fk0" FOREIGN KEY ("tune_id") REFERENCES "tunes"("id");

ALTER TABLE
  "tune_comments"
ADD
  CONSTRAINT "tune_comments_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "user_sessions"
ADD
  CONSTRAINT "user_sessions_fk0" FOREIGN KEY ("session_id") REFERENCES "sessions"("id");

ALTER TABLE
  "user_sessions"
ADD
  CONSTRAINT "user_sessions_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");