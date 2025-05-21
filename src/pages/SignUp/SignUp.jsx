import Header from '../../components/Header/Header.jsx';
import './SignIn.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slice/userSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import User from '../User/User.jsx';
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText.jsx';
import { PhoneInput } from 'react-international-phone';
import { useRegisterMutation } from '../../store/api/authApi.js';
import SignForm from '../../components/SignForm/SignForm.jsx';
import React from 'react';
import { toast } from 'react-toastify';

const SignUp = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerUser, { data: regSec, error, isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: user, mode: 'onBlur' });

    const onSubmit = async (data) => {
        const result = await registerUser(data).unwrap();

        if (!error) {
            toast.success('User created!');
            setTimeout(() => {
                dispatch(setUser(result.user));
                sessionStorage.setItem('token', result.access_token);
                sessionStorage.setItem('user', JSON.stringify(result.user));
                navigate('/');
            }, 1500);
        } else {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Header />
            <section className="sign">
                <div className="container sign_container sign_reg">
                    {user?.firstName ? (
                        <User />
                    ) : (
                        <>
                            <h1 className={'sign_title'}>
                                <GradientText
                                    colors={['#4ff9bb', '#c25ccc', '#5200da']}
                                    animationSpeed={3}
                                    showBorder={false}
                                    className="custom-class"
                                >
                                    Create user!
                                </GradientText>
                            </h1>
                            <hr />
                            <SignForm
                                onSubmit={onSubmit}
                                register={register}
                                handleSubmit={handleSubmit}
                                watch={watch}
                                setValue={setValue}
                                errors={errors}
                                isLoading={isLoading}
                                error={error}
                            />{' '}
                            <hr />
                            <div className={'sign_signUp'}>
                                Have an account? <Link to={'/signIn'}>Login</Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default SignUp;
