import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BlogPost } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyDt63YgXqVj1TqUdZEVgwdti0TaPwOTWDA",
  authDomain: "gentle-dreamlet-3tgzl.firebaseapp.com",
  projectId: "gentle-dreamlet-3tgzl",
  storageBucket: "gentle-dreamlet-3tgzl.firebasestorage.app",
  messagingSenderId: "586384431794",
  appId: "1:586384431794:web:98f9f867dfcbd2df2307ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-3bf4b229-7d58-42a0-a1e4-270ff82d2242");
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
    await getDocFromServer(doc(db, 'test-connection-doc', 'verify'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network.");
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
      posts.push({
        id: docSnap.id,
        title: data.title || '',
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
    const postData = {
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
      return post;
    } else {
      // Create new document with auto-generated ID (or custom if needed)
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), postData);
      return {
        ...post,
        id: docRef.id
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
