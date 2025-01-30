import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, id } from "../schemaHelper";


export const CourseTable = pgTable("courses", {
    id,
    name: text().notNull(),
    description: text().notNull(),
    createdAt,
    updatedAt,
})

export const CourseRelationships = relations(CourseTable, ({one, many}) => ({
    test: one(),
}))