"use client";

import { LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password")
      })
    });

    setLoading(false);
    if (!response.ok) {
      setError("Invalid username or password.");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main className="mesh-bg flex min-h-screen items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-xl border border-line bg-surface/90 p-6 shadow-sharp backdrop-blur sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded border border-line bg-bg text-accent">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-accent">Admin access</p>
        <h1 className="mt-3 font-display text-5xl leading-none text-text">Portfolio control</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          Sign in to update portfolio content, links, projects, education, tools, and contact details.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Username</span>
            <input
              name="username"
              required
              autoComplete="username"
              className="mt-2 h-12 w-full rounded border border-line bg-bg px-4 font-semibold text-text transition-colors outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="admin"
            />
          </label>
          <label className="block group">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Password</span>
            <div className="mt-2 flex h-12 items-center rounded border border-line bg-bg px-4 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
              <LockKeyhole className="mr-3 h-5 w-5 shrink-0 text-accent" />
              <input
                name="password"
                required
                type="password"
                autoComplete="current-password"
                className="h-full min-w-0 flex-1 bg-transparent font-semibold text-text outline-none focus:outline-none focus:ring-0 border-none p-0"
                placeholder="Enter password"
              />
            </div>
          </label>

          {error && <p className="rounded border border-accent2/40 bg-accent2/10 px-4 py-3 text-sm font-bold text-accent2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-bold text-bg transition hover:bg-accent2 disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Checking..." : "Log in"} <LogIn className="h-5 w-5" />
          </button>
        </form>
      </section>
    </main>
  );
}
