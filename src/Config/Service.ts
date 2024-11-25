import https from "./Http";

export const GET_PROFILE = async (): Promise<any> => {
  try {
    const response = await https.get("/auth/me");
    return response.data;
  } catch (err: unknown) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};


export const SUBMIT_FORM = async (payload : FormData): Promise<any> => {
  try {

    const response = await https.post("/admin_dashbord_form",
       payload,
        {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

    return response.data;
  } catch (err: unknown) {
    console.error("Error on form submit:", err);

    if (err instanceof Error) {
      throw new Error(`Form submission failed: ${err.message}`);
    }
    throw new Error("An unknown error occurred during form submission.");
  }
};
