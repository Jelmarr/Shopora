import Card from "@/src/components/ui/Card";
import EmailLookup from "@/src/features/auth/components/EmailLookup";

export default function LookUpPage() {
  return (
    <main className="flex justify-center mx-auto my-0">
      <Card>
        <div className="flex flex-col gap-4">
          <EmailLookup />
        </div>
      </Card>
    </main>
  );
}
