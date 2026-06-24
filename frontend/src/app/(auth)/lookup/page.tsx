import EmailLookup from "@/src/features/auth/components/EmailLookup";
import Card from "@/src/features/auth/components/ui/Card";

export default function LookUpPage() {
  return (
    <main className="flex justify-center mx-auto mt-20 mb-0">
      <Card>
        <div className="flex flex-col gap-4">
          <EmailLookup />
        </div>
      </Card>
    </main>
  );
}
