import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We'll arrange a replacement or refund.",
  },
  {
    question: "Do I need to create an account to check out?",
    answer:
      "No, you can check out as a guest with just your email and shipping address. Creating an account is optional and lets you save your details and view order history for next time.",
  },
  {
    question: "Can I cancel or change my order after placing it?",
    answer:
      "You can cancel or edit your order within 1 hour of placing it by contacting support. After that, your order enters fulfillment and can no longer be changed.",
  },
  {
    question: "How do I use a discount code?",
    answer:
      "Enter your discount code in the promo code field at checkout before completing payment. The discount will be applied to your order total automatically.",
  },
];
const FAQ = () => {
  return (
    <div className="px-6 mb-40">
      <div className="mx-auto w-full max-w-2xl">
        <div className="px-8">
          <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
            Frequently Asked Questions
          </h4>

          <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base dark:text-neutral-300">
            Quick answers to common questions about our products and services.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border/65 bg-muted p-1 sm:mt-10">
          <Accordion
            className="space-y-px rounded-lg border border-border/65 bg-border/20"
            collapsible
            defaultValue="question-0"
            type="single"
          >
            {faq.map(({ question, answer }, index) => (
              <AccordionItem
                className="border-none bg-background px-4 first:rounded-t-lg last:rounded-b-lg"
                key={question}
                value={`question-${index}`}
              >
                <AccordionPrimitive.Header className="flex items-center">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between pt-4 pb-3 font-medium tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg",
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
