import { FormEvent, useMemo, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type IconProps = {
  className?: string;
};

const benefits = [
  {
    title: "Form cues you can use",
    copy: "See simple notes on bar path, back angle, hip position, and tempo without digging through a full coaching report.",
  },
  {
    title: "Built around your videos",
    copy: "Record the same way you already do at the gym, upload the set, and get feedback while the lift is still fresh.",
  },
  {
    title: "Progress that stays visible",
    copy: "Compare sessions over time so cleaner reps are easier to spot and repeat.",
  },
];

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

function UploadIcon({ className }: IconProps) {
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
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M20 16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3" />
    </svg>
  );
}

function PulseIcon({ className }: IconProps) {
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
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
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
    <main className="site-shell">
      <section className="hero-section" aria-labelledby="hero-title">
        <nav className="top-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#top" aria-label="Repp home">
            <span>rep</span><span style={{ color: 'var(--accent)' }}>p</span>
          </a>
          <div className="nav-actions">
            <a className="nav-link" href="#how-it-works">
              How it works
            </a>
            <a className="nav-link" href="#join">
              Join
            </a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Waitlist open</p>
            <h1 id="hero-title">Form. Corrected.</h1>
            <p className="hero-lede">
              Real-time computer vision that analyzes your movement and fixes your form.
            </p>

            {renderWaitlistForm("hero-email", "hero-form-message")}
            {renderFormMessage("hero-form-message")}
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="steps-section" id="how-it-works" aria-labelledby="steps-title">
        <div className="section-heading align-left">
          <p className="eyebrow">How it works</p>
          <h2 id="steps-title">A faster feedback loop for the sets worth reviewing.</h2>
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

      <section className="feature-section" aria-labelledby="features-title">
        <div className="section-heading">
          <p className="eyebrow">Core benefits</p>
          <h2 id="features-title">Helpful enough for training day. Simple enough to use every week.</h2>
        </div>

        <div className="feature-grid">
          {benefits.map((benefit) => (
            <article className="feature-card" key={benefit.title}>
              <CheckIcon className="feature-icon" />
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-band" aria-label="Video privacy reassurance">
        <div className="privacy-copy">
          <ShieldIcon />
          <div>
            <p className="eyebrow">Your training videos stay yours</p>
            <h2>Private uploads, practical feedback.</h2>
            <p>
              Repp is being built for personal gym footage, with a simple promise:
              review the lift, return the cues, and keep control clear.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta" id="join" aria-labelledby="join-title">
        <div className="final-cta-inner">
          <p className="eyebrow">Early access</p>
          <h2 id="join-title">Bring better cues to your next deadlift day.</h2>
          <p>
            Join the waitlist and get first access when Repp opens.
          </p>
          {renderWaitlistForm("join-email", "join-form-message")}
          {renderFormMessage("join-form-message")}
        </div>
      </section>
    </main>
  );
}

function ProductPreview() {
  return (
    <aside className="product-preview" aria-label="Repp deadlift review preview">
      <div className="preview-toolbar">
        <div>
          <span className="toolbar-dot active" />
          <span className="toolbar-dot" />
          <span className="toolbar-dot" />
        </div>
        <span className="toolbar-label">Deadlift review</span>
      </div>

      <div className="video-panel">
        <div className="video-frame">
          <div className="floor-line" />
          <div className="barbell" />
          <div className="bar-path" />
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
          <span className="feedback-pin back">
            <PulseIcon />
          </span>
          <span className="feedback-pin hip">
            <CheckIcon />
          </span>
          <div className="rep-timeline" aria-hidden="true">
            <span className="active" />
            <span />
            <span />
            <span className="short" />
          </div>
        </div>

        <div className="review-list">
          <div className="review-row strong">
            <span>Back angle</span>
            <strong>Steady</strong>
          </div>
          <div className="review-row">
            <span>Bar path</span>
            <strong>Keep close</strong>
          </div>
          <div className="review-row">
            <span>Tempo</span>
            <strong>Smooth pull</strong>
          </div>
        </div>
      </div>

      <div className="upload-card">
        <div className="upload-icon">
          <UploadIcon />
        </div>
        <div>
          <span>Latest upload</span>
          <strong>Deadlift set 3, side angle</strong>
        </div>
      </div>
    </aside>
  );
}

export default App;
