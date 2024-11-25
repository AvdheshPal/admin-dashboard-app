import { createSlice } from "@reduxjs/toolkit";

interface Step {
  title: string;
  isVisited: boolean;
  isCompleted: boolean;
}

interface StepperState {
  activeStep: number;
  steps: Step[];
}

const initialState: StepperState = {
  activeStep: 0,
  steps: [
    { title: "Basic Details", isVisited: false, isCompleted: false },
    { title: "Address", isVisited: false, isCompleted: false },
    { title: "File Upload", isVisited: false, isCompleted: false },
  ],
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.activeStep < state.steps.length - 1) {
        state.activeStep += 1;
        state.steps.forEach((step, index) => {
          if (index <= state.activeStep) {
            step.isVisited = true;
          }
        });
      }
    },
    prevStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    completeStep: (state) => {
      const activeStepIndex = state.activeStep;
      state.steps[activeStepIndex] = {
        ...state.steps[activeStepIndex],
        isCompleted: true,
      };
    },
    resetStepper: (state) => {
      state.activeStep = 0;
      state.steps = initialState.steps;
    },
  },
});

export const { nextStep, prevStep, completeStep, resetStepper } = stepperSlice.actions;

export default stepperSlice.reducer;
