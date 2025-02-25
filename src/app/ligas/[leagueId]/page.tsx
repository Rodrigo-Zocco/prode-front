export default async function Liga({
  params,
}: {
  params: Promise<{ leagueId: string }>;
}) {
  const leagueId = (await params).leagueId;

  return (
    <div className="bg-black font-bold text-center text-yellow-500 text-3xl">
      <h1>Liga Id: {leagueId}</h1>
    </div>
  );
}
