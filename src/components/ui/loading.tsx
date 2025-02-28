import Loader from "../icons/Loader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="w-16 h-16 text-custom-green-fluor animate-spin" />
      <p className="mt-4 text-xl font-medium text-custom-green-fluor">
        Cargando...
      </p>
    </div>
  );
}
