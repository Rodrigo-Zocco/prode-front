"use client";

import { useState } from "react";
import EditUsernameModal from "./edit-username-modal";

export default function EditUsernameButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 ml-2 text-custom-white bg-custom-green-alive border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2"
      >
        Cambiar
      </button>

      {isModalOpen && (
        <EditUsernameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
