import { Teacher } from "@academic/teachers/domain/models/teacher.entity";
import { DrizzleService } from "@infra/database/drizzle.service";
import { Injectable } from "@nestjs/common";
import { teachersSchema } from "../database/schemas/teacher.schema";
import { eq } from "drizzle-orm";
import type { TeacherRepository } from "@academic/teachers/domain/repositories/teacher-repository.interface";

@Injectable()
export class DrizzleTeacherRepository implements TeacherRepository {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(teacher: Teacher): Promise<void>{
        await this.drizzleService.db.insert(teachersSchema).values({
            name: teacher.name,
            email: teacher.email,
            document: teacher.document,
            registration: teacher.registration,
            subject: teacher.subject,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(teacher: Teacher): Promise<void> {
        await this.drizzleService.db.update(teachersSchema).set({
            name: teacher.name,
            email: teacher.email,
            document: teacher.document,
            registration: teacher.registration,
            updatedAt: new Date(),
        }).where(eq(teachersSchema.id, teacher.id!));
    }

    async delete(id: string): Promise<void> {
        await this.drizzleService.db.
        delete(teachersSchema)
        .where(eq(teachersSchema.id, id));
    }

    async findById(id: string): Promise<Teacher | null> {
        const result = await this.drizzleService.db
        .select()
        .from(teachersSchema)
        .where(eq(teachersSchema.id, id))
        .limit(1);

        return Teacher.restore(result[0]);
    }

     async findByName(Name: string): Promise<Teacher | null> {
        const result = await this.drizzleService.db
        .select()
        .from(teachersSchema)
        .where(eq(teachersSchema.name, Name))
        .limit(1);

        return Teacher.restore(result[0]);
    }

    async findByEmail(email: string): Promise<Teacher | null> {
        const result = await this.drizzleService.db
        .select()
        .from(teachersSchema)
        .where(eq(teachersSchema.email, email.toLowerCase()))
        .limit(1);

        return Teacher.restore(result[0]);
    }
    
    async findBySubject(subject: string): Promise<Teacher | null> {
        const result = await this.drizzleService.db
        .select()
        .from(teachersSchema)
        .where(eq(teachersSchema.email, subject.toLowerCase()))
        .limit(1);

        return Teacher.restore(result[0]);
    }

    async findAll(): Promise<Teacher[]> {
        const rows = await this.drizzleService.db
        .select()
        .from(teachersSchema)
        return rows.map((row) => Teacher.restore(row)!);
    }

}