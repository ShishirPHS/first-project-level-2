import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TStudentName,
} from './student.interface';

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    trim: true,
    maxLength: [20, "First Name can't be more than 20 characters."],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return value === firstNameStr;
    //   },
    //   message: '{VALUE} is not in capitalize format.',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} isn't valid",
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required.'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required.'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required.'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required.'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    min: [6, "password can't be less than 6 characters"],
    max: [20, "password can't be greater than 20 characters"],
  },
  name: {
    type: studentNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact name is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// pre save middleware / hook: will work on create() or save()
studentSchema.pre('save', function () {
  console.log(this, 'pre hook: we will save the data');
});

// pre save middleware / hook
studentSchema.post('save', function () {
  console.log(this, 'post hook: we saved our data');
});

// creating a custom static method

studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });

  return existingStudent;
};

// creating a custom instance method
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
