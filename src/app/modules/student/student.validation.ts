import Joi from 'joi';

// creating schema validation using joi
const studentNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const firstNameStr =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (value !== firstNameStr) {
        return helpers.error('any.invalid', {
          message: `${value} is not in capitalize format.`,
        });
      }
      return value;
    }, 'First Name Capitalize Check'),
  middleName: Joi.string().allow(''), // Optional field
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[a-zA-Z]+$/.test(value)) {
        return helpers.error('any.invalid', {
          message: `${value} isn't valid`,
        });
      }
      return value;
    }, 'Last Name Alpha Check'),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: studentNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#label} is not valid',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email type',
  }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
