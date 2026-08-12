const ContactMap = () => {
  const mapSrc =
    "https://maps.google.com/maps?q=Manila,Philippines&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="relative w-full h-140 lg:h-auto lg:flex-1 shrink-0 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
      <iframe
        title="Location Map"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full filter invert-90 hue-rotate-180 contrast-[1.2] brightness-[0.85] grayscale-20"
      />
    </div>
  );
};

export default ContactMap;
