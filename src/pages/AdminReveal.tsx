import { useEffect, useState } from "react";
import CMSLayout from "../components/cms/CMSLayout";
import { clearRevealGuests } from "../services/revealGuestService";
import {
  publishRevealResult,
  saveRevealSettings,
  subscribeToPublicRevealSettings,
  subscribeToRevealSettings,
  unpublishRevealResult,
} from "../services/revealService";
import {
  toDateTimeLocalValue,
  toStoredRevealDate,
} from "../utils/revealTime";

export default function AdminReveal() {
  const [gender, setGender] = useState<"girl" | "boy">("girl");
  const [revealDate, setRevealDate] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [resultPublished, setResultPublished] = useState(false);

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [clearingGuests, setClearingGuests] = useState(false);

  useEffect(() => {
    const unsubscribePrivate = subscribeToRevealSettings((settings) => {
      if (!settings) return;

      setGender(settings.gender === "boy" ? "boy" : "girl");
      setRevealDate(toDateTimeLocalValue(settings.revealDate));
      setEnabled(Boolean(settings.enabled));
    });

    const unsubscribePublic = subscribeToPublicRevealSettings((settings) => {
      setResultPublished(Boolean(settings?.resultPublished));
    });

    return () => {
      unsubscribePrivate();
      unsubscribePublic();
    };
  }, []);

  async function saveSettings() {
    if (!revealDate) {
      alert("Please select a reveal date and time.");
      return;
    }

    try {
      setSaving(true);

      await saveRevealSettings({
        gender,
        revealDate: toStoredRevealDate(revealDate),
        enabled,
      });

      alert(
        "Reveal settings saved ❤️\n\nThe result is still hidden from the public until you click Publish Result."
      );
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function publishResult() {
    const confirmed = window.confirm(
      "Are you sure you want to publish the final result publicly?\n\nAfter this, family members can see the gender after the suspense screen."
    );

    if (!confirmed) return;

    try {
      setPublishing(true);
      await publishRevealResult();
      alert("Reveal result published publicly 🎉");
    } catch (error) {
      console.error(error);
      alert("Publishing failed.");
    } finally {
      setPublishing(false);
    }
  }

  async function hideResult() {
    const confirmed = window.confirm(
      "Hide the public result again?\n\nThis is useful for testing before the real reveal."
    );

    if (!confirmed) return;

    try {
      setUnpublishing(true);
      await unpublishRevealResult();
      alert("Reveal result hidden again.");
    } catch (error) {
      console.error(error);
      alert("Failed to hide result.");
    } finally {
      setUnpublishing(false);
    }
  }

  async function clearWaitingRoom() {
    const confirmed = window.confirm(
      "Clear all waiting room guests?\n\nUse this before the real reveal to remove test entries."
    );

    if (!confirmed) return;

    try {
      setClearingGuests(true);
      const deletedCount = await clearRevealGuests();

      alert(`Waiting room cleared 🧹\n\nDeleted guests: ${deletedCount}`);
    } catch (error) {
      console.error(error);
      alert("Failed to clear waiting room.");
    } finally {
      setClearingGuests(false);
    }
  }

  return (
    <CMSLayout title="🎉 Reveal">
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Control the reveal experience, countdown timing, and final celebration.
      </p>

      <div className="glass-card admin-form-card">
        <div className="admin-form">
          <label>Baby Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "girl" | "boy")}
          >
            <option value="girl">Girl 💖</option>
            <option value="boy">Boy 💙</option>
          </select>

          <label>Reveal Date & Time</label>
          <input
            type="datetime-local"
            value={revealDate}
            onChange={(e) => setRevealDate(e.target.value)}
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 14,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            Enable Reveal
          </label>

          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 16,
              background: enabled
                ? "rgba(34, 197, 94, 0.12)"
                : "rgba(255, 255, 255, 0.06)",
              border: enabled
                ? "1px solid rgba(34, 197, 94, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <strong style={{ color: enabled ? "#86efac" : "#f7d774" }}>
              Reveal Status:
            </strong>{" "}
            {enabled ? "Reveal is active" : "Reveal is disabled"}
            <br />

            <span style={{ color: "#ccc" }}>
              Saved private result: {gender === "girl" ? "Girl 💖" : "Boy 💙"}
            </span>
            <br />

            <span style={{ color: resultPublished ? "#86efac" : "#f7d774" }}>
              Public result: {resultPublished ? "Published 🎉" : "Hidden 🔒"}
            </span>
          </div>

          <button
            className="primary-btn"
            onClick={saveSettings}
            disabled={saving}
            type="button"
          >
            {saving ? "Saving..." : "Save Reveal Settings ❤️"}
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 14,
            }}
          >
            <button
              className="primary-btn"
              onClick={publishResult}
              disabled={publishing || !enabled || !revealDate}
              type="button"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.95), rgba(16,185,129,0.95))",
              }}
            >
              {publishing ? "Publishing..." : "Publish Result 🎉"}
            </button>

            <button
              className="secondary-btn"
              onClick={hideResult}
              disabled={unpublishing}
              type="button"
            >
              {unpublishing ? "Hiding..." : "Hide Result Again 🔒"}
            </button>

            <button
              className="secondary-btn"
              onClick={clearWaitingRoom}
              disabled={clearingGuests}
              type="button"
            >
              {clearingGuests ? "Clearing..." : "Clear Waiting Room 🧹"}
            </button>
          </div>

          <p style={{ color: "#aaa", fontSize: ".9rem", lineHeight: 1.7 }}>
            Save Settings keeps the gender private. Publish Result is the button
            that makes the gender visible to the public reveal page. Clear
            Waiting Room removes test guests before sharing with family.
          </p>
        </div>
      </div>
    </CMSLayout>
  );
}