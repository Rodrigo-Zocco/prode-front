export default async function Museo({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;

  return (
    <h1 className="text-center text-3xl text-custom-white font-bold mt-4">
      Podrás ver tu museo proximamente
    </h1>
  );
}
