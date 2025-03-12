"use client";

import { useRouter } from "next/navigation";
import ArrowLeft from "../icons/ArrowLeft";

export default function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      className="flex items-center mt-4 ml-2 text-custom-white border-custom-green-fluor text-lg font-semibold border-2 rounded-lg px-2 bg-custom-green-alive"
      onClick={handleBackClick}
    >
      <span>
        <ArrowLeft className={""} />
      </span>
      Volver
    </button>
  );
}
