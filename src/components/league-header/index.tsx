export default function LeagueHeader({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <div className="flex flex-row w-full justify-center items-center">
      <img
        src={logo}
        alt={`${name} logo`}
        width={60}
        height={60}
        className="mr-2"
      />
      <h1 className="text-custom-white text-center text-3xl font-bold p-4">
        {name.toUpperCase()}
      </h1>
      <img
        src={logo}
        alt={`${name} logo`}
        width={60}
        height={60}
        className="mr-2"
      />
    </div>
  );
}
