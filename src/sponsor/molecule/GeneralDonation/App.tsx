import * as React from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useCart } from '../../../contexts/Cart';



interface Props {
    id: string,
    short_description: string, 
    long_description: string
}

const GeneralDonation = (props: Props) => {

    const {id, short_description, long_description} = props

    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    const [checked, setChecked] = React.useState(false);

    const { addToCart, removeFromCart, cart } = useCart()

    const inputRef = React.useRef<HTMLInputElement>(null)
    const modalInputRef = React.useRef<HTMLInputElement>(null)

    const [price, setPrice] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && price > 0) {
            setChecked(true);
            addToCart({
                name: "General Donation",
                short_description: props.short_description,
                price: price,
                date_start: new Date(),
                quantity: 1,
                id: props.id
            })
        }
        else {
            setChecked(false);
            removeFromCart(props.id)
            setPrice(0);
        }
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            let parsedValue = +event.target.value
            if (parsedValue > 0) {
                setPrice(parsedValue);
                return;
            }
        }
        setPrice(0)
    };

    React.useEffect(() => {
        if (inputRef?.current?.value != null) {
            if (price !== 0) {
                inputRef.current.value = `${price}`
            }
            else {
                inputRef.current.value = ''
            }
        }
        if (modalInputRef?.current?.value != null) {
            if (price !== 0) {
                modalInputRef.current.value = `${price}`
            }
            else {
                modalInputRef.current.value = ''
            }
        }
        if (price > 0) {
            setChecked(true);
            addToCart({
                name: "General Donation",
                short_description: props.short_description,
                price: price,
                date_start: new Date(),
                quantity: 1,
                id: props.id
            })
            return;
        } else {
            setChecked(false);
            removeFromCart(props.id);
        }
    }, [price])


    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{
                        borderColor: "#367c63", borderWidth: theme.spacing(.5), borderRadius: 0, maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt: theme.spacing(4)
                    }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>
                            <Grid item xs={1} sx={{ marginTop: theme.spacing(2) }}>
                                <Checkbox checked={checked}
                                    onChange={handleChange} />
                            </Grid>

                            <Grid item xs={2} sx={{ pr: theme.spacing(15) }}>
                                <Typography sx={{ mt: theme.spacing(3), textAlign: 'center', fontWeight: "600" }} variant="h6">-</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">General Donation</Typography>
                                <Typography sx={{ color:"#979797"}}variant="body1">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">-</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">1</Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={2} sx={{ pt: theme.spacing(2) }}>
                                        <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="h6">$</Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField onChange={handlePriceChange} inputRef={inputRef} sx={{ maxWidth: theme.spacing(20) }} id="outlined-basic" label="Price" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(1.5), pl: theme.spacing(9) }}>
                                <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize: theme.spacing(8) }} variant="body1">
                                    {'>'}
                                </Typography>
                            </Grid>

                        </Grid>

                    </Paper>
                </Grid>
            </Grid>

            <Modal
                open={openEvent}
                onClose={handleCloseEvent}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: theme.spacing(200),
                    minWidth: theme.spacing(200),
                    maxHeight: theme.spacing(70),
                    minHeight: theme.spacing(70),
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'scroll',
                }}>
                    <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(20), m: theme.spacing(6) }} >

                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                            <Grid item xs={7}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">General Donation</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body1">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={7} sx={{ pt: theme.spacing(2) }}>
                                        <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="h6">$</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField sx={{ maxWidth: theme.spacing(20) }} id="outlined-basic" label="Price" variant="outlined" defaultValue={price} onChange={handlePriceChange} inputRef={modalInputRef} />
                                    </Grid>
                                </Grid>
                            </Grid>



                        </Grid>
                    </Paper>

                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={10}>
                            <Typography variant="body1">{long_description}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>

                        <Grid item xs={1}>
                            <Typography sx={{ pt: theme.spacing(5) }} variant="body1">SELECT</Typography>
                        </Grid>
                        <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                            <Checkbox checked={checked}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>

                </Box>
            </Modal>

        </ThemeProvider>


    )
}

export default GeneralDonation