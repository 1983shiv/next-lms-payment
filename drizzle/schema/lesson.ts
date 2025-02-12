import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";
import { UserLessonCompleteTable } from "./userLessonComplete";


export const lessonStatuses = ["public", "private", "preview"] as const;
export type lessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);

export const lessonTable = pgTable("lessons", {
    id,
    name: text().notNull(),
    description: text().notNull(),
    youtubeVideoId: text().notNull(),
    status: lessonStatusEnum().notNull().default("private"),
    order: integer().notNull(),
    sectionId: uuid().notNull().references(() => CourseSectionTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt
})

export const lessonRelationships = relations(lessonTable, ({ one, many }) => ({
    section: one(CourseSectionTable, {
        fields: [lessonTable.sectionId],
        references: [CourseSectionTable.id]
    }),
    userLessonComplete: many(UserLessonCompleteTable)
}))