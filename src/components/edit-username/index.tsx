import EditUsernameButton from "./edit-username-button";

export default function EditUsername() {
  return (
    <div className="p-6 border rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Nombre de usuario</h3>
          <p className="text-sm text-gray-500">
            Tu nombre de usuario se muestra en las tablas de resultados y copas.
          </p>
        </div>
        <EditUsernameButton />
      </div>
    </div>
  );
}
