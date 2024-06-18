import { z } from 'zod';

// Define the validation schema for StudentName
const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can't be more than 20 characters.")
    .min(1, 'First Name is required.'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required.')
    .regex(
      /^[A-Za-z]+$/,
      'Last Name should contain only alphabetic characters.',
    ),
});

// Define the validation schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required.'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required.'),
  fatherContactNo: z.string().min(1, 'Father Contact Number is required.'),
  motherName: z.string().min(1, 'Mother Name is required.'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required.'),
  motherContactNo: z.string().min(1, 'Mother Contact Number is required.'),
});

// Define the validation schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z.string().min(1, 'Local guardian contact number is required.'),
  address: z.string().min(1, 'Local guardian address is required.'),
});

// Define the validation schema for Student
const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required.'),
  password: z
    .string()
    .min(6, "password can't be less than 6 characters")
    .max(20),
  name: studentNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']).refine(
    (val) => ['male', 'female', 'other'].includes(val),
    (val) => ({
      message: `${val} is not a valid gender`,
    }),
  ),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional(),
});

export default studentValidationSchema;
