# Migration `20200625115357-add-participant`

This migration has been generated at 6/25/2020, 11:53:57 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role_new" AS ENUM ('HOST', 'PARTICIPANT');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT,
                        ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new"),
                        ALTER COLUMN "role" SET DEFAULT 'HOST';
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old"

CREATE TABLE "public"."_ParticipantOnEvent" (
"A" integer  NOT NULL ,"B" integer  NOT NULL )

ALTER TABLE "public"."Event" DROP CONSTRAINT IF EXiSTS "Event_creatorId_fkey",
DROP COLUMN "creatorId",
ADD COLUMN "hostId" integer  NOT NULL ;

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT E'HOST';

CREATE UNIQUE INDEX "_ParticipantOnEvent_AB_unique" ON "public"."_ParticipantOnEvent"("A","B")

CREATE  INDEX "_ParticipantOnEvent_B_index" ON "public"."_ParticipantOnEvent"("B")

ALTER TABLE "public"."_ParticipantOnEvent" ADD FOREIGN KEY ("A")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ParticipantOnEvent" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("hostId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200624154627-add-zoom-info-in-events-data-model..20200625115357-add-participant
--- datamodel.dml
+++ datamodel.dml
@@ -2,37 +2,39 @@
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
-  id            Int      @default(autoincrement()) @id
-  createdAt     DateTime @default(now())
-  email         String   @unique
-  password      String
-  name          String
-  role          Role     @default(USER)
-  createdEvents Event[]
+  id                Int      @default(autoincrement()) @id
+  createdAt         DateTime @default(now())
+  email             String   @unique
+  password          String
+  name              String
+  role              Role     @default(HOST)
+  hostEvents        Event[]
+  participantEvents Event[]  @relation(name: "ParticipantOnEvent", references: [id])
 }
 enum Role {
-  USER
-  ADMIN
+  HOST
+  PARTICIPANT
 }
 model Event {
-  id        Int      @default(autoincrement()) @id
-  createdAt DateTime @default(now())
-  title     String
-  createdBy User     @relation(fields: [creatorId], references: [id])
-  creatorId Int
-  startUrl  String
-  joinUrl   String
-  startTime DateTime
-  duration  Int
+  id           Int      @default(autoincrement()) @id
+  createdAt    DateTime @default(now())
+  title        String
+  host         User     @relation(fields: [hostId], references: [id])
+  hostId       Int
+  participants User[]   @relation(name: "ParticipantOnEvent", references: [id])
+  startUrl     String
+  joinUrl      String
+  startTime    DateTime
+  duration     Int
 }
```


