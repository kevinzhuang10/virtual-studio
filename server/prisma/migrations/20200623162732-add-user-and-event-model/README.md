# Migration `20200623162732-add-user-and-event-model`

This migration has been generated at 6/23/2020, 4:27:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "public"."User" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text  NOT NULL ,"id" SERIAL,"name" text  NOT NULL ,"role" "Role" NOT NULL DEFAULT E'USER',
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Event" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" SERIAL,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200623162732-add-user-and-event-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,30 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  email     String   @unique
+  name      String
+  role      Role     @default(USER)
+}
+
+enum Role {
+  USER
+  ADMIN
+}
+
+model Event {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  title     String
+}
```


