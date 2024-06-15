import { Student } from './student.interface';
import { StudentModel } from './student.model';

const CreateStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(student); // built-in static method

  const student = new StudentModel(studentData);
  const result = await student.save(); // built-in instance method

  return result;
};

const GetAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const GetSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  CreateStudentIntoDB,
  GetAllStudentsFromDB,
  GetSingleStudentFromDB,
};
