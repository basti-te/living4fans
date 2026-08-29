"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage über living4fans.de — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`
    );
    window.location.href = `mailto:living4fans@web.de?subject=${subject}&body=${body}`;
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="form-field">
        <label className="label" htmlFor="cf-name">
          Name
        </label>
        <input
          id="cf-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ihr Name"
          required
        />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="cf-email">
          E-Mail
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ihre@adresse.de"
          required
        />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="cf-message">
          Nachricht
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Welches Möbelstück, welche Farbe, welche Frage?"
          required
        />
      </div>
      <div>
        <button type="submit" className="btn-filled">
          Nachricht senden
        </button>
      </div>
    </form>
  );
}
