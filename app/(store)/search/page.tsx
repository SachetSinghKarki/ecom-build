async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
    const {query} = await searchParams;
  return <div>
    <h1 className="text-4xl text-blue-600">Searching for {query}</h1>
  </div>;
}

export default SearchPage;
