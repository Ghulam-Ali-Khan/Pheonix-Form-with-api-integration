import * as Yup from "yup";

export const initialValues = {
  loanAmount: null,
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  homePhone: "",
  address: "",
  zip: "",
  city: "",
  state: "",
  ownHome: "",
  addressLengthMonths: "",
  incomeType: "",
  incomeNetMonthly: 0,
  workCompanyName: "",
  workTimeAtEmployer: "",
  workPhone: "",
  incomePaymentFrequency: "",
  incomeNextDate1: "",
  incomeNextDate2: "",
  activeMilitary: "",
  ssn: "",
  driversLicenseNumber: "",
  driversLicenseState: "",
  bankName: "",
  routingNumber: "", //
  bankAccountNumber: "",
  bankAccountType: "",
  bankDirectDeposit: "",
  bankAccountLengthMonths: "",
  termsAndConditions: false,
};

const step1Validation = Yup.object({
  loanAmount: Yup.string().required("Required"),
  firstName: Yup.string().required("Required").max(64, "exceeds max length 64"),
  lastName: Yup.string().required("Required").max(64, "exceeds max length 64"),
  dob: Yup.string().required("Required"),
  email: Yup.string()
    .required("Required")
    .min(5, "required at least 5 characters")
    .max(25, "exceeds max length 100"),
  homePhone: Yup.string().required("Required"),
  address: Yup.string().required("Required").max(256, "exceeds max length 256"),
  zip: Yup.string().required("Required").length(5, "required valid zip code"),
});

const step2Validation = Yup.object({
  incomeType: Yup.string().required("Required"),
  incomeNetMonthly: Yup.number().required("Required"),
  workCompanyName: Yup.string().required("Required"),
  workPhone: Yup.string().required("Required"),
  incomePaymentFrequency: Yup.string().required("Required"),
  incomeNextDate1: Yup.string().required("Required"),
  incomeNextDate2: Yup.string().required("Required"),
  activeMilitary: Yup.string().required("Required"),
  ssn: Yup.string().required("Required").max(9, "exceeds max length 9"),
  driversLicenseNumber: Yup.string()
    .required("Required")
    .min(2, "required at least 2 characters")
    .max(25, "exceeds max length 25"),
  driversLicenseState: Yup.string().max(2, "exceeds max length 2"),
});

const step3Validation = Yup.object({
  bankAccountNumber: Yup.string()
    .required("Required")
    .min(4, "required at least 4 characters")
    .max(25, "exceeds max length 25"),
  bankDirectDeposit: Yup.string().required("Required"),
  bankAccountType: Yup.string().required("Required"),
});

export const formSchema = [step1Validation, step2Validation, step3Validation];

export const formSteps = ["Step 1", "Step 2", "Step 3"];
