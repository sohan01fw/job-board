export default async function Jobs() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <h1>Hey welcome to the jobs page</h1>
    </div>
  );
}
