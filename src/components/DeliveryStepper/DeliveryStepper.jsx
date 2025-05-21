import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../OrderCard/OrderCard.jsx';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../store/slice/storeSlice.js';
import './DeliveryStepper.scss';
import { useState } from 'react';
import { useCreateOrderMutation } from '../../store/api/ordersApi.js';
import { toast } from 'react-toastify';

const steps = ['Choose delivery property', 'Confirm order'];

export default function DeliveryStepper() {
    const user = useSelector((state) => state.user);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [address, setAddress] = useState(user.address ?? '');
    const [paymentType, setPaymentType] = useState('');
    const dispatch = useDispatch();
    const store = useSelector((state) => state.store.products);
    const navigate = useNavigate();
    const [createOrder, { error }] = useCreateOrderMutation();
    const orderPayload = {
        userName: `${user.firstName} ${user.lastName}`,
        userId: user.id,
        address: address,
        paymentType: paymentType,
        items: store.map((item) => ({
            price: item.price,
            product: item._id,
            quantity: item.quantity,
        })),
    };

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (address && paymentType) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleSubmit = async () => {
        dispatch(
            addOrder({
                address: address,
                payBy: paymentType,
                user: user.firstName + ' ' + user.lastName,
                email: user.email,
            })
        );
        await createOrder(orderPayload);

        if (!error) {
            toast.success('Order created');
            setActiveStep(2);
        } else {
            toast.error(error.message);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ '& .MuiStepIcon-root': { color: 'white' } }}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                        <StepLabel className={'stepper'}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <div>
                    <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
                        Thank you for your order, see you later alligator!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={() => navigate('/')} sx={{ color: 'white', border: '1px solid white' }}>
                            Go to shop
                        </Button>
                    </Box>
                </div>
            ) : (
                <div>
                    <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>Step {activeStep + 1}</Typography>
                    {activeStep === 0 && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                required
                                label="Delivery Address"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{
                                    mb: 2,
                                    input: { color: 'white' },
                                    label: { color: 'white' },
                                    fieldset: { borderColor: 'white' },
                                }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel sx={{ color: 'white' }}>Payment Method</InputLabel>
                                <Select
                                    required
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    label="Payment Method"
                                    sx={{
                                        color: 'white',
                                        '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '.MuiSvgIcon-root': { color: 'white' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '.MuiInputBase-input': { color: 'white' },
                                    }}
                                >
                                    <MenuItem value="card">Credit Card</MenuItem>
                                    <MenuItem value="cash">Cash on Delivery</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography sx={{ mb: 2, color: 'white' }}>Confirm your order</Typography>
                            {store.map((item) => (
                                <OrderCard key={item._id} product={item} />
                            ))}
                            Total price: <span>{store.reduce((acc, item) => acc + item.price, 0)} $</span>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ? (
                            <Button color="error" onClick={() => navigate(-1)}>
                                Back to cart
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, color: 'white', border: '1px solid white' }}
                            >
                                Back
                            </Button>
                        )}

                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            onClick={activeStep === 1 ? handleSubmit : handleNext}
                            sx={{
                                color: 'white',
                                border: '1px solid white',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </div>
            )}
        </Box>
    );
}
