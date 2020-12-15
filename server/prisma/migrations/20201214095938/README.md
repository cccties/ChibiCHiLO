# Migration `20201214095938`

This migration has been generated by Kohei Watanabe at 12/14/2020, 6:59:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "resources" (
"id" SERIAL,
    "video_id" INTEGER,
    "url" TEXT NOT NULL,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "videos" (
"id" SERIAL,
    "provider_url" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "tracks" (
"id" SERIAL,
    "video_id" INTEGER NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'subtitles',
    "language" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "topics" (
"id" SERIAL,
    "resource_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time_required" INTEGER NOT NULL,
    "shared" BOOLEAN NOT NULL DEFAULT true,
    "creator_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "keywords" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "lti_context" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "lti_resource_link" (
    "id" TEXT NOT NULL,
    "context_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "books" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT E'ja',
    "time_required" INTEGER,
    "shared" BOOLEAN NOT NULL DEFAULT true,
    "author_id" INTEGER NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "sections" (
"id" SERIAL,
    "book_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "topic_sections" (
"id" SERIAL,
    "section_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "users" (
"id" SERIAL,
    "lti_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "activities" (
"id" SERIAL,
    "topic_id" INTEGER NOT NULL,
    "learner_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "accounts" (
"id" SERIAL,
    "nonce" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "_KeywordToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE TABLE "_BookToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "resources.url_unique" ON "resources"("url")

CREATE UNIQUE INDEX "resources_video_id_unique" ON "resources"("video_id")

CREATE UNIQUE INDEX "keywords.name_unique" ON "keywords"("name")

CREATE INDEX "author_id" ON "books"("author_id")

CREATE INDEX "book_id" ON "sections"("book_id")

CREATE INDEX "section_id" ON "topic_sections"("section_id")

CREATE UNIQUE INDEX "users.lti_user_id_unique" ON "users"("lti_user_id")

CREATE INDEX "topic_id" ON "activities"("topic_id")

CREATE INDEX "learner_id" ON "activities"("learner_id")

CREATE UNIQUE INDEX "sessions.sid_unique" ON "sessions"("sid")

CREATE UNIQUE INDEX "accounts.nonce_timestamp_unique" ON "accounts"("nonce", "timestamp")

CREATE UNIQUE INDEX "_KeywordToTopic_AB_unique" ON "_KeywordToTopic"("A", "B")

CREATE INDEX "_KeywordToTopic_B_index" ON "_KeywordToTopic"("B")

CREATE UNIQUE INDEX "_BookToKeyword_AB_unique" ON "_BookToKeyword"("A", "B")

CREATE INDEX "_BookToKeyword_B_index" ON "_BookToKeyword"("B")

ALTER TABLE "resources" ADD FOREIGN KEY("video_id")REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "tracks" ADD FOREIGN KEY("video_id")REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "topics" ADD FOREIGN KEY("resource_id")REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "topics" ADD FOREIGN KEY("creator_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "lti_resource_link" ADD FOREIGN KEY("context_id")REFERENCES "lti_context"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "lti_resource_link" ADD FOREIGN KEY("book_id")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "books" ADD FOREIGN KEY("author_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "sections" ADD FOREIGN KEY("book_id")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "topic_sections" ADD FOREIGN KEY("section_id")REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "topic_sections" ADD FOREIGN KEY("topic_id")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "activities" ADD FOREIGN KEY("topic_id")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "activities" ADD FOREIGN KEY("learner_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_KeywordToTopic" ADD FOREIGN KEY("A")REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_KeywordToTopic" ADD FOREIGN KEY("B")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_BookToKeyword" ADD FOREIGN KEY("A")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_BookToKeyword" ADD FOREIGN KEY("B")REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201126061855..20201214095938
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -29,13 +29,13 @@
 }
 /// ビデオ
 model Video {
-  id          Int      @id @default(autoincrement())
+  id          Int       @id @default(autoincrement())
   resource    Resource?
   tracks      Track[]
   /// 動画プロバイダーの識別子: "https://www.youtube.com/" | "https://vimeo.com/"
-  providerUrl String?  @map(name: "provider_url")
+  providerUrl String?   @map(name: "provider_url")
   @@map(name: "videos")
 }
@@ -67,8 +67,10 @@
   /// 説明
   description  String
   /// 学習所要時間 (秒)
   timeRequired Int            @map(name: "time_required")
+  /// 共有可否 (true: 共有する, それ以外: 共有しない)
+  shared       Boolean        @default(true)
   /// 作成者
   creator      User           @relation(fields: [creatorId], references: [id])
   creatorId    Int            @map(name: "creator_id")
   /// 作成日
@@ -124,8 +126,14 @@
   /// 題名
   name             String
   /// 概要
   abstract         String
+  /// 言語 ISO 639-1 code
+  language         String            @default("ja")
+  /// 学習所要時間 (秒)
+  timeRequired     Int?              @map(name: "time_required")
+  /// 共有可否 (true: 共有する, それ以外: 共有しない)
+  shared           Boolean           @default(true)
   /// 著作者
   author           User              @relation(fields: [authorId], references: [id])
   authorId         Int               @map(name: "author_id")
   /// 公開日
```

