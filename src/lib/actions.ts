"use server";
//import "server-only";

import { z } from "zod";
import { getSession } from "./auth";
import { apiCall } from "./utils";
import { revalidatePath } from "next/cache";
import {
  CreatePredictionActionResponse,
  CreatePredictionFormData,
} from "./types";

const createPredicctionError = "Mínimo 0 y Máximo 20 goles.";

const CreatePrediction = z.object({
  homeTeamScore: z.coerce
    .number({
      required_error: createPredicctionError,
      invalid_type_error: createPredicctionError,
    })
    .int({ message: createPredicctionError })
    .nonnegative({ message: createPredicctionError })
    .lte(20, createPredicctionError),
  awayTeamScore: z.coerce
    .number({
      required_error: createPredicctionError,
      invalid_type_error: createPredicctionError,
    })
    .int({ message: createPredicctionError })
    .nonnegative({ message: createPredicctionError })
    .lte(20, createPredicctionError),
});

export async function createPrediction(
  matchId: string,
  prevState: CreatePredictionActionResponse | null,
  formData: FormData
): Promise<CreatePredictionActionResponse> {
  try {
    const rawData: CreatePredictionFormData = {
      homeTeamScore: formData.get("homeTeamScore") as unknown as number,
      awayTeamScore: formData.get("awayTeamScore") as unknown as number,
    };

    const validatedData = CreatePrediction.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    const { data } = validatedData;
    const payload = { matchId, ...data };

    const session = await getSession();
    await apiCall("POST", "/predictions", payload, session?.accessToken);
    revalidatePath("/prode/partidos");

    return {
      success: true,
      message: "Prediction saved successfully!",
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function editPrediction(
  predictionId: string,
  prevState: CreatePredictionActionResponse | null,
  formData: FormData
): Promise<CreatePredictionActionResponse> {
  try {
    const rawData: CreatePredictionFormData = {
      homeTeamScore: formData.get("homeTeamScore") as unknown as number,
      awayTeamScore: formData.get("awayTeamScore") as unknown as number,
    };

    const validatedData = CreatePrediction.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Edit Prediction.",
      };
    }

    const { data } = validatedData;
    const payload = { predictionId, ...data };

    const session = await getSession();
    await apiCall("PUT", "/predictions", payload, session?.accessToken);
    revalidatePath("/prode/partidos");
    return {
      success: true,
      message: "Prediction Edited successfully.",
    };
  } catch {
    return {
      success: true,
      message: "Api Error: Failed to Create Prediction.",
    };
  }
}
