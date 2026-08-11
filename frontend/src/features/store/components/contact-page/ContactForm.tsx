import FormInput from "@/src/components/FormInput";
import { FormSelect } from "@/src/components/FormSelect";
import { FormTextarea } from "@/src/components/FormTextArea";
import StorePrimaryButton from "../StorePrimaryButton";

const ContactForm = () => {
  return (
    <section className="w-full">
      <h1 className="font-bold text-[clamp(4rem,8vw,6rem)]">Contact Us</h1>
      <p className="text-md lg:text-xl">
        We&apos;d love to hear from you. Our team is here to help.
      </p>
      <p className="text-md lg:text-xl">
        Let your customers get in touch with you by filling out the email form
        below.
      </p>
      <form className="grid grid-cols-2 gap-6 mt-16">
        {/* Row 1 */}
        <FormInput label="Name" />
        <FormInput label="Email" />

        {/* Row 2 */}
        <FormInput label="Phone number" />
        <FormSelect
          label="Subject"
          name="subject"
          options={[
            { label: "General Inquiry", value: "general" },
            { label: "Order Support", value: "orders" },
            { label: "Product Feedback", value: "feedback" },
          ]}
        />

        {/* Row 3 - Spans full width */}
        <div className="col-span-2">
          <FormTextarea label="Message" name="message" rows={5} />
        </div>

        <StorePrimaryButton label="Send message" />
      </form>
    </section>
  );
};

export default ContactForm;
