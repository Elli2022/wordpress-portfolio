"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

type AboutPageViewProps = {
  title: string;
  presentingText: string;
  contentHtml: string;
};

export default function AboutPageView({
  title,
  presentingText,
  contentHtml,
}: AboutPageViewProps) {
  return (
    <Modal dismissHref="/">
      <div className="modal-page">
        <div className="modal-page-portfolio">
          <Link href="/" className="modal-page-portfolio-link">
            Portfolio.
          </Link>
        </div>

        <div className="modal-page-inner">
          <div className="modal-about-layout">
            <div className="modal-about-copy">
              <p className="modal-about-eyebrow">{presentingText}</p>
              <h1 className="modal-about-title">{title}</h1>
              <div
                className="cms-content-on-dark"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>

            <div className="modal-about-photo">
              <div className="modal-about-photo-frame">
                <Image
                  src="/images/portfolioFoto.jpg"
                  alt={title}
                  width={320}
                  height={400}
                  className="modal-about-photo-img"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
