"use client";

import { useEffect, useRef, useState } from "react";
import { HiCloudArrowUp, HiPlus, HiTrash, HiPencilSquare } from "react-icons/hi2";

type PaymentOption = {
  optionId?: string;
  label: string;
  paymentAddressLabel: string;
  paymentAddressValue: string;
  qrImageUrl: string;
  instructionsText: string;
  isActive: boolean;
};

type PaymentMethod = {
  _id: string;
  name: string;
  isActive: boolean;
  options: Array<{
    optionId: string;
    label: string;
    paymentAddressLabel: string;
    paymentAddressValue: string;
    qrImageUrl?: string;
    instructions: string[];
    isActive: boolean;
  }>;
};

const emptyOption: PaymentOption = {
  label: "",
  paymentAddressLabel: "",
  paymentAddressValue: "",
  qrImageUrl: "",
  instructionsText: "",
  isActive: true,
};

export default function AdminPaymentMethodsPage() {
  const qrFileInputRef = useRef<HTMLInputElement>(null);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [methodName, setMethodName] = useState("");
  const [methodActive, setMethodActive] = useState(true);
  const [optionDraft, setOptionDraft] = useState<PaymentOption>(emptyOption);
  const [methodOptions, setMethodOptions] = useState<PaymentOption[]>([]);

  useEffect(() => {
    fetchMethods();
  }, []);

  async function fetchMethods() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/payment-methods");
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch payment methods");
      }
      setMethods(data.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch payment methods");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEditingId(null);
    setMethodName("");
    setMethodActive(true);
    setOptionDraft(emptyOption);
    setMethodOptions([]);
  }

  async function uploadQrImage(file: File) {
    setUploadingQr(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.message || "QR upload failed");
      }
      setOptionDraft((prev) => ({ ...prev, qrImageUrl: data.url }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload QR image");
    } finally {
      setUploadingQr(false);
    }
  }

  function addOptionToMethod() {
    if (
      !optionDraft.label.trim() ||
      !optionDraft.paymentAddressLabel.trim() ||
      !optionDraft.paymentAddressValue.trim()
    ) {
      setError("Option label, address label, and address value are required.");
      return;
    }

    setError("");
    setMethodOptions((prev) => [...prev, { ...optionDraft }]);
    setOptionDraft(emptyOption);
  }

  function removeOption(index: number) {
    setMethodOptions((prev) => prev.filter((_, i) => i !== index));
  }

  async function saveMethod() {
    if (!methodName.trim()) {
      setError("Payment method name is required.");
      return;
    }
    if (methodOptions.length === 0) {
      setError("Add at least one payment option.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const optionsPayload = methodOptions.map((option) => ({
      optionId: option.optionId,
      label: option.label.trim(),
      paymentAddressLabel: option.paymentAddressLabel.trim(),
      paymentAddressValue: option.paymentAddressValue.trim(),
      qrImageUrl: option.qrImageUrl.trim(),
      instructions: option.instructionsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      isActive: option.isActive,
    }));

    try {
      const endpoint = editingId
        ? `/api/admin/payment-methods/${editingId}`
        : "/api/admin/payment-methods";
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: methodName.trim(),
          isActive: methodActive,
          options: optionsPayload,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save payment method");
      }

      setSuccess(editingId ? "Payment method updated." : "Payment method created.");
      resetForm();
      fetchMethods();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save payment method");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(method: PaymentMethod) {
    setEditingId(method._id);
    setMethodName(method.name);
    setMethodActive(method.isActive);
    setMethodOptions(
      method.options.map((option) => ({
        optionId: option.optionId,
        label: option.label,
        paymentAddressLabel: option.paymentAddressLabel,
        paymentAddressValue: option.paymentAddressValue,
        qrImageUrl: option.qrImageUrl || "",
        instructionsText: (option.instructions || []).join("\n"),
        isActive: option.isActive,
      })),
    );
    setOptionDraft(emptyOption);
    setSuccess("");
    setError("");
  }

  async function deleteMethod(id: string, name: string) {
    if (!confirm(`Delete "${name}" payment method?`)) return;
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`/api/admin/payment-methods/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete payment method");
      }
      setSuccess("Payment method deleted.");
      fetchMethods();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete payment method");
    }
  }

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-heading, sans-serif)", fontSize: "28px", color: "var(--ink)" }}>
          Payment Methods
        </h1>
        <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "14px" }}>
          Add payment method, payment option, QR, and address/ID used in checkout.
        </p>
      </div>

      {error && (
        <div style={{ marginBottom: "14px", padding: "12px 14px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ marginBottom: "14px", padding: "12px 14px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46" }}>
          {success}
        </div>
      )}

      <section style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px", marginBottom: "22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px" }}>
          <input
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
            placeholder="Payment method name (e.g. UPI Payment, Binance Pay)"
            style={{ padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }}
          />
          <button
            type="button"
            onClick={() => setMethodActive((p) => !p)}
            style={{ padding: "0 16px", borderRadius: "9px", border: "1px solid var(--line)", background: methodActive ? "#ecfdf5" : "#f3f4f6", color: methodActive ? "#047857" : "#6b7280", fontWeight: 700 }}
          >
            {methodActive ? "Active" : "Inactive"}
          </button>
        </div>

        <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: "18px", color: "var(--ink)" }}>Add Payment Option</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} className="pm-option-grid">
            <input value={optionDraft.label} onChange={(e) => setOptionDraft((p) => ({ ...p, label: e.target.value }))} placeholder="Option label (e.g. UPI ID)" style={{ padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }} />
            <input value={optionDraft.paymentAddressLabel} onChange={(e) => setOptionDraft((p) => ({ ...p, paymentAddressLabel: e.target.value }))} placeholder="Address label (e.g. UPI ID / Wallet Address)" style={{ padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }} />
            <input value={optionDraft.paymentAddressValue} onChange={(e) => setOptionDraft((p) => ({ ...p, paymentAddressValue: e.target.value }))} placeholder="Address value (e.g. techinrent@axl)" style={{ padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={optionDraft.qrImageUrl} onChange={(e) => setOptionDraft((p) => ({ ...p, qrImageUrl: e.target.value }))} placeholder="QR Image URL (optional)" style={{ flex: 1, padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }} />
              <input
                ref={qrFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadQrImage(file);
                }}
              />
              <button type="button" onClick={() => qrFileInputRef.current?.click()} disabled={uploadingQr} style={{ padding: "0 12px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff" }}>
                <HiCloudArrowUp size={18} />
              </button>
            </div>
          </div>
          <textarea
            value={optionDraft.instructionsText}
            onChange={(e) => setOptionDraft((p) => ({ ...p, instructionsText: e.target.value }))}
            placeholder={"Payment instructions (one line per instruction)\nExample:\nSend exact amount\nTake screenshot and upload proof"}
            rows={4}
            style={{ width: "100%", marginTop: "10px", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", resize: "vertical" }}
          />

          <button type="button" onClick={addOptionToMethod} style={{ marginTop: "10px", padding: "10px 14px", borderRadius: "9px", background: "var(--teal-pale)", border: "1px solid var(--teal-border)", color: "var(--teal)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <HiPlus size={16} /> Add Option
          </button>
        </div>

        {methodOptions.length > 0 && (
          <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
            {methodOptions.map((option, index) => (
              <div key={`${option.label}-${index}`} style={{ border: "1px solid var(--line)", borderRadius: "10px", padding: "12px", background: "var(--off)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                  <div>
                    <strong>{option.label}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                      {option.paymentAddressLabel}: {option.paymentAddressValue}
                    </p>
                    {option.qrImageUrl && (
                      <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--teal-deep)" }}>
                        QR: {option.qrImageUrl}
                      </p>
                    )}
                  </div>
                  <button type="button" onClick={() => removeOption(index)} style={{ border: "none", background: "transparent", color: "#dc2626", cursor: "pointer" }}>
                    <HiTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={saveMethod} disabled={saving} style={{ padding: "12px 20px", borderRadius: "9px", border: "none", background: "var(--teal)", color: "#fff", fontWeight: 700 }}>
            {saving ? "Saving..." : editingId ? "Update Method" : "Create Method"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: "12px 20px", borderRadius: "9px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontWeight: 700 }}>
              Cancel Edit
            </button>
          )}
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px" }}>
        <h2 style={{ margin: "0 0 12px", fontSize: "20px", color: "var(--ink)" }}>Saved Methods</h2>
        {loading ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>Loading...</p>
        ) : methods.length === 0 ? (
          <p style={{ margin: 0, color: "var(--muted)" }}>No payment methods found.</p>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {methods.map((method) => (
              <div key={method._id} style={{ border: "1px solid var(--line)", borderRadius: "10px", padding: "12px", background: "var(--off)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
                  <div>
                    <strong>{method.name}</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                      {method.isActive ? "Active" : "Inactive"} - {method.options.length} options
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="button" onClick={() => startEdit(method)} style={{ border: "none", background: "transparent", color: "var(--teal)", cursor: "pointer" }}>
                      <HiPencilSquare size={18} />
                    </button>
                    <button type="button" onClick={() => deleteMethod(method._id, method.name)} style={{ border: "none", background: "transparent", color: "#dc2626", cursor: "pointer" }}>
                      <HiTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pm-option-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

