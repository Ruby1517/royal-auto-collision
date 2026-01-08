"use client";

import { useState, useMemo } from "react";
import { getAdminToken } from "@/lib/clientAuth";
import { uploadFilesToFirebase } from "@/lib/uploadToFirebase";

export default function UploadBeforeAfter() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [beforeFiles, setBeforeFiles] = useState<File[]>([]);
  const [afterFiles, setAfterFiles] = useState<File[]>([]);

  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  // Videos: each has a File and a title
  const [videos, setVideos] = useState<Array<{ file: File; title: string }>>([]);

  // Previews
  const beforePreviews = useMemo(
    () => beforeFiles.map((f) => URL.createObjectURL(f)),
    [beforeFiles]
  );
  const afterPreviews = useMemo(
    () => afterFiles.map((f) => URL.createObjectURL(f)),
    [afterFiles]
  );
  const videoPreviews = useMemo(
    () => videos.map((v) => URL.createObjectURL(v.file)),
    [videos]
  );

  const removeBefore = (idx: number) => {
    setBeforeFiles((prev) => prev.filter((_, i) => i !== idx));
    if (beforePreviews[idx]) URL.revokeObjectURL(beforePreviews[idx]);
  };

  const removeAfter = (idx: number) => {
    setAfterFiles((prev) => prev.filter((_, i) => i !== idx));
    if (afterPreviews[idx]) URL.revokeObjectURL(afterPreviews[idx]);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const token = getAdminToken();
      if (!token) throw new Error("Not logged in");

      // 1) Upload files directly to Firebase Storage
      const beforeMedia: string[] = await uploadFilesToFirebase(beforeFiles, "before-after/before");
      const afterMedia: string[] = await uploadFilesToFirebase(afterFiles, "before-after/after");
      const videoUrls: string[] = await uploadFilesToFirebase(
        videos.map((v) => v.file),
        "before-after/videos"
      );

      if (beforeMedia.length + afterMedia.length + videoUrls.length === 0) {
        throw new Error("Please include at least one image or video.");
      }

      // 2) Create Gallery item (so it appears on the BeforeAfter page)
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          beforeMedia,
          afterMedia,
          videos: videoUrls.map((url, i) => ({ url, title: videos[i]?.title || "" })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create gallery item failed");

      setMsg({ type: "ok", text: "Uploaded & published to Gallery!" });
      setTitle("");
      setDescription("");
      setBeforeFiles([]);
      setAfterFiles([]);
      setVideos([]);
      // Optionally: trigger a revalidation/refetch in your Gallery page
    } catch (err: any) {
      setMsg({ type: "err", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
      // Revoke object URLs
      beforePreviews.forEach(URL.revokeObjectURL);
      afterPreviews.forEach(URL.revokeObjectURL);
      videoPreviews.forEach(URL.revokeObjectURL);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {msg && (
        <div className={msg.type === "ok" ? "text-green-500" : "text-red-500"}>{msg.text}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Before Images</h3>
            <label className="btn btn-outline cursor-pointer">
              Select
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) =>
                  setBeforeFiles((prev) => [
                    ...prev,
                    ...(e.target.files ? Array.from(e.target.files) : []),
                  ])
                }
              />
            </label>
          </div>
          {beforePreviews.length === 0 ? (
            <p className="text-white/60 text-sm">No files selected.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {beforePreviews.map((src, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="object-cover w-full h-24" />
                  <button
                    type="button"
                    onClick={() => removeBefore(i)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600/70 text-white text-sm font-bold border border-white/30"
                    aria-label="Remove before image"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AFTER */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">After Images</h3>
            <label className="btn btn-outline cursor-pointer">
              Select
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) =>
                  setAfterFiles((prev) => [
                    ...prev,
                    ...(e.target.files ? Array.from(e.target.files) : []),
                  ])
                }
              />
            </label>
          </div>
          {afterPreviews.length === 0 ? (
            <p className="text-white/60 text-sm">No files selected.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {afterPreviews.map((src, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="object-cover w-full h-24" />
                  <button
                    type="button"
                    onClick={() => removeAfter(i)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600/70 text-white text-sm font-bold border border-white/30"
                    aria-label="Remove after image"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VIDEOS */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Videos</h3>
          <label className="btn btn-outline cursor-pointer">
            Select
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setVideos((prev) => [
                  ...prev,
                  ...files.map((f) => ({ file: f, title: "" })),
                ]);
              }}
            />
          </label>
        </div>
        {videos.length === 0 ? (
          <p className="text-white/60 text-sm">No videos selected.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {videos.map((vid, i) => (
              <div key={i} className="space-y-2">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={videoPreviews[i]} className="w-full rounded-lg" controls />
                <input
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                  placeholder="Video title"
                  value={vid.title}
                  onChange={(e) =>
                    setVideos((prev) => {
                      const copy = [...prev];
                      copy[i] = { ...copy[i], title: e.target.value };
                      return copy;
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Uploading..." : "Upload & Publish"}
        </button>
      </div>
    </form>
  );
}
