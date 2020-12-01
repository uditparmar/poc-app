export default async function filterData(req, res) {
  const [filters, jobs] = await Promise.all([
    import("../../data/filters.json"),
  ]);

  res.statusCode = 200;
  res.end(JSON.stringify({ filters: filters }));
}
