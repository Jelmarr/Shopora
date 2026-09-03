import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import EmailLookup from "@/features/auth/components/EmailLookup";
import Card from "@/features/auth/components/ui/Card";

export default function LookUpPage() {
  return (
    <div className="bg-background relative flex h-80 w-full flex-col items-center justify-center rounded-lg ">
      <InteractiveGridPattern
        className={cn(
          "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-black"
      />
      <main className="flex absolute -bottom-30 justify-center mx-auto mt-20 mb-0">
        <Card>
          <div className="flex flex-col gap-4">
            <EmailLookup />
          </div>
        </Card>
      </main>
    </div>
  );
}
