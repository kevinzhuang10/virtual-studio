# Migration `20200624154627-add-zoom-info-in-events-data-model`

This migration has been generated at 6/24/2020, 3:46:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Event" ADD COLUMN "duration" integer  NOT NULL ,
ADD COLUMN "joinUrl" text  NOT NULL ,
ADD COLUMN "startTime" timestamp(3)  NOT NULL ,
ADD COLUMN "startUrl" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200623171601-add-user-event-relationship..20200624154627-add-zoom-info-in-events-data-model
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -30,5 +30,9 @@
   createdAt DateTime @default(now())
   title     String
   createdBy User     @relation(fields: [creatorId], references: [id])
   creatorId Int
+  startUrl  String
+  joinUrl   String
+  startTime DateTime
+  duration  Int
 }
```


