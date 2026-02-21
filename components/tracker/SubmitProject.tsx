'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Trash2, Globe, Github, Linkedin, Send, ImagePlus, X, Pencil, Check } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { TRACK_CONFIGS, TRACK_OPTIONS } from '@/lib/trackData';

export type GalleryProject = {
  id: string;
  user_id: string;
  user_name: string;
  track_id: string;
  title: string;
  description: string;
  demo_url: string;
  github_url: string;
  linkedin_url: string;
  image_url: string;
  created_at: string;
};

interface SubmitProjectProps {
  currentTrack: string;
  userName: string;
}

const MAX_ORIGINAL_BYTES = 10 * 1024 * 1024;
const CARD_W = 1200;
const CARD_H = 545;
const CARD_RATIO = CARD_W / CARD_H;

// Center-crop to card aspect ratio and scale to CARD_W×CARD_H
function cropImageToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const sw = img.naturalWidth;
      const sh = img.naturalHeight;
      const srcRatio = sw / sh;
      let sx = 0, sy = 0, sW = sw, sH = sh;
      if (srcRatio > CARD_RATIO) {
        sW = Math.round(sh * CARD_RATIO);
        sx = Math.round((sw - sW) / 2);
      } else {
        sH = Math.round(sw / CARD_RATIO);
        sy = Math.round((sh - sH) / 2);
      }
      const canvas = document.createElement('canvas');
      canvas.width = CARD_W;
      canvas.height = CARD_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      ctx.drawImage(img, sx, sy, sW, sH, 0, 0, CARD_W, CARD_H);
      canvas.toBlob(
        (blob) => { if (blob) resolve(blob); else reject(new Error('toBlob failed')); },
        'image/jpeg', 0.9
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}

export default function SubmitProject({ currentTrack, userName }: SubmitProjectProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submit form state
  const [selectedTrack, setSelectedTrack] = useState(currentTrack);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submissions, setSubmissions] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDemoUrl, setEditDemoUrl] = useState('');
  const [editGithubUrl, setEditGithubUrl] = useState('');
  const [editLinkedinUrl, setEditLinkedinUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { setSelectedTrack(currentTrack); }, [currentTrack]);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from('gallery_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setSubmissions((data ?? []) as GalleryProject[]);
      setLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (file.size > MAX_ORIGINAL_BYTES) { setError('Image must be under 10 MB.'); return; }
    setError('');
    try {
      const blob = await cropImageToBlob(file);
      const cropped = new File([blob], 'cover.jpg', { type: 'image/jpeg' });
      setImageFile(cropped);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(blob));
    } catch {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Project title is required.'); return; }
    if (!description.trim()) { setError('Description is required.'); return; }
    setError('');
    setSubmitting(true);
    setSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Not authenticated.'); setSubmitting(false); return; }

    let imageUrl = '';
    if (imageFile) {
      const path = `${user.id}/${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(path, imageFile, { upsert: false, contentType: 'image/jpeg' });
      if (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }
      imageUrl = supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from('gallery_projects')
      .insert({
        user_id: user.id,
        user_name: userName,
        track_id: selectedTrack,
        title: title.trim(),
        description: description.trim(),
        demo_url: demoUrl.trim(),
        github_url: githubUrl.trim(),
        linkedin_url: linkedinUrl.trim(),
        image_url: imageUrl,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setSubmissions((prev) => [data as GalleryProject, ...prev]);
      setTitle(''); setDescription(''); setDemoUrl(''); setGithubUrl(''); setLinkedinUrl('');
      clearImage();
      setSuccess(true);
    }
    setSubmitting(false);
  };

  const startEdit = (s: GalleryProject) => {
    setEditingId(s.id);
    setEditTitle(s.title);
    setEditDescription(s.description);
    setEditDemoUrl(s.demo_url);
    setEditGithubUrl(s.github_url);
    setEditLinkedinUrl(s.linkedin_url ?? '');
    setPendingDeleteId(null);
  };

  const handleEditSave = async (id: string) => {
    if (!editTitle.trim()) return;
    setSaving(true);
    const updates = {
      title: editTitle.trim(),
      description: editDescription.trim(),
      demo_url: editDemoUrl.trim(),
      github_url: editGithubUrl.trim(),
      linkedin_url: editLinkedinUrl.trim(),
    };
    await supabase.from('gallery_projects').update(updates).eq('id', id);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setEditingId(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setPendingDeleteId(null);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    await supabase.from('gallery_projects').delete().eq('id', id);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Submit Your Project</h2>
          <p className="text-xs text-gray-400 mt-0.5">Share your work with the StepUp community</p>
        </div>
        <Link
          href="/gallery"
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all text-gray-600"
        >
          <ExternalLink size={12} />
          View Gallery
        </Link>
      </div>

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 border-b border-gray-100">

        {/* Track selector */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Track</label>
          <div className="flex flex-wrap gap-2">
            {TRACK_OPTIONS.map((t) => (
              <button key={t.id} type="button" onClick={() => setSelectedTrack(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedTrack === t.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                }`}>
                {t.label}
                {t.id === currentTrack && (
                  <span className={`text-[10px] font-medium ${selectedTrack === t.id ? 'opacity-60' : 'opacity-50'}`}>
                    my track
                  </span>
                )}
              </button>
            ))}
          </div>
          {selectedTrack && (
            <p className="text-xs text-gray-400 mt-1.5">
              {TRACK_OPTIONS.find((t) => t.id === selectedTrack)?.tagline}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            Project Title <span className="text-red-400">*</span>
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Personal Finance Tracker"
            className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="What does your project do? What tech did you use?" rows={3}
            className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none" />
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Live Demo URL</label>
            <input type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">GitHub URL</label>
            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            LinkedIn Post URL</label>
          <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/posts/..."
            className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
        </div>

        {/* Cover image */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            Cover Image{' '}
            <span className="text-gray-400 font-normal normal-case">(optional · max 10 MB)</span>
          </label>
          {imagePreview ? (
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200"
              style={{ aspectRatio: `${CARD_W}/${CARD_H}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button type="button" onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Remove image">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <ImagePlus size={20} />
              <span className="text-xs font-medium">Click to upload a screenshot</span>
              <span className="text-xs text-gray-300">JPG, PNG, WEBP</span>
            </button>
          )}
          <input ref={fileInputRef} type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleImageChange} className="hidden" />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        {success && (
          <p className="text-xs text-green-600 font-medium">
            Project submitted! View it in the{' '}
            <Link href="/gallery" className="underline">gallery</Link>.
          </p>
        )}

        <button type="submit" disabled={submitting}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Send size={14} />
          {submitting ? 'Submitting...' : 'Submit to Gallery'}
        </button>
      </form>

      {/* Your submissions */}
      <div className="px-6 py-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Your Submissions</h3>
        {loading ? (
          <p className="text-sm text-gray-400 py-4 text-center">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">No submissions yet — submit your first project above!</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((s) => (
              <div key={s.id} className="rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">

                {editingId !== s.id && (
                  <div className="flex items-start gap-3">
                    {s.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image_url} alt={s.title} className="w-20 h-20 object-cover flex-shrink-0" />
                    )}
                    <div className={`flex-1 min-w-0 py-3 ${s.image_url ? 'pr-3' : 'px-4'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-medium">
                              {TRACK_CONFIGS[s.track_id]?.trackName ?? s.track_id}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            {s.demo_url && (
                              <a href={s.demo_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                                <Globe size={11} /> Demo
                              </a>
                            )}
                            {s.github_url && (
                              <a href={s.github_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                                <Github size={11} /> GitHub
                              </a>
                            )}
                            {s.linkedin_url && (
                              <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                                <Linkedin size={11} /> LinkedIn
                              </a>
                            )}
                          </div>
                        </div>

                        {pendingDeleteId === s.id ? (
                          <div className="flex items-center gap-1.5 flex-shrink-0 pr-3 pt-0.5">
                            <span className="text-xs text-gray-500 font-medium">Remove?</span>
                            <button onClick={() => handleDelete(s.id)}
                              className="text-xs font-semibold px-2 py-0.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                              Yes
                            </button>
                            <button onClick={() => setPendingDeleteId(null)}
                              className="text-xs font-semibold px-2 py-0.5 border border-gray-200 text-gray-500 rounded-md hover:border-gray-400 transition-colors">
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 flex-shrink-0 pr-3 pt-0.5">
                            <button onClick={() => startEdit(s)}
                              className="p-1.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
                              aria-label="Edit submission">
                              <Pencil size={13} />
                            </button>
                            <button onClick={() => setPendingDeleteId(s.id)}
                              className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded-md hover:bg-gray-100"
                              aria-label="Delete submission">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {editingId === s.id && (
                  <div className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Editing</p>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Project title"
                      className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white" />
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description" rows={2}
                      className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="url" value={editDemoUrl} onChange={(e) => setEditDemoUrl(e.target.value)}
                        placeholder="Demo URL"
                        className="text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white" />
                      <input type="url" value={editGithubUrl} onChange={(e) => setEditGithubUrl(e.target.value)}
                        placeholder="GitHub URL"
                        className="text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white" />
                    </div>
                    <input type="url" value={editLinkedinUrl} onChange={(e) => setEditLinkedinUrl(e.target.value)}
                      placeholder="LinkedIn Post URL"
                      className="w-full text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white" />
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditSave(s.id)} disabled={saving || !editTitle.trim()}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
                        <Check size={12} />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingId(null)}
                        className="text-xs font-semibold px-3 py-1.5 border border-gray-200 text-gray-500 rounded-lg hover:border-gray-400 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
