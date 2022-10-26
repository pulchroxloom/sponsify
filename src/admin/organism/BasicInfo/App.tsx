import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuBar from '../../molecule/MenuBar/App'
import FormData from 'form-data'
import axios from "axios";
import { isCompositeComponent } from 'react-dom/test-utils';
// const axios = require('axios').default;

interface Props {
    student_org_logo: string,
    student_org_short_name: string,
    student_org_name: string, 
    street_address: string, 
    street_address_2?: string, 
    city: string, 
    state: string, 
    zipcode: number, 
}

axios.create({
    baseURL: "http://localhost:3001",
  });
const BasicInfo = (props: Props) => {
    const [image, setImage] = React.useState("");
    const [imageFile, setFile] = React.useState();
    const { student_org_logo, student_org_short_name, student_org_name, street_address, street_address_2, city, state, zipcode} = props
    const [org, setOrg] = React.useState('')
    const [logo, setLogo] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState<any|null>(null);
    // const getImage = (e) => {
    //     setFile(e.target.files[0]); //save chosen image to imageFile
    //   }
    // const handleLogoChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
       
    //     setLogo(event.target.value)
    //     //console.log(logo)
    // }
    // const handleCreateLogo = async () => {

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //         body: JSON.stringify({ 
    //             organization: student_org_name,
    //             logoImage: logo,
    //         })
    //     }
    //     console.log(logo)
    //     await fetch("/update-logo", requestOptions)
    //         .then((res) => console.log(res)) 

    // }
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("submit clicked")
        console.log(selectedFile)
        const formData = new FormData();
        if(selectedFile){
            console.log('Selected file is ok')
            formData.append("selectedFile", selectedFile);
        }
    
        try {
            
          const response = await axios({
            method: "post",
            url: "http://localhost:3001/app/create-logo/Society of Women Engineers",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(response.data + 'this is data after api call');
        } catch(error) {
           
          console.log(error)
        }
        
          

      }
    
      const handleFileSelect = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log("handling file select")
        setSelectedFile(event.target.value)
      }


    return (
        <ThemeProvider theme={theme}>

            <MenuBar student_org_short_name='swe' />

            <Grid container sx={{ backgroundColor: "#f3f3f3" }}>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                        x
                    </Typography>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>





                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} Basic Information
                    </Typography>
                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>
                    <TextField sx={{ minWidth: theme.spacing(100), mb: theme.spacing(4) }} id="outlined-basic" label="Organization" variant="outlined" defaultValue={student_org_name} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2) }}>
                    <TextField sx={{ minWidth: theme.spacing(100) }} id="outlined-basic" label="Street Address" variant="outlined" defaultValue={street_address} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="Street Address 2" variant="outlined" defaultValue={street_address_2} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="City" variant="outlined" defaultValue={city} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2)}} id="outlined-basic" label="State" variant="outlined" defaultValue={state} />

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2), mb: theme.spacing(4) }} id="outlined-basic" label="Zipcode" variant="outlined" defaultValue={zipcode} />

                </Grid>

                <Grid item xs={12} > 
                    
                        <iframe name="dummyframe" id="dummyframe" height="0%" width="0%"></iframe>
                        <form  onSubmit={handleSubmit} method="POST" action="/create-logo"target = "dummyframe" encType="multipart/form-data">
                            <input type="hidden" name="organization" value={student_org_name} />
                            <Grid item xs = {12} sx ={{justifyContent: 'center',  display: 'flex',alignItems: 'center', margin:"auto", mt: theme.spacing(10)}}>
                            
                                <Button
                                variant="contained"
                                component="label"
                                size="large"
                                sx={{
                                    backgroundColor: '#434343', 
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(5),
                                    color:'white', 
                                }}
                            >
                                
                                Upload Logo
                                <input
                                    type="file"
                                    hidden
                                    name="image" 
                                    required
                                    onChange={handleFileSelect}
                                />
                                </Button> 
                                </Grid>
                            
                            
                                
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6), }}>
                                    <Button type="submit" value="Upload" variant="contained" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),
                                    }} 
                                
                                    >Save</Button>

                            </Grid>
                            
                       </form>
                    
                    
                    

                </Grid> 


                


            </Grid>


            

        </ThemeProvider>


    )
}

export default BasicInfo