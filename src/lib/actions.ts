"use server";
//import "server-only";

import { z } from "zod";
import { getSession } from "./auth";
import { apiCall } from "./utils";
import { revalidatePath } from "next/cache";
import {
  AddLeagueActionResponse,
  AddLeagueFormData,
  AddRoundActionResponse,
  AddRoundFormData,
  AddTeamActionResponse,
  AddTeamFormData,
  CreatePredictionActionResponse,
  CreatePredictionFormData,
  EditMatchActionResponse,
  EditMatchFormData,
  UpdateUserActionResponse,
  UpdateUserFormData,
} from "./types";
import { MatchStatus } from "./definitions";

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

export async function deleteLeague(leagueId: string) {
  try {
    const session = await getSession();
    await apiCall(
      "DELETE",
      `/leagues/${leagueId}`,
      undefined,
      session?.accessToken
    );
    revalidatePath("/administracion/ligas");
  } catch {
    console.error("Fallo al eliminar una liga");
  }
}

export async function createRound(
  leagueId: string,
  prevState: AddRoundActionResponse | null,
  formData: FormData
): Promise<AddRoundActionResponse> {
  try {
    const rawData: AddRoundFormData = {
      description: formData.get("description") as unknown as string,
    };

    const isValid = rawData.description.length >= 4;

    if (!isValid) {
      return {
        success: false,
        message: "Corregi los errores",
        errors: {
          description: ["La descripción debe tener al menos 4 caracteres."],
        },
        inputs: rawData,
      };
    }

    const payload = { leagueId, description: rawData.description };

    const session = await getSession();
    await apiCall("POST", "/rounds", payload, session?.accessToken);
    revalidatePath("/administracion/ligas");

    return {
      success: true,
      message: "Ronda Creada correctamente!",
    };
  } catch {
    return {
      success: false,
      message: "Algo ha salido mal.",
    };
  }
}

export async function deleteRound(roundId: string) {
  try {
    const session = await getSession();
    await apiCall(
      "DELETE",
      `/rounds/${roundId}`,
      undefined,
      session?.accessToken
    );
    revalidatePath("/administracion/ligas");
  } catch {
    console.error("Fallo al eliminar una ronda.");
  }
}

const AddTeamSchema = z
  .object({
    name: z.string(),
    logoUrl: z.string(),
  })
  .strict();

export async function addTeam(
  prevState: AddTeamActionResponse | null,
  formData: FormData
): Promise<AddTeamActionResponse> {
  try {
    const rawData: AddTeamFormData = {
      name: formData.get("name") as string,
      logoUrl: formData.get("logoUrl") as string,
    };

    const validatedData = AddTeamSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Corrige los errores.",
      };
    }

    const { data: payload } = validatedData;

    const session = await getSession();
    await apiCall("POST", "/teams", payload, session?.accessToken);
    revalidatePath("/administracion/equipos");
    return {
      success: true,
      message: "Equipo agregado con exito.",
    };
  } catch {
    return {
      success: false,
      message: "Ocurrió un error al agregar el equipo.",
    };
  }
}

export async function deleteTeam(teamId: number) {
  try {
    const session = await getSession();
    await apiCall(
      "DELETE",
      `/teams/${teamId}`,
      undefined,
      session?.accessToken
    );
    revalidatePath("/administracion/equipos");
  } catch {
    console.error("Fallo al eliminar un equipo.");
  }
}

export async function deleteMatch(matchId: string) {
  try {
    const session = await getSession();
    await apiCall(
      "DELETE",
      `/matches/${matchId}`,
      undefined,
      session?.accessToken
    );
    revalidatePath("/administracion/rondas");
  } catch {
    console.error("Fallo al eliminar un partido");
  }
}

const EditMatchSchema = z
  .object({
    highlighted: z.coerce.boolean().optional(),
    homeTeamScore: z.coerce
      .number({
        required_error: "Faltan los goles del local.",
        invalid_type_error:
          "Los goles del local debe ser un numero entre 0 y 20.",
      })
      .int()
      .nonnegative()
      .lte(20)
      .optional(),
    awayTeamScore: z.coerce
      .number({
        required_error: "Faltan los goles del visitante.",
        invalid_type_error:
          "Los goles del visitante debe ser un numero entre 0 y 20.",
      })
      .int()
      .nonnegative()
      .lte(20)
      .optional(),
    status: z
      .enum([
        MatchStatus.Finished,
        MatchStatus.Ongoing,
        MatchStatus.Predictable,
        MatchStatus.Suspended,
        MatchStatus.Waiting,
      ])
      .optional(),
  })
  .strict();

export async function editMatch(
  matchId: string,
  prevState: EditMatchActionResponse | null,
  formData: FormData
): Promise<EditMatchActionResponse> {
  try {

    const rawData: EditMatchFormData = {
      status: formData.get("status") as unknown as string,
      highlighted:
        (formData.get("highlighted") as unknown as string) === "true",
      homeTeamScore: formData.get("homeTeamScore") as unknown as number,
      awayTeamScore: formData.get("awayTeamScore") as unknown as number,
    };

    const validatedData = EditMatchSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Corrige los errores.",
      };
    }

    const { data } = validatedData;
    const payload = { ...data, matchId };

    const session = await getSession();
    await apiCall("PUT", "/matches", payload, session?.accessToken);
    revalidatePath("/administracion/partidos");
    return {
      success: true,
      message: "Partido editado con exito.",
    };
  } catch {
    return {
      success: false,
      message: "Ocurrió un error al editar el partido.",
    };
  }
}
