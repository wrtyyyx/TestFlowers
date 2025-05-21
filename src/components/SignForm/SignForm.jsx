import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import '../../pages/SignUp/SignIn.scss';

const SignForm = ({ onSubmit, register, handleSubmit, watch, setValue, errors, isLoading, error, login }) => (
    <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
        {!login && (
            <>
                <div className="sign_group">
                    <label>Enter First Name</label>
                    <input
                        {...register('firstName', { required: 'Enter your first name!' })}
                        type="text"
                        placeholder="First name..."
                    />
                    {errors.firstName && <p className="sign_error">{errors.firstName.message}</p>}
                </div>

                <div className="sign_group">
                    <label>Enter Last Name</label>
                    <input
                        {...register('lastName', { required: 'Enter your last name!' })}
                        type="text"
                        placeholder="Last name..."
                    />
                    {errors.lastName && <p className="sign_error">{errors.lastName.message}</p>}
                </div>
            </>
        )}

        <div className="sign_group">
            <label>Enter Email</label>
            <input {...register('email', { required: 'Enter your email!' })} type="email" placeholder="Email..." />
            {errors.email && <p className="sign_error">{errors.email.message}</p>}
        </div>

        {!login && (
            <div className="sign_group">
                <label>Enter Phone Number</label>
                <PhoneInput
                    defaultCountry="ua"
                    placeholder="Enter phone number"
                    className="react-international-phone"
                    value={watch('phone')}
                    autoComplete="username"
                    onChange={(value) => setValue('phone', value, { shouldValidate: true })}
                />
                {errors.phone && <p className="sign_error">{errors.phone.message}</p>}
            </div>
        )}

        <div className="sign_group">
            <label>Enter Password</label>
            <input
                {...register('password', { required: 'Enter your password!' })}
                type="password"
                placeholder="Password..."
                autoComplete="current-password"
            />
            {errors.password && <p className="sign_error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="sign_button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <div className="sign_error">{error.data.message}</div>}
    </form>
);

export default SignForm;
