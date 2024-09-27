import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import FormikField from "../../../components/common/formik/FormikField";
import FormikSelect from "../../../components/common/formik/FormikSelect";
import {
  accountTypeOptions,
  directDepositOptions,
  timeAtBankOptions,
} from "../utilis/data";
import FormikCheckbox from "../../../components/common/formik/FormikCheckbox";

const Step3 = () => {
  return (
    <>
      <Paper sx={{ backgroundColor: "#003c60", width: "100%" }}>
        <Paper
          sx={{ backgroundColor: "#005385", padding: "15px", width: "250px" }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            Step 3
          </Typography>
        </Paper>
      </Paper>

      <Box sx={{ padding: "15px 50px", width: "100%" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Final step <span style={{ color: "#ffeb25" }}>adada!</span> Please
          confirm where you want your loan deposited.
        </Typography>

        <Grid2 container spacing={2} mt={3}>
          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="bankName"
                label="Bank Name"
                placeholder="Work Phone Number"
              />

              <FormikSelect
                name="bankAccountType"
                label="Account Type"
                options={accountTypeOptions}
                placeholder="Please Select"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="routingNumber"
                label="Routing Number"
                placeholder="Routing Number"
              />

              <FormikSelect
                name="bankDirectDeposit"
                label="Direct Deposit"
                options={directDepositOptions}
                placeholder="Please Select"
                isRequired
              />
            </Stack>
          </Grid2>

          <Grid2 size={4}>
            <Stack spacing={2}>
              <FormikField
                name="bankAccountNumber"
                label="Account Number"
                placeholder="Account Number"
                isRequired
              />

              <FormikSelect
                name="bankAccountLengthMonths"
                label="Time at Bank"
                options={timeAtBankOptions}
                placeholder="Select Please"
                isRequired
              />
            </Stack>
          </Grid2>
        </Grid2>
        <br />
        <FormikCheckbox
          label="Terms and Conditions"
          name="termsAndConditions"
        />
      </Box>
    </>
  );
};

export default Step3;
