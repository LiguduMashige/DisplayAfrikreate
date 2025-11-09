/**
 * Secure Authentication Service
 * Implements Web Crypto API and WebAuthn for biometric authentication
 * Inspired by Phoenix X device fingerprint security
 */

/* global PublicKeyCredential */

/**
 * Check if WebAuthn (biometric authentication) is available
 */
export const isBiometricAvailable = () => {
  return window.PublicKeyCredential !== undefined && 
         navigator.credentials !== undefined;
};

/**
 * Check if device supports fingerprint/FaceID
 */
export const checkBiometricSupport = async () => {
  if (!isBiometricAvailable()) {
    return {
      supported: false,
      message: 'Biometric authentication not supported on this device'
    };
  }

  try {
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return {
      supported: available,
      message: available 
        ? 'Biometric authentication available (Fingerprint/FaceID)' 
        : 'No biometric authenticator detected'
    };
  } catch (error) {
    return {
      supported: false,
      message: 'Error checking biometric support'
    };
  }
};

/**
 * Register user with biometric authentication
 */
export const registerBiometric = async (username, displayName) => {
  if (!isBiometricAvailable()) {
    throw new Error('Biometric authentication not supported');
  }

  try {
    // Generate challenge
    const challenge = generateChallenge();
    
    // Create credential options
    const publicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: {
        name: 'AfriKreate',
        id: window.location.hostname
      },
      user: {
        id: stringToArrayBuffer(username),
        name: username,
        displayName: displayName
      },
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7 // ES256
        },
        {
          type: 'public-key',
          alg: -257 // RS256
        }
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: 'none'
    };

    // Create credential
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });

    // Store credential info securely
    const credentialData = {
      id: credential.id,
      rawId: arrayBufferToBase64(credential.rawId),
      type: credential.type,
      username: username,
      createdAt: new Date().toISOString()
    };

    // Encrypt and store
    await secureStorage.setItem('biometric_credential', credentialData);
    
    return {
      success: true,
      credentialId: credential.id,
      message: 'Biometric authentication registered successfully'
    };

  } catch (error) {
    console.error('Biometric registration error:', error);
    throw new Error(`Registration failed: ${error.message}`);
  }
};

/**
 * Authenticate user with biometric
 */
export const authenticateWithBiometric = async () => {
  if (!isBiometricAvailable()) {
    throw new Error('Biometric authentication not supported');
  }

  try {
    // Get stored credential
    const storedCredential = await secureStorage.getItem('biometric_credential');
    if (!storedCredential) {
      throw new Error('No biometric credential found. Please register first.');
    }

    // Generate challenge
    const challenge = generateChallenge();

    // Create assertion options
    const publicKeyCredentialRequestOptions = {
      challenge: challenge,
      allowCredentials: [{
        id: base64ToArrayBuffer(storedCredential.rawId),
        type: 'public-key',
        transports: ['internal']
      }],
      timeout: 60000,
      userVerification: 'required'
    };

    // Get assertion
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });

    if (!assertion) {
      throw new Error('Authentication failed');
    }

    // Return user data
    return {
      success: true,
      username: storedCredential.username,
      authenticatedAt: new Date().toISOString(),
      message: 'Biometric authentication successful'
    };

  } catch (error) {
    console.error('Biometric authentication error:', error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

/**
 * Secure Storage using Web Crypto API
 */
export const secureStorage = {
  /**
   * Encrypt and store data
   */
  async setItem(key, value) {
    try {
      const encryptionKey = await getOrCreateEncryptionKey();
      const encrypted = await encryptData(JSON.stringify(value), encryptionKey);
      localStorage.setItem(`secure_${key}`, encrypted);
      return true;
    } catch (error) {
      console.error('Secure storage error:', error);
      return false;
    }
  },

  /**
   * Retrieve and decrypt data
   */
  async getItem(key) {
    try {
      const encrypted = localStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;
      
      const encryptionKey = await getOrCreateEncryptionKey();
      const decrypted = await decryptData(encrypted, encryptionKey);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Secure retrieval error:', error);
      return null;
    }
  },

  /**
   * Remove item
   */
  removeItem(key) {
    localStorage.removeItem(`secure_${key}`);
  },

  /**
   * Clear all secure storage
   */
  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith('secure_'))
      .forEach(key => localStorage.removeItem(key));
  }
};

/**
 * Generate or retrieve encryption key
 */
const getOrCreateEncryptionKey = async () => {
  const storedKey = localStorage.getItem('encryption_key_id');
  
  if (storedKey) {
    // In production, retrieve from secure key storage
    // For now, regenerate (keys should be stored in IndexedDB with crypto API)
  }

  // Generate new key
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  );

  // Store key ID (in production, use IndexedDB)
  const exported = await window.crypto.subtle.exportKey('jwk', key);
  localStorage.setItem('encryption_key_id', JSON.stringify(exported));

  return key;
};

/**
 * Import key from storage
 */
const importKey = async (jwk) => {
  return await window.crypto.subtle.importKey(
    'jwk',
    jwk,
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Encrypt data
 */
const encryptData = async (data, key) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(data);
  
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encoded
  );

  // Combine IV and encrypted data
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  return arrayBufferToBase64(combined.buffer);
};

/**
 * Decrypt data
 */
const decryptData = async (encryptedData, key) => {
  const combined = base64ToArrayBuffer(encryptedData);
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const keyJwk = JSON.parse(localStorage.getItem('encryption_key_id'));
  const importedKey = await importKey(keyJwk);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    importedKey,
    data
  );

  return new TextDecoder().decode(decrypted);
};

/**
 * Generate cryptographic challenge
 */
const generateChallenge = () => {
  return window.crypto.getRandomValues(new Uint8Array(32));
};

/**
 * Utility: Convert string to ArrayBuffer
 */
const stringToArrayBuffer = (str) => {
  return new TextEncoder().encode(str);
};

/**
 * Utility: Convert ArrayBuffer to Base64
 */
const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

/**
 * Utility: Convert Base64 to ArrayBuffer
 */
const base64ToArrayBuffer = (base64) => {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Traditional login with secure storage
 */
export const secureLogin = async (username, password) => {
  try {
    // Hash password using Web Crypto API
    const hashedPassword = await hashPassword(password);
    
    // In production, verify against backend
    // For now, store securely
    const userData = {
      username,
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString()
    };

    await secureStorage.setItem('user_credentials', userData);
    await secureStorage.setItem('auth_token', {
      token: generateSecureToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    });

    return {
      success: true,
      username,
      message: 'Login successful'
    };
  } catch (error) {
    console.error('Secure login error:', error);
    throw new Error('Login failed');
  }
};

/**
 * Hash password using SHA-256
 */
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return arrayBufferToBase64(hash);
};

/**
 * Generate secure token
 */
const generateSecureToken = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return arrayBufferToBase64(array.buffer);
};

/**
 * Verify authentication
 */
export const verifyAuth = async () => {
  try {
    const authToken = await secureStorage.getItem('auth_token');
    if (!authToken) return false;

    const expiresAt = new Date(authToken.expiresAt);
    if (expiresAt < new Date()) {
      await secureStorage.removeItem('auth_token');
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Logout and clear all secure data
 */
export const secureLogout = async () => {
  secureStorage.clear();
  return { success: true, message: 'Logged out successfully' };
};

export default {
  isBiometricAvailable,
  checkBiometricSupport,
  registerBiometric,
  authenticateWithBiometric,
  secureStorage,
  secureLogin,
  verifyAuth,
  secureLogout
};
