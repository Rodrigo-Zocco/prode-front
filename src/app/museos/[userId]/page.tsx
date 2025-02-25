export default async function Museo({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;

  return (
    <div className="bg-black font-bold text-center text-yellow-500 text-3xl">
      <h1>Museo user Id: {userId}</h1>
    </div>
  );
}
