import ShopBanner from "@/src/features/store/components/shop-page/ShopBanner";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <main>
      <ShopBanner slug={slug} />
    </main>
  );
};

export default page;
