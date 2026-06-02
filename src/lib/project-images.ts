export type ImageVariant = "thumb" | "desktop" | "mobile";

const variantWidths: Record<ImageVariant, number> = {
  thumb: 640,
  desktop: 1280,
  mobile: 390,
};

function normalizeDeployUrl(deployUrl: string) {
  return deployUrl.replace(/\/$/, "");
}

/** Local file committed under public/ — most reliable in production. */
export function localProjectImage(slug: string, variant: ImageVariant) {
  return `/screenshots/projects/${slug}/${variant}.png`;
}

/**
 * Ordered fallback chain: local capture → WordPress mShots → thum.io → SVG placeholder.
 * The RobustImage component advances to the next URL on error.
 */
export function getProjectImageSources(
  slug: string,
  deployUrl: string,
  variant: ImageVariant
): string[] {
  const clean = normalizeDeployUrl(deployUrl);
  const width = variantWidths[variant];
  const encoded = encodeURIComponent(clean);

  return [
    localProjectImage(slug, variant),
    `https://s.wordpress.com/mshots/v1/${encoded}?w=${width}`,
    `https://image.thum.io/get/width/${width}/noanimate/${clean}`,
    "/images/screenshot-placeholder.svg",
  ];
}

export function buildProjectScreenshots(slug: string, deployUrl: string) {
  return [
    {
      sources: getProjectImageSources(slug, deployUrl, "desktop"),
      label: "Desktop landing view",
    },
    {
      sources: getProjectImageSources(slug, deployUrl, "mobile"),
      label: "Mobile view",
    },
    {
      sources: getProjectImageSources(slug, deployUrl, "thumb"),
      label: "Project overview",
    },
  ];
}
