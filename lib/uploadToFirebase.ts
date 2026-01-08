"use client";

import { ensureAnonAuth, getFirebaseStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Uploads a list of files to Firebase Storage and returns their public download URLs.
 * Files are uploaded under the given folder path inside the bucket.
 */
export async function uploadFilesToFirebase(files: File[], folder: string): Promise<string[]> {
  if (!files.length) return [];
  await ensureAnonAuth();
  const storage = getFirebaseStorage();
  const stamp = Date.now();
  const clean = (name: string) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  return Promise.all(
    files.map(async (file, idx) => {
      const storageRef = ref(storage, `${folder}/${stamp}-${idx}-${clean(file.name)}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    })
  );
}

