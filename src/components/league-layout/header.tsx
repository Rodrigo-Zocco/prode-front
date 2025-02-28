export default async function LeagueHeader({
  leagueName,
  logoUrl,
}: {
  leagueName: string;
  logoUrl: string;
}) {
  return (
    <div className="flex justify-center items-center mb-6">
      <img
        src={logoUrl}
        alt={`${leagueName} logo`}
        width={50}
        height={50}
        className="ml-2"
      />
      <h1 className="text-center text-custom-white font-bold text-3xl">
        {leagueName}
      </h1>
      <img
        src={logoUrl}
        alt={`${leagueName} logo`}
        width={50}
        height={50}
        className="ml-2"
      />
    </div>
  );
}
