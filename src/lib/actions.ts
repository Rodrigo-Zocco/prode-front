"use server";
//import "server-only";

import { z } from "zod";
import { getSession } from "./auth";
import { apiCall } from "./utils";
import { revalidatePath } from "next/cache";
import {
  AddLeagueActionResponse,
  AddLeagueFormData,
  CreatePredictionActionResponse,
  CreatePredictionFormData,
  UpdateUserActionResponse,
  UpdateUserFormData,
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

const UpdateUserSchema = z
  .object({
    username: z
      .string()
      .min(8, "Nombre de usuario debe tener 8 caracteres como minimo.")
      .max(50, "Nombre de usuario debe tener 50 caracteres como maximo.")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Nombre de usuario debe contener letras, numeros, puntos y guiones"
      ),
  })
  .strict();

export async function updateUser(
  prevState: UpdateUserActionResponse | null,
  formData: FormData
): Promise<UpdateUserActionResponse> {
  try {
    const rawData: UpdateUserFormData = {
      username: formData.get("username") as string,
    };

    const validatedData = UpdateUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Corrige los errores.",
      };
    }

    const { data: payload } = validatedData;

    const session = await getSession();
    await apiCall("PUT", "/users", payload, session?.accessToken);
    //revalidatePath("/configuracion");
    return {
      success: true,
      message: "Usuario actualizado con exito.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update user.",
    };
  }
}

const AddLeagueSchema = z
  .object({
    name: z.string(),
    country: z.string(),
    logoUrl: z.string(),
  })
  .strict();

export async function addLeague(
  prevState: AddLeagueActionResponse | null,
  formData: FormData
): Promise<AddLeagueActionResponse> {
  try {
    const rawData: AddLeagueFormData = {
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      logoUrl: formData.get("logoUrl") as string,
    };

    const validatedData = AddLeagueSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Corrige los errores.",
      };
    }

    const { data: payload } = validatedData;

    const session = await getSession();
    await apiCall("POST", "/leagues", payload, session?.accessToken);
    revalidatePath("/administracion/ligas");
    return {
      success: true,
      message: "Liga agregada con exito.",
    };
  } catch {
    return {
      success: false,
      message: "Ocurrió un error al agregar una liga.",
    };
  }
}
