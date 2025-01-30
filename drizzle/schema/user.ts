import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { UserCourseAccessTable } from "./userCourseAccess";



export const userRoles = ["admin", "instructor", "user"] as const;
export type userRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
    id,
    clerkUserId: text().notNull().unique(),
    email: text().notNull().unique(),
    role: userRoleEnum().notNull().default("user"),
    imageUrl: text(),
    deletedAt: timestamp( { withTimezone: true } ),
    createdAt,
    updatedAt
})

export const UserRelationships = relations(UserTable, ({ many }) => ({
    userCourseAccesses: many(UserCourseAccessTable),
  }))
