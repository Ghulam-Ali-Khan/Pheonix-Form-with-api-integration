import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import FormikField from "../../../components/common/formik/FormikField";
import FormikSelect from "../../../components/common/formik/FormikSelect";
import {
  loanAmountOptions,
  residentialStatusOptions,
  timeAtCurrentAddressOptions,
} from "../utilis/data";
import FormikDatePicker from "../../../components/common/formik/FormikDatePicker";

const Step1 = () => {
  return (
    <>
      <Paper sx={{ backgroundColor: "#003c60", width: "100%" }}>
        <Paper
          sx={{ backgroundColor: "#005385", padding: "15px", width: "250px" }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            Step 1
          </Typography>
        </Paper>
      </Paper>

      <Box sx={{ padding: "15px 50px", width:'100%' }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          <span style={{ color: "#ffeb25" }}>Apply for a loan today! </span> Our
          form is simple and straight forward. Get a decision in minutes.
        </Typography>

        <Grid2 container spacing={2} mt={3}>
          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikSelect
                name="loanAmount"
                label="Loan Amount"
                options={loanAmountOptions}
                placeholder="Select Loan Amount"
                isRequired
              />

              <FormikDatePicker name="dob" label="Date of birth" isRequired />

              <FormikField
                name="address"
                label="Address"
                placeholder="Address"
                isRequired
              />

              <FormikField
                name="state"
                label="State"
                placeholder="State"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="firstName"
                label="First Name"
                placeholder="Select Loan Amount"
                isRequired
              />

              <FormikField
                name="email"
                label="Email"
                placeholder="Email"
                isRequired
              />

              <FormikField
                name="zip"
                label="Zip"
                placeholder="Zip"
                isRequired
              />

              <FormikSelect
                name="ownHome"
                label="Residential Status"
                options={residentialStatusOptions}
                placeholder="Residential Status"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                isRequired
              />

              <FormikField
                name="homePhone"
                label="Home Phone Number"
                placeholder="Home Phone Number"
                isRequired
              />

              <FormikField
                name="city"
                label="City"
                placeholder="City"
                isRequired
              />

              <FormikSelect
                name="addressLengthMonths"
                label="Time at current address"
                options={timeAtCurrentAddressOptions}
                placeholder="Select"
                isRequired
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Step1;
