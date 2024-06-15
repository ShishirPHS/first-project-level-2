import { TStudent } from './student.interface';
import { Student } from './student.model';

const CreateStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error('Student already exists!');
  }

  const result = await Student.create(studentData); // built-in static method

  // const student = new Student(studentData); // create an instance

  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error('Student already exists!');
  // }

  // const result = await student.save(); // built-in instance method

  return result;
};

const GetAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const GetSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  CreateStudentIntoDB,
  GetAllStudentsFromDB,
  GetSingleStudentFromDB,
};
