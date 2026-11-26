import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  query,
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';
import { BlogPost } from '../types';
import { slugify } from './slugify';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function createFirestoreInstance(): Firestore {
  try {
    // Wymuszenie long-polling zapobiega 10-sekundowemu timeoutowi WebChannel
    // w środowiskach z proxy, firewallami lub zagnieżdżonych iframe'ach.
    return initializeFirestore(
      app,
      { experimentalForceLongPolling: true },
      firebaseConfig.firestoreDatabaseId
    );
  } catch {
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
}

export const db = createFirestoreInstance();
export const storage = getStorage(app);

/**
 * Upload an image file to Firebase Storage.
 * Returns the public HTTPS download URL.
 */
export async function uploadBlogImage(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const fileName = `blog_images/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
  const storageRef = ref(storage, fileName);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

// Validate connection to Firestore on initialization
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Collection Reference
const BLOG_COLLECTION = 'blog_posts';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Fetch all blog posts from Firestore, ordered by pin status then optionally by date.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION)
    );
    const querySnapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const postTitle = data.title || '';
      posts.push({
        id: docSnap.id,
        slug: data.slug || slugify(postTitle) || docSnap.id,
        title: postTitle,
        category: data.category || 'Inne',
        excerpt: data.excerpt || '',
        content: data.content || '',
        image: data.image || undefined,
        imagePlaceholderStyle: data.imagePlaceholderStyle || undefined,
        date: data.date || '',
        readTime: data.readTime || '',
        isPinned: !!data.isPinned
      });
    });

    // Client-side sort to ensure pinned are first
    posts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    return posts;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, BLOG_COLLECTION);
    return []; // Never reached
  }
}

/**
 * Save or update a blog post in Firestore.
 */
export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  try {
    const resolvedSlug = slugify(post.slug || post.title);
    const postData = {
      slug: resolvedSlug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image || null,
      imagePlaceholderStyle: post.imagePlaceholderStyle || null,
      date: post.date,
      readTime: post.readTime,
      isPinned: !!post.isPinned
    };

    if (post.id && !post.id.startsWith('temp-') && post.id.length > 5) {
      // Update existing document
      await setDoc(doc(db, BLOG_COLLECTION, post.id), postData, { merge: true });
      return { ...post, slug: resolvedSlug };
    } else {
      // Create new document with auto-generated ID (or custom if needed)
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), postData);
      return {
        ...post,
        id: docRef.id,
        slug: resolvedSlug
      };
    }
  } catch (error) {
    handleFirestoreError(error, post.id ? OperationType.UPDATE : OperationType.CREATE, BLOG_COLLECTION);
    throw error; // Never reached
  }
}

/**
 * Delete a blog post from Firestore.
 */
export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, BLOG_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${BLOG_COLLECTION}/${id}`);
  }
}

export function createSlug(title: string): string {
  return slugify(title);
}