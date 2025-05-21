import React from 'react';
import Header from '../../components/Header/Header.jsx';
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/authApi.js';
import SignForm from '../../components/SignForm/SignForm.jsx';
import { setUser } from '../../store/slice/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignIn = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [loginUser, { data: LogSec, error, isLoading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: user, mode: 'onBlur' });
    const onSubmit = async (data) => {
        const { email, password } = data;
        const result = await loginUser({ email, password }).unwrap();

        if (!error) {
            toast.success('Login success!');
            dispatch(setUser(result.user));
            sessionStorage.setItem('token', result.access_token);
            sessionStorage.setItem('user', JSON.stringify(result.user));
            navigate('/');
        }
    };
    return (
        <>
            <Header />
            <section className="sign">
                <div className="container sign_container sign_reg">
                    <>
                        <h1 className={'sign_title'}>
                            <GradientText
                                colors={['#4ff9bb', '#c25ccc', '#5200da']}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                            >
                                Login
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
                            login
                        />
                        <hr />
                        <div className={'sign_signUp'}>
                            Have not an Account? <Link to={'/signUp'}>Registered</Link>
                        </div>
                    </>
                </div>
            </section>
        </>
    );
};

export default SignIn;
