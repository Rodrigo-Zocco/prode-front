"use client";

import { UpdateUserActionResponse } from "@/lib/types";
import CrossOff from "../icons/CrossOff";
import { useActionState } from "react";
import { updateUser } from "@/lib/actions";

export default function EditUsernameModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialState: UpdateUserActionResponse = {
    success: false,
    message: "",
  };
  const [state, action, isPending] = useActionState(updateUser, initialState);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto"
          id="background-prode"
        >
          <div className="flex items-center justify-between py-2 px-4 text-custom-white">
            <h2 className="text-lg font-medium">Cambiar nombre de usuario</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <CrossOff className="h-5 w-5 text-red-500" />
            </button>
          </div>

          <div className="p-4">
            <form action={action}>
              <p className="text-sm text-custom-white font-semibold">
                Los cambios se verán reflejados en el próximo inicio de sesión
              </p>
              <div className="flex flex-col my-2">
                <label htmlFor="username" className="text-custom-white text-sm font-semibold">
                  Nuevo nombre de usuario
                </label>
                <input
                  className="w-full  border-gray-300 font-bold text-custom-green-alive text-lg rounded-lg block p-2.5"
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={state?.inputs?.username || ""}
                  required
                  minLength={8}
                />
                {state.errors?.username && (
                  <p className="text-red-500 text-xs mt-1 font-bold">
                    {state.errors.username[0]}
                  </p>
                )}
              </div>
              {state?.message && !isPending && (
                <p
                  className={`text-xl font-bold text-center ${
                    state.success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {state.message}
                </p>
              )}
              <button
                className={`mt-4 ml-2 text-custom-white border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2 ${
                  isPending ? "bg-gray-600" : "bg-custom-green-alive"
                }`}
                type="submit"
                aria-disabled={isPending}
                disabled={isPending}
              >
                {isPending ? "Cargando..." : "Confirmar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
