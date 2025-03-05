"use server";
//import "server-only";

import { z } from "zod";
import { getSession } from "./auth";
import { apiCall } from "./utils";
import { revalidatePath } from "next/cache";

export type State = {
  errors?: {
    homeTeamScore?: string[];
    awayTeamScore?: string[];
  };
  message?: string | null;
};

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
  prevState: State,
  formData: FormData
) {
  const session = await getSession();

  const validatedFields = CreatePrediction.safeParse({
    homeTeamScore: formData.get("homeTeamScore"),
    awayTeamScore: formData.get("awayTeamScore"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Prediction.",
    };
  }

  const { data } = validatedFields;
  const payload = { matchId, ...data };

  try {
    await apiCall("POST", "/predictions", payload, session?.accessToken);
  } catch {
    return {
      message: "Api Error: Failed to Create Prediction.",
    };
  }

  revalidatePath("/prode/partidos");
  return {
    message: "Prediction created successfully.",
  };
}

export async function editPrediction(
  predictionId: string,
  prevState: State,
  formData: FormData
) {
  const session = await getSession();

  const validatedFields = CreatePrediction.safeParse({
    homeTeamScore: formData.get("homeTeamScore"),
    awayTeamScore: formData.get("awayTeamScore"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Prediction.",
    };
  }

  const { data } = validatedFields;
  const payload = { predictionId, ...data };

  try {
    await apiCall("PUT", "/predictions", payload, session?.accessToken);
  } catch {
    return {
      message: "Api Error: Failed to Create Prediction.",
    };
  }

  revalidatePath("/prode/partidos");
  return {
    message: "Prediction Edited successfully.",
  };
}
