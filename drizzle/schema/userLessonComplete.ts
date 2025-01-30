import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { lessonTable } from "./lesson";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";


export const UserLessonCompleteTable = pgTable("user_lesson_completes", {
    userId: uuid().notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    lessonId: uuid().notNull().references(() => lessonTable.id, { onDelete: "cascade" }),
    completedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt
}, t => [primaryKey({ columns: [t.userId, t.lessonId] })])


export const UserLessonCompleteRelationships = relations(
    UserLessonCompleteTable, ({ one }) => ({
        user: one(UserTable, {
            fields: [UserLessonCompleteTable.userId],
            references: [UserTable.id]
        }),
        lesson: one(lessonTable, {
            fields: [UserLessonCompleteTable.lessonId],
            references: [lessonTable.id]
        })
    })
)

