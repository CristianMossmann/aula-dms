import type { Teacher } from "@academic/teachers/domain/models/teacher.entity";

export class teacherDto {
  private constructor(
    public name: string,
    public email: string,
    public document: string,
    public registration: string,
    public subject: string,
  ) {}

  public static fromTeacher(teacher: Teacher | null): teacherDto | null {
    if (!teacher) return null;
    return new teacherDto(
      teacher.name,
      teacher.email,
      teacher.document,
      teacher.registration,
      teacher.subject,
    );
  }
}
