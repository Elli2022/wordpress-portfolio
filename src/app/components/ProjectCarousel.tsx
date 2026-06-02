"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CarouselSlide } from "@/data/carousel-slides";
import RobustImage from "./RobustImage";

type ProjectCarouselProps = {
  slides: CarouselSlide[];
};

export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const goPrev = useCallback(() => {
    setIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((current) => (current === total - 1 ? 0 : current + 1));
  }, [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  if (total === 0) return null;

  const slide = slides[index];
  const isExternal = slide.href.startsWith("http");

  return (
    <section className="project-carousel" aria-label="All projects carousel">
      <div className="carousel-frame">
        <div className="carousel-media">
          {isExternal ? (
            <a
              href={slide.href}
              target="_blank"
              rel="noreferrer"
              className="carousel-image-link"
            >
              <RobustImage
                sources={slide.thumbnailSources}
                alt={slide.name}
                className="carousel-image"
              />
            </a>
          ) : (
            <Link href={slide.href} className="carousel-image-link">
              <RobustImage
                sources={slide.thumbnailSources}
                alt={slide.name}
                className="carousel-image"
              />
            </Link>
          )}
        </div>

        <div className="carousel-caption">
          <p className="carousel-kicker">Featured work</p>
          {isExternal ? (
            <a href={slide.href} target="_blank" rel="noreferrer">
              <h2 className="carousel-title">{slide.name}</h2>
            </a>
          ) : (
            <Link href={slide.href}>
              <h2 className="carousel-title">{slide.name}</h2>
            </Link>
          )}
          <p className="carousel-summary">{slide.summary}</p>
        </div>
      </div>

      <div className="carousel-controls" role="group" aria-label="Carousel navigation">
        <button
          type="button"
          className="carousel-nav carousel-nav-prev"
          onClick={goPrev}
          aria-label="Previous project"
        >
          ‹
        </button>
        <span className="carousel-counter" aria-live="polite">
          {index + 1}
        </span>
        <button
          type="button"
          className="carousel-nav carousel-nav-next"
          onClick={goNext}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots" aria-hidden>
        {slides.map((item, dotIndex) => (
          <button
            key={item.slug}
            type="button"
            className={`carousel-dot ${dotIndex === index ? "carousel-dot-active" : ""}`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Go to ${item.name}`}
          />
        ))}
      </div>
    </section>
  );
}
