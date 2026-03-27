import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { SiteContent } from '../types';
import { defaultContent } from '../data/defaultContent';
import { db, auth } from '../firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<void>;
  user: User | null;
  isAuthReady: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Test connection to Firestore
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  // Listen for Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Listen for Content changes from Firestore
  useEffect(() => {
    const contentDoc = doc(db, 'content', 'main');
    const unsubscribe = onSnapshot(contentDoc, (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data() as SiteContent);
      } else {
        // Initialize with default content if it doesn't exist
        // Only if we are an admin, but for now we'll just let the admin save it
        console.log("No content found in Firestore, using default.");
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'content/main');
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    try {
      const contentDoc = doc(db, 'content', 'main');
      await setDoc(contentDoc, {
        ...newContent,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'content/main');
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, user, isAuthReady }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
