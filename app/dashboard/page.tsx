export default async function dashboard() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <h1>Hey welcome to the admin dashboard page</h1>
    </div>
  );
}
