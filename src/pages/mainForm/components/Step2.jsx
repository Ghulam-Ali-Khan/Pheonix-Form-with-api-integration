import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import FormikField from "../../../components/common/formik/FormikField";
import FormikSelect from "../../../components/common/formik/FormikSelect";
import {
  activeMilitaryOptions,
  employeementStatusOptions,
  payFrequencyOptions,
  timeAtCurrentEmployerOptions,
} from "../utilis/data";
import FormikDatePicker from "../../../components/common/formik/FormikDatePicker";

const Step2 = () => {
  return (
    <>
      <Paper sx={{ backgroundColor: "#003c60", width: "100%" }}>
        <Paper
          sx={{ backgroundColor: "#005385", padding: "15px", width: "250px" }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            Step 2
          </Typography>
        </Paper>
      </Paper>

      <Box sx={{ padding: "15px 50px", width: "100%" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Great <span style={{ color: "#ffeb25" }}>ww! </span> your quote for
          loan is just 2 steps away.
        </Typography>

        <Grid2 container spacing={2} mt={3}>
          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikSelect
                name="incomeType"
                label="Employement Status"
                options={employeementStatusOptions}
                placeholder="Employement Status"
                isRequired
              />

              <FormikField
                name="workPhone"
                label="Work Phone Number"
                placeholder="Work Phone Number"
                isRequired
              />

              <FormikDatePicker
                name="incomeNextDate1"
                label="Next Paydate"
                isRequired
              />

              <FormikField
                name="ssn"
                label="SSN"
                placeholder="SSN"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="incomeNetMonthly"
                label="Monthly Income"
                placeholder="Monthly Income"
                type="number"
                isRequired
              />

              <FormikSelect
                name="workTimeAtEmployer"
                label="Time at current employer"
                options={timeAtCurrentEmployerOptions}
                placeholder="Select"
              />

              <FormikDatePicker
                name="incomeNextDate2"
                label="Paydate after next"
                isRequired
              />

              <FormikField
                name="driversLicenseNumber"
                label="Driving License"
                placeholder="Driving License"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="workCompanyName"
                label="Name of employer"
                placeholder="Employer"
                isRequired
              />

              <FormikSelect
                name="incomePaymentFrequency"
                label="PayFrequency"
                options={payFrequencyOptions}
                placeholder="Please Select"
                isRequired
              />

              <FormikSelect
                name="activeMilitary"
                label="Active Military"
                options={activeMilitaryOptions}
                placeholder="Please Select"
                isRequired
              />

              <FormikField
                name="driversLicenseState"
                label="Driving License State"
                placeholder="Driving License State"
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Step2;
