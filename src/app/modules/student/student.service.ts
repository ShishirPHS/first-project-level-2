import { Student } from './student.interface';
import { StudentModel } from './student.model';

const CreateStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const GetAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

export const StudentServices = {
  CreateStudentIntoDB,
  GetAllStudentsFromDB,
};
