import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lession";

export const courseSectionStatuses = ["public", "private"] as const;
export type courseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses);

export const CourseSectionTable = pgTable("course_sections", {
    id,
    courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: "cascade"}),
    order: integer().notNull(),
    name: text().notNull(),
    status: courseSectionStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt,
})

export const CourseSectionRelationships = relations(CourseSectionTable, ({one, many}) => ({
    course: one(CourseTable, {
        fields: [CourseSectionTable.courseId],
        references: [CourseTable.id],
    }),
    lessons: many(lessonTable)
}))