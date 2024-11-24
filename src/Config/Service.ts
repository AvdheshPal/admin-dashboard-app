import https from "./Http";

export const GET_PROFILE = async (): Promise<any> => {
  try {
    const response = await https.get('/auth/me');
    return response.data;
  } catch (err: unknown) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};
