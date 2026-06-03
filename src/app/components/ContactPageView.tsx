"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Modal from "./Modal";

type ContactPageViewProps = {
  title: string;
  subtitle: string;
  contentHtml?: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPageView({
  title,
  subtitle,
  contentHtml,
}: ContactPageViewProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <Modal dismissHref="/">
      <div className="modal-page">
        <div className="modal-page-portfolio">
          <Link href="/" className="modal-page-portfolio-link">
            Portfolio.
          </Link>
        </div>

        <div className="modal-page-inner">
          <div className="modal-contact-layout">
            <div className="modal-contact-form-col">
              <h1 className="modal-contact-title">{title}</h1>
              <p className="modal-contact-lead">{subtitle}</p>

              {contentHtml ? (
                <div
                  className="cms-content-on-dark modal-contact-cms"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : null}

              {status === "success" ? (
                <p className="modal-form-feedback modal-form-feedback-success" role="status">
                  Thank you — your message was sent to eleonora.nocentini@gmail.com. I will
                  reply as soon as I can.
                </p>
              ) : null}

              {status === "error" && errorMessage ? (
                <p className="modal-form-feedback modal-form-feedback-error" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <form className="modal-contact-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="modal-form-label">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="modal-form-input"
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="modal-form-label">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="modal-form-input"
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="modal-form-label">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="modal-form-input"
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="modal-form-label">
                    Write your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className="modal-form-input"
                    disabled={status === "sending"}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-modal-send"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </form>
            </div>

            <div className="modal-contact-card-col">
              <div className="modal-contact-card">
                <p>
                  Email me at
                  <br />
                  <a
                    href="mailto:eleonora.nocentini@gmail.com"
                    className="modal-contact-card-link"
                  >
                    eleonora.nocentini@gmail.com
                  </a>
                </p>
                <p className="modal-contact-card-spaced">
                  GitHub
                  <br />
                  <a
                    href="https://github.com/Elli2022"
                    target="_blank"
                    rel="noreferrer"
                    className="modal-contact-card-link"
                  >
                    github.com/Elli2022
                  </a>
                </p>
                <p className="modal-contact-card-spaced">
                  Location
                  <br />
                  <span className="modal-contact-card-muted">Malmö, Sweden</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
