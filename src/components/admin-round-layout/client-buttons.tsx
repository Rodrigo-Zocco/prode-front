"use client";

import { useRouter } from "next/navigation";
import ArrowLeft from "../icons/ArrowLeft";
import Ball from "../icons/Ball";
import { useState } from "react";
import AddMatchForm from "../add-match-form";
import { Team } from "@/lib/definitions";

export default function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      className="flex items-center mt-4 ml-2 text-custom-white border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2 bg-custom-green-alive"
      onClick={handleBackClick}
      type="button"
    >
      <span>
        <ArrowLeft className={""} />
      </span>
      Volver
    </button>
  );
}

export function AddMatchModal({
  roundId,
  teams,
}: {
  roundId: string;
  teams: Team[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex rounded-md border font-semibold p-2 bg-custom-green-light hover:bg-custom-green-fluor"
      >
        <p>Agregar Partido</p>
        <Ball className="ml-2" />
      </button>

      {isModalOpen && (
        <AddMatchForm
          onClose={() => setIsModalOpen(false)}
          roundId={roundId}
          teams={teams}
        />
      )}
    </>
  );
}
