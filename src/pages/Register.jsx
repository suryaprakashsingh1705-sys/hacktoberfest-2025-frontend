import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Validation schema
const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .required('Name is required.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Please confirm your password.'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched', // Initial validation on blur/touch
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Custom handleBlur to track touched fields
  const handleBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    trigger(fieldName); // Trigger validation for this field
  };

  // Custom onChange to validate only if field was previously touched/had error
  const handleChange = (fieldName) => {
    // If field was previously touched/had error, validate on change
    if (touchedFields[fieldName] || errors[fieldName]) {
      trigger(fieldName);
    }
  };

  const onSubmit = (data) => {
    // Handle form submission here (e.g., API call)
    console.log('Register data:', data);

    // Reset form after submission
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setTouchedFields({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/coreX-logo.svg"
          alt="CoreX Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[500px] bg-white border border-[#D7DDE9] rounded-[8px] px-6 py-8 shadow-sm">
        {/* Header */}
        <h2
          className="text-left text-[#05254E] text-2xl mb-1"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          LOGIN <span className="text-[#05254E]/50 font-bold"> / </span>
          <span
            className="text-[#05254E] font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            REGISTER
          </span>
        </h2>

        <p className="text-left text-xs text-[#6B7280] mb-5 font-poppins">
          Choose how you'd like to sign in
        </p>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-[#B4C2CF] text-[#0B1A2C] text-sm font-medium rounded-md mb-6 hover:bg-[#c1d0dd] transition"
        >
          <img
            src="/assets/google-icon.svg"
            alt="Google Icon"
            className="w-5 h-5"
          />
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between mb-4">
          <hr className="border-t bg-[#B4C2CF] w-full" />
          <span className="px-2 text-sm text-[#89949F] font-poppins">or</span>
          <hr className="border-t bg-[#B4C2CF] w-full" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          style={{ fontFamily: 'var(--font-inter)' }}
          noValidate
        >
          <div>
            <input
              type="text"
              {...register('name', {
                onChange: (e) => handleChange('name', e.target.value),
              })}
              onBlur={() => handleBlur('name')}
              placeholder="Name"
              className={`w-full px-4 py-2.5 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register('email', {
                onChange: (e) => handleChange('email', e.target.value),
              })}
              onBlur={() => handleBlur('email')}
              placeholder="Email"
              className={`w-full px-4 py-2.5 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field with fixed alignment */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  onChange: (e) => handleChange('password', e.target.value),
                })}
                onBlur={() => handleBlur('password')}
                placeholder="Password"
                className={`w-full px-4 py-2.5 pr-12 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field with fixed alignment */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  onChange: (e) =>
                    handleChange('confirmPassword', e.target.value),
                })}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Confirm Password"
                className={`w-full px-4 py-2.5 pr-12 border rounded-md text-base placeholder:text-[#767676] focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#D7DDE9] focus:ring-[#CBD5E1]'
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2.5 text-base text-white rounded-md font-medium transition ${
              isValid && isDirty
                ? 'bg-[#023e8a] hover:bg-[#1054ab] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isValid || !isDirty}
          >
            Continue
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#0B1A2C] font-medium hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center gap-4 text-[12px] text-[#05254E] text-xs font-medium font-poppins">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
