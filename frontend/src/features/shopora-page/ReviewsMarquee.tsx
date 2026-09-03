import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Amara Chen",
    username: "@amarabuilds",
    body: "Launched three storefronts from one dashboard in an afternoon.",
    img: "https://avatar.vercel.sh/amara",
  },
  {
    name: "Devon Marsh",
    username: "@devonsells",
    body: "The variant system just works. Stock and pricing always correct.",
    img: "https://avatar.vercel.sh/devon",
  },
  {
    name: "Priya Nair",
    username: "@priyaretail",
    body: "Checkout has been rock solid. Never had a payment slip through.",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Marcus Webb",
    username: "@marcusops",
    body: "Low-stock alerts saved us from three sellouts last quarter.",
    img: "https://avatar.vercel.sh/marcus",
  },
  {
    name: "Lena Ortiz",
    username: "@lenagoods",
    body: "Nested categories made browsing so much easier for everyone.",
    img: "https://avatar.vercel.sh/lena",
  },
  {
    name: "Jordan Kim",
    username: "@jordanshop",
    body: "Google sign-in took two minutes. Zero login issues since.",
    img: "https://avatar.vercel.sh/jordan",
  },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm ">{body}</blockquote>
    </figure>
  );
};

export function ReviewsMarquee() {
  return (
    <div className="my-40">
      <p className="text-center font-medium mb-2">
        Loved by people all over the universe
      </p>
      <p className="text-center text-sm font-medium text-muted-foreground/70 mb-12 max-w-xl mx-auto">
        See what founders are saying about running their store on Shopora.
      </p>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
      </div>
    </div>
  );
}
