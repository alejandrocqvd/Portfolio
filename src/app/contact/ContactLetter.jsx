"use client";

import { useEffect, useId, useState } from "react";
import { email } from "@/lib/site";

const topics = ["Full-time role", "Internship", "Just saying hi"];

const field =
  "w-full border-b border-ink/15 bg-transparent py-1.5 outline-none transition-colors duration-150 ease-out placeholder:text-muted/70 focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-error";

// ==============================================================================================================
function validate({ from, message, name }) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from.trim())) errors.from = "Enter an email address so I can reply, like you@company.com.";
  if (!message.trim()) errors.message = "Write a message before sending.";
  if (!name.trim()) errors.name = "Add your name to sign the letter.";
  return errors;
}

function compose({ topic, from, message, name }) {
  const body = `Dear Alejandro,\n\n${message.trim()}\n\nBest,\n${name.trim()}\n${from.trim()}`;
  return { subject: `${topic} from ${name.trim()}`, body };
}

// ==============================================================================================================
function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-error">
      {children}
    </p>
  );
}

// ==============================================================================================================
// A letter the visitor fills in. With no backend, Send hands it to their mail app (mailto) and offers a copy fallback.
export default function ContactLetter() {
  const id = useId();
  const [letter, setLetter] = useState({ topic: topics[0], from: "", message: "", name: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(new Date()));
  }, []);

  const set = (key) => (event) => {
    setLetter((l) => ({ ...l, [key]: event.target.value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function send(event) {
    event.preventDefault();
    const found = validate(letter);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const { subject, body } = compose(letter);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  async function copy() {
    const { subject, body } = compose(letter);
    try {
      await navigator.clipboard.writeText(`To: ${email}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const describe = (key) => (errors[key] ? `${id}-${key}-error` : undefined);

  return (
    <form
      noValidate
      onSubmit={send}
      aria-label="Letter to Alejandro"
      className="rounded-media border border-ink/10 bg-surface p-6 shadow-[0_1px_0_rgb(var(--c-text)/0.04)] md:p-10"
    >
      <dl className="grid grid-cols-[3.5rem_1fr] items-baseline gap-y-4 text-[0.95rem]">
        <dt className="text-sm text-muted">To</dt>
        <dd>
          Alejandro Cardona <span className="text-muted">&lt;{email}&gt;</span>
        </dd>

        <dt className="text-sm text-muted">
          <label htmlFor={`${id}-from`}>From</label>
        </dt>
        <dd>
          <input
            id={`${id}-from`}
            type="email"
            autoComplete="email"
            value={letter.from}
            onChange={set("from")}
            placeholder="you@company.com"
            aria-invalid={!!errors.from}
            aria-describedby={describe("from")}
            className={field}
          />
          <FieldError id={`${id}-from-error`}>{errors.from}</FieldError>
        </dd>

        <dt id={`${id}-re`} className="text-sm text-muted">
          Re
        </dt>
        <dd>
          <div role="radiogroup" aria-labelledby={`${id}-re`} className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <label
                key={topic}
                className="cursor-pointer rounded-control border border-ink/15 px-3 py-1.5 text-sm text-muted transition-colors duration-150 ease-out hover:text-ink has-[:checked]:border-ink/60 has-[:checked]:bg-ink/[0.06] has-[:checked]:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent"
              >
                <input
                  type="radio"
                  name={`${id}-topic`}
                  value={topic}
                  checked={letter.topic === topic}
                  onChange={set("topic")}
                  className="sr-only"
                />
                {topic}
              </label>
            ))}
          </div>
        </dd>
      </dl>

      <div className="mt-10 text-[0.95rem] leading-relaxed">
        <p>Dear Alejandro,</p>
        <label htmlFor={`${id}-message`} className="sr-only">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          rows={6}
          value={letter.message}
          onChange={set("message")}
          placeholder="Write your message here."
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={`${field} mt-3 resize-y leading-relaxed`}
        />
        <FieldError id={`${id}-message-error`}>{errors.message}</FieldError>

        <p className="mt-8">Best,</p>
        <label htmlFor={`${id}-name`} className="sr-only">
          Your name
        </label>
        <input
          id={`${id}-name`}
          autoComplete="name"
          value={letter.name}
          onChange={set("name")}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={describe("name")}
          className={`${field} mt-1 max-w-xs`}
        />
        <FieldError id={`${id}-name-error`}>{errors.name}</FieldError>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <p className="text-sm text-muted">{date || " "}</p>
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-control bg-ink px-5 text-sm text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-ink/85 active:scale-[0.97]"
        >
          Send letter
        </button>
      </div>

      <div aria-live="polite">
        {sent && (
          <div className="mt-6 rounded-control bg-ink/[0.05] p-4 text-sm leading-relaxed">
            <p>Your mail app should open with this letter ready to send.</p>
            <p className="mt-1 text-muted">
              Nothing opened? Copy the letter and send it to {email} from any mail client.
            </p>
            <button
              type="button"
              onClick={copy}
              className="mt-3 inline-flex h-9 items-center rounded-control border border-ink/15 px-3 transition-colors duration-150 ease-out hover:bg-ink/[0.06]"
            >
              {copied ? "Letter copied" : "Copy letter"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
