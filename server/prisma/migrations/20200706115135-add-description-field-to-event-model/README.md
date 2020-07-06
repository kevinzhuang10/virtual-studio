# Migration `20200706115135-add-description-field-to-event-model`

This migration has been generated at 7/6/2020, 11:51:35 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Event" ADD COLUMN "description" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200625115357-add-participant..20200706115135-add-description-field-to-event-model
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
@@ -36,5 +36,6 @@
   startUrl     String
   joinUrl      String
   startTime    DateTime
   duration     Int
+  description  String
 }
```


