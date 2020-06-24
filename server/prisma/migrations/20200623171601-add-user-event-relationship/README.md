# Migration `20200623171601-add-user-event-relationship`

This migration has been generated at 6/23/2020, 5:16:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Event" ADD COLUMN "creatorId" integer  NOT NULL ;

ALTER TABLE "public"."User" ADD COLUMN "password" text  NOT NULL ;

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("creatorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200623162732-add-user-and-event-model..20200623171601-add-user-event-relationship
--- datamodel.dml
+++ datamodel.dml
@@ -2,21 +2,23 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id        Int      @default(autoincrement()) @id
-  createdAt DateTime @default(now())
-  email     String   @unique
-  name      String
-  role      Role     @default(USER)
+  id            Int      @default(autoincrement()) @id
+  createdAt     DateTime @default(now())
+  email         String   @unique
+  password      String
+  name          String
+  role          Role     @default(USER)
+  createdEvents Event[]
 }
 enum Role {
   USER
@@ -26,5 +28,7 @@
 model Event {
   id        Int      @default(autoincrement()) @id
   createdAt DateTime @default(now())
   title     String
+  createdBy User     @relation(fields: [creatorId], references: [id])
+  creatorId Int
 }
```


