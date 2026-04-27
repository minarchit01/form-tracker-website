import { FormEvent, useMemo, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type IconProps = {
  className?: string;
};

const steps = [
  {
    title: "Point",
    copy: "Set your phone up facing you. No special equipment needed — just your existing camera.",
  },
  {
    title: "Lift",
    copy: "Do your set as normal. Repp analyzes your movement in real time as you lift.",
  },
  {
    title: "Fix",
    copy: "Get instant feedback on what to correct — so every rep builds better movement.",
  },
];

function MailIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function HeroBackground() {
  return (
    <div className="hero-skeleton" aria-hidden="true">
      <div className="deadlift-lifter">
        <span className="head" />
        <span className="torso" />
        <span className="upper-arm left" />
        <span className="upper-arm right" />
        <span className="forearm left" />
        <span className="forearm right" />
        <span className="thigh left" />
        <span className="thigh right" />
        <span className="shin left" />
        <span className="shin right" />
      </div>
    </div>
  );
}

function Wordmark() {
  return (
    <a className="brand-mark" href="#top" aria-label="Repp home">
      <span>rep</span><span style={{ color: "var(--accent)" }}>p</span>
    </a>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const endpoint = useMemo(
    () => import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined,
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setFormState("error");
      setMessage("Enter a valid email to join the waitlist.");
      return;
    }

    if (!endpoint) {
      setFormState("error");
      setMessage("Waitlist endpoint is not configured yet.");
      return;
    }

    setFormState("loading");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit waitlist email");
      }

      setFormState("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setFormState("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  }

  function renderWaitlistForm(inputId: string, messageId: string) {
    return (
      <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <div className="input-wrap">
          <MailIcon className="input-icon" />
          <input
            id={inputId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (formState !== "loading") {
                setFormState("idle");
                setMessage("");
              }
            }}
            aria-describedby={messageId}
          />
        </div>
        <button className="submit-button" type="submit" disabled={formState === "loading"}>
          <span>{formState === "loading" ? "Joining…" : "Get early access"}</span>
          <ArrowIcon />
        </button>
      </form>
    );
  }

  function renderFormMessage(messageId: string) {
    return (
      <div
        className={`form-message ${formState === "success" ? "success" : ""}`}
        id={messageId}
        role={formState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </div>
    );
  }

  return (
    <>
      <main className="site-shell">
        <section className="hero-section" aria-labelledby="hero-title">
          <HeroBackground />

          <nav className="top-nav" aria-label="Primary navigation">
            <Wordmark />
          </nav>

          <div className="hero-grid" id="top">
            <div className="hero-copy">
              <div className="waitlist-badge">
                <span className="badge-dot" />
                <span>Waitlist open</span>
              </div>
              <h1 id="hero-title">Form.<br />Corrected.</h1>
              <p className="hero-lede">
                Real-time computer vision that analyzes your movement and fixes your form.
              </p>
              {renderWaitlistForm("hero-email", "hero-form-message")}
              {renderFormMessage("hero-form-message")}
            </div>
          </div>
        </section>

        <section className="steps-section" id="how-it-works" aria-label="How it works">
          <div className="section-heading align-left">
            <p className="eyebrow">How it works</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <article className="step-item" key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" id="join" aria-labelledby="join-title">
          <div className="final-cta-inner">
            <h2 id="join-title">
              Every rep.<br />
              <span style={{ color: "var(--accent)" }}>Perfected.</span>
            </h2>
            <p>
              Join the waitlist and be among the first to train with real-time AI form coaching.
            </p>
            {renderWaitlistForm("join-email", "join-form-message")}
            {renderFormMessage("join-form-message")}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Wordmark />
        <p className="footer-copy">© 2026 Repp. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
