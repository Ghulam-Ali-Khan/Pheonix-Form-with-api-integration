import React, { useState } from "react";
import { formSchema, formSteps, initialValues } from "./utilis/formUtilis";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import Step1 from "./components/Step1";
import Step3 from "./components/Step3";
import Step2 from "./components/Step2";
import axios from "axios";
import { useSnackbar } from "notistack";

const MainFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {enqueueSnackbar} = useSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container  sx={{marginTop:'7rem', paddingBottom:'2rem'}}>

<Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={formSchema[activeStep]}
        onSubmit={async (values, { setErrors }) => {
          try {

            const response = await axios.post('https://server.maniloans.online/phonex/phonex/', values);

            if(response?.data?.errors?.length > 0){
              enqueueSnackbar(response?.data?.errors?.[0]  || 'Something went wrong',{variant:"error"});
            }else if(response?.data?.response?.errors?.[0]){
              const errors = response?.data?.response?.errors?.[0];
              const errorMessages = Object.values(errors);
              const errorKeys = Object.keys(errors);
              enqueueSnackbar(`${errorMessages?.[0]} (${errorKeys?.[0]})`  || 'Something went wrong',{variant:"error"});
            }else if(response?.data?.status_text){
              enqueueSnackbar(`Form successfully submitted (${response?.data?.status_text})`,{variant:"success"});
            }else if(response?.data?.status === 200){
              enqueueSnackbar(`Form successfully submitted`,{variant:"success"});
              if(response?.data?.response?.redirect_url){
                window.location.href = response?.data?.response?.redirect_url;
              }else if(response?.data?.response?.rejectUrl){
                window.location.href = response?.data?.response?.rejectUrl;
              }
           
            }
          } catch (error) {
            console.error('Error:', error);
          }

        }}
      >
        {({ setTouched, values, validateForm, isSubmitting, errors }) => (
          <Form sx={{width:'100%'}}>
            {console.log('errors ==> ', errors)}
            <Grid2 spacing={2} container width="100%">

                {activeStep === 0 && <Step1 />}
                {activeStep === 1 && <Step2 />}
                {activeStep === 2 && <Step3 />}
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="start"
                  spacing={1}
                  className="mt-2"
                >
                  <Toolbar className="px-0 align-items-center">
                    <Button
                      variant="mutedColor"
                      size="small"
                      type="button"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    {activeStep < formSteps.length - 1 ? (
                      <Button
                        onClick={async () => {
                          const response = await validateForm(values);

                          console.log('response ==> ', response, values)
                          if (Object?.keys(response)?.length > 0) {
                            setTouched(response);
                            return;
                          }

                          handleNext();
                        }}
                        variant="contained"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && <CircularProgress size={20} />}
                        Submit
                      </Button>
                    )}
                  </Toolbar>
                </Stack>
 
            </Grid2>
          </Form>
        )}
      </Formik>
      </Paper>
    </Container>
  );
};

export default MainFormPage;
