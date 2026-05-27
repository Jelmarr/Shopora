interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

async function getUserData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/users`, { cache: "no-store" });

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data from .NET Backend");
  }
  return res.json();
}

export default async function Home() {
  const data: User[] = await getUserData();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        .NET 10 API + Next.js Integration
      </h1>
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="p-4 border rounded bg-slate-800 text-white">
            <p>
              <strong>First Name:</strong> {item.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {item.lastName}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Created At:</strong> {item.createdAt}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
