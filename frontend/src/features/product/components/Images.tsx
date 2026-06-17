import { useRef, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImagePlus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

const Images = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 1. Watch the actual form array value directly
  const watchedImages: File[] | undefined = watch("images");

  // 2. DERIVE previews during render instead of running an effect.
  // useMemo ensures we only recalculate these when the selected files actually change.
  const previews = useMemo(() => {
    if (!watchedImages || watchedImages.length === 0) return [];

    return Array.from(watchedImages).map((file) => URL.createObjectURL(file));
  }, [watchedImages]);

  // 3. Clean up the memory leak blob URLs when the previews change or unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!watchedImages) return;

    const updatedFiles = Array.from(watchedImages).filter(
      (_, i) => i !== indexToRemove,
    );

    setValue("images", updatedFiles, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle
          className={errors.images ? "text-destructive text-base" : "text-base"}
        >
          Product Images <span className="text-destructive">*</span>
        </CardTitle>
        <CardDescription>
          Upload product photos. The first image is used as the cover.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <input
          type="file"
          id="images"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          {...register("images", {
            onChange: (e) => {
              const files = e.target.files;
              if (files)
                setValue("images", Array.from(files), { shouldValidate: true });
            },
          })}
          ref={(e) => {
            register("images").ref(e);
            fileInputRef.current = e;
          }}
        />

        {/* Main Cover View */}
        <div
          onClick={handleTriggerUpload}
          className={`group relative flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/30 transition-colors hover:bg-muted/50 ${
            errors.images
              ? "border-destructive hover:border-destructive"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
        >
          {previews.length > 0 ? (
            <>
              <Image
                src={previews[0]}
                alt="Product Cover"
                fill
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={(e) => handleRemoveImage(0, e)}
                className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1 text-muted-foreground shadow-sm hover:bg-background hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">Click to upload</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  PNG, JPG, WEBP — up to 5 MB
                </p>
              </div>
            </>
          )}
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 text-[10px]"
          >
            Cover
          </Badge>
        </div>

        {/* Additional image slots */}
        <div className="flex w-full gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {[...Array(7)].map((_, i) => {
            const currentAssetIndex = i + 1;
            const hasExtraImage = previews[currentAssetIndex];

            return (
              <div
                key={i}
                onClick={handleTriggerUpload}
                className="relative flex aspect-square w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition-colors hover:border-muted-foreground/40 hover:bg-muted/50"
              >
                {hasExtraImage ? (
                  <>
                    <Image
                      src={previews[currentAssetIndex]}
                      alt={`Product preview ${currentAssetIndex}`}
                      fill
                      className="rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleRemoveImage(currentAssetIndex, e)}
                      className="absolute right-1 top-1 z-10 rounded-full bg-background/80 p-0.5 text-muted-foreground shadow-sm hover:bg-background hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <ImagePlus className="h-4 w-4 text-muted-foreground/40" />
                )}
              </div>
            );
          })}
        </div>
        {errors.images ? (
          <p className="text-center text-xs font-medium text-destructive mt-1">
            {errors.images.message as string}
          </p>
        ) : (
          <p className="text-center text-[11px] text-muted-foreground">
            Max 8 images · First file is automatically cover display.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Images;
