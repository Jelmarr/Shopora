import ContactCard from "@/features/store/components/contact-page/ContactCard";
import ContactForm from "@/features/store/components/contact-page/ContactForm";
import ContactMap from "@/features/store/components/contact-page/ContactMap";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Page = () => {
  return (
    <main className="mx-auto my-0 max-w-360 py-12 px-8">
      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        <div className="w-full lg:flex-1">
          <ContactForm />
        </div>
        <ContactMap />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
        <ContactCard title="Address">
          <p className="text-lg">Barangay 521, Zone 52, Sampaloc</p>
        </ContactCard>
        <ContactCard title="email">
          <p className="text-lg hover:underline">contact@yourstore.com</p>
          <p className="text-lg hover:underline">sales@yourstore.com</p>
        </ContactCard>
        <ContactCard title="phone">
          <p className="text-lg ">+33 (0) 31-305-210</p>
          <p className="text-lg ">mo – fri: 09:00 – 17:00</p>
        </ContactCard>
        <ContactCard title="follow us">
          <div className="flex gap-4">
            <FaFacebookF size={24} />
            <FaXTwitter size={24} />
            <FaInstagram size={24} />
            <FaYoutube size={24} />
          </div>
        </ContactCard>
      </section>
    </main>
  );
};

export default Page;
