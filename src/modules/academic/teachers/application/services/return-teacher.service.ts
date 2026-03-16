import { teacherDto } from "@academic/teachers/application/dto/teacher.dto";
import {
  TEACHER_REPOSITORY,
  type TeacherRepository,
} from "@academic/teachers/domain/repositories/teacher-repository.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ReturnTeacherService {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async executeById(id: string): Promise<teacherDto | null> {
    const response = await this.teacherRepository.findById(id);
    return teacherDto.fromTeacher(response);
  }

  async executeByEmail(email: string): Promise<teacherDto | null> {
    const response = await this.teacherRepository.findByEmail(email);
    return teacherDto.fromTeacher(response);
  }

    async executeBySubject(subject: string): Promise<teacherDto | null> {
    const response = await this.teacherRepository.findBySubject(subject);
    return teacherDto.fromTeacher(response);
  }
}
