using backend.Features.Admin.Products.Enums;
using backend.Features.Admin.Products.Models;

namespace backend.Features.Dev.SeedProducts;

public static class ShoeProductSeeder
{
    // Swap this for your real cloud name (appsettings: Cloudinary:CloudName)
    private const string CloudinaryCloudName = "dikouau6f";

    private static readonly string[] AllSizes = { "38", "39", "40", "41", "42", "43", "44" };
    private static readonly string[] AllColors = { "Black", "White", "Red", "Blue", "Grey", "Green" };

    private static readonly (string Name, string Description, decimal Price, decimal? CompareAt)[] ShoeData =
    {
        ("Air Runner Pro", "Lightweight everyday running shoe with responsive foam cushioning.", 89.99m, 109.99m),
        ("Trail Blazer X", "Rugged trail shoe with aggressive grip for off-road terrain.", 104.99m, null),
        ("Court Classic", "Retro-inspired low-top sneaker with a clean leather upper.", 74.99m, 94.99m),
        ("Cloud Walker", "Ultra-soft slip-on with memory foam insole for all-day comfort.", 64.99m, null),
        ("Urban Street", "Chunky-sole streetwear sneaker built for city commuting.", 94.99m, 119.99m),
        ("Marathon Elite", "Carbon-plated racing shoe for competitive road running.", 179.99m, 199.99m),
        ("Canvas Low", "Classic canvas sneaker with a durable rubber outsole.", 49.99m, null),
        ("Hiker Peak", "Waterproof hiking boot with ankle support and deep lugs.", 129.99m, 149.99m),
        ("Basketball Pro Hi", "High-top basketball shoe with reinforced lateral support.", 134.99m, 159.99m),
        ("Studio Flex", "Minimalist training shoe designed for gym and studio workouts.", 79.99m, null),
        ("Chelsea Boot", "Sleek pull-on boot with elastic side panels.", 119.99m, 139.99m),
        ("Slide Comfort", "Cushioned slide sandal for post-workout recovery.", 34.99m, null),
        ("Runner Knit", "Breathable knit upper running shoe with a sock-like fit.", 84.99m, 99.99m),
        ("Desert Trek", "Suede desert boot with crepe rubber sole.", 109.99m, null),
        ("Skate Deck", "Reinforced toe-cap skate shoe built for durability.", 69.99m, 84.99m),
        ("Golf Precision", "Spikeless golf shoe with waterproof leather upper.", 149.99m, null),
        ("Retro Jogger 88", "Vintage jogger silhouette with wave-pattern midsole.", 99.99m, 119.99m),
        ("Formal Oxford", "Polished leather oxford for business and formal wear.", 139.99m, 169.99m),
        ("Kids Sprint", "Durable everyday sneaker sized for growing feet.", 44.99m, null),
        ("Winter Trekker", "Insulated cold-weather boot rated for snow and ice.", 154.99m, 174.99m),
    };

    public static List<Product> Seed(Guid storeId, Guid categoryId)
    {
        var products = new List<Product>();

        for (int i = 0; i < ShoeData.Length; i++)
        {
            var (name, description, price, compareAt) = ShoeData[i];
            var productId = Guid.NewGuid();
            var slug = name.ToLower().Replace(" ", "-");

            // Deterministic per-product subset: 3 sizes, 2 colors → 6 variants
            var sizes = AllSizes.Skip(i % 3).Take(3).ToArray();
            var colors = AllColors.Skip(i % 4).Take(2).ToArray();

            var product = new Product
            {
                Id = productId,
                StoreId = storeId,
                CategoryId = categoryId,
                Name = name,
                SKU = $"SHOE-{i + 1:D3}",
                Description = description,
                Price = price,
                CompareAtPrice = compareAt,
                CostPrice = Math.Round(price * 0.55m, 2),
                Stock = sizes.Length * colors.Length * 15,
                LowStockThreshold = 5,
                IsFeatured = i % 5 == 0,
                IsTrackInventory = true,
                Status = ProductStatus.Active,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            product.Images = BuildImages(productId, slug, colors.Length);
            var (options, sizeValues, colorValues) = BuildOptions(productId, sizes, colors);
            product.Options = options;
            product.Variants = BuildVariants(productId, storeId, i, sizeValues, colorValues);

            products.Add(product);
        }

        return products;
    }

    private static List<ProductImage> BuildImages(Guid productId, string slug, int colorCount)
    {
        var images = new List<ProductImage>();
        for (int c = 0; c < colorCount; c++)
        {
            // Placeholder text derived from the product slug — swap for a real
            // photo URL (or a real Cloudinary public_id) once you have assets.
            var remoteUrl = $"https://placehold.co/800x800/EEEEEE/31343C/png?text={Uri.EscapeDataString(slug)}-{c + 1}";
            var cloudinaryUrl =
                $"https://res.cloudinary.com/{CloudinaryCloudName}/image/fetch/f_auto,q_auto,w_800,h_800,c_fill/{Uri.EscapeDataString(remoteUrl)}";

            images.Add(new ProductImage
            {
                Id = Guid.NewGuid(),
                ProductId = productId,
                ImageUrl = cloudinaryUrl,
                PublicId = $"shoes/{slug}-{c + 1}", // placeholder — not a real Cloudinary public_id until uploaded
                IsPrimary = c == 0,
            });
        }
        return images;
    }

    private static (List<ProductOption> Options, List<ProductOptionValue> SizeValues, List<ProductOptionValue> ColorValues)
        BuildOptions(Guid productId, string[] sizes, string[] colors)
    {
        var sizeOption = new ProductOption { Id = Guid.NewGuid(), ProductId = productId, Name = "Size" };
        var colorOption = new ProductOption { Id = Guid.NewGuid(), ProductId = productId, Name = "Color" };

        var sizeValues = sizes.Select(s => new ProductOptionValue
        {
            Id = Guid.NewGuid(),
            ProductOptionId = sizeOption.Id,
            Value = s,
        }).ToList();

        var colorValues = colors.Select(c => new ProductOptionValue
        {
            Id = Guid.NewGuid(),
            ProductOptionId = colorOption.Id,
            Value = c,
        }).ToList();

        sizeOption.Values = sizeValues;
        colorOption.Values = colorValues;

        return (new List<ProductOption> { sizeOption, colorOption }, sizeValues, colorValues);
    }

    private static List<ProductVariant> BuildVariants(
        Guid productId,
        Guid storeId,
        int productIndex,
        List<ProductOptionValue> sizeValues,
        List<ProductOptionValue> colorValues)
    {
        var variants = new List<ProductVariant>();
        int n = 1;

        foreach (var color in colorValues)
        {
            foreach (var size in sizeValues)
            {
                var variantId = Guid.NewGuid();
                variants.Add(new ProductVariant
                {
                    Id = variantId,
                    ProductId = productId,
                    StoreId = storeId,
                    SKU = $"SHOE-{productIndex + 1:D3}-{color.Value.ToUpper()[..2]}-{size.Value}",
                    PriceOverride = null, // uses Product.Price unless you want per-variant pricing
                    Stock = 15,
                    Options = new List<ProductVariantOption>
                    {
                        new() { ProductVariantId = variantId, ProductOptionValueId = size.Id },
                        new() { ProductVariantId = variantId, ProductOptionValueId = color.Id },
                    },
                });
                n++;
            }
        }

        return variants;
    }
}