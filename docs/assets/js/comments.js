import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Main function to initialize and run the comment system
export function initComments(firebaseConfig, comment_phrases) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Handle Email Link Sign-in when the page loads
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation.');
    }
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch((error) => {
        console.error("Error signing in with email link", error);
        alert("Error signing in. The link may be expired or invalid.");
      });
  }

  // --- Helper Functions ---
  function generateRandomName() {
    const adjectives = ['행복한', '재치있는', '용감한', '친절한', '똑똑한', '날렵한', '고요한', '빛나는'];
    const nouns = ['고양이', '강아지', '판다', '호랑이', '사자', '돌고래', '참새', '독수리'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
  }

  function toRelativeTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diff = now - date;

    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    if (diffSeconds < 5) return '방금 전';
    if (diffMinutes < 1) return `${diffSeconds}초 전`;
    if (diffHours < 1) return `${diffMinutes}분 전`;
    if (diffDays < 1) return `${diffHours}시간 전`;
    if (diffDays === 1) return '어제';
    if (diffWeeks < 1) return `${diffDays}일 전`;
    if (diffMonths < 1) return `${diffMonths}달 전`;
    return `${diffYears}년 전`;
  }

  function getIconForProvider(providerId) {
    switch (providerId) {
      case 'password':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
      case 'google.com':
        return `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>`;
      case 'github.com':
        return `<svg viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="black"/></svg>`;
      default:
        return '';
    }
  }

  // --- DOM Elements ---
  const commentCount = document.getElementById('comment-count');
  const commentList = document.getElementById('comment-list');
  const commentForm = document.getElementById('comment-form');
  const commentFormWrapper = document.getElementById('comment-form-wrapper');
  const commentInput = document.getElementById('comment-input');
  const loginButton = document.getElementById('login-with-google');
  const githubLoginButton = document.getElementById('login-with-github');
  const profileMenuWrapper = document.getElementById('comment-profile');
  const profileMenuTrigger = document.getElementById('profile-menu-trigger');
  const commentAvatarTrigger = document.getElementById('comment-avatar-trigger');
  const profileMenu = document.getElementById('profile-menu');
  const profileMenuEdit = document.getElementById('profile-menu-edit');
  const profileMenuMyComments = document.getElementById('profile-menu-my-comments');
  const logoutButton = document.getElementById('profile-menu-logout');
  const userName = document.getElementById('user-name');
  const commentAvatarImg = document.getElementById('user-profile-pic');
  const headerAvatarImg = document.getElementById('profile-menu-avatar');
  const profileSummaryPic = document.getElementById('user-profile-pic-summary');
  const profileSummaryName = document.getElementById('user-name-summary');
  const profileSummaryEmail = document.getElementById('user-email-summary');
  const loginArea = document.getElementById('comment-login');
  const replyingToContainer = document.getElementById('replying-to-container');
  const replyingToUser = document.getElementById('replying-to-user');
  const cancelReplyButton = document.getElementById('cancel-reply');
  const submitButton = document.getElementById('submit-comment');
  const emailLoginForm = document.getElementById('email-login-form');
  const emailInput = document.getElementById('email-input');
  const settingsModal = document.getElementById('settings-modal');
  const settingsForm = document.getElementById('settings-form');
  const displayNameInput = document.getElementById('display-name-input');
  const photoURLInput = document.getElementById('photo-url-input');
  const photoUploadInput = document.getElementById('photo-upload-input');
  const photoUploadButton = document.getElementById('photo-upload-button');
  const photoRemoveButton = document.getElementById('photo-remove-button');
  const photoUploadLabel = document.getElementById('photo-upload-label');
  const photoPreviewImage = document.getElementById('photo-preview');
  const closeButton = document.querySelector('.close-button');
  const cancelSettingsButton = document.getElementById('cancel-settings');
  const editProfileLabel = (comment_phrases && comment_phrases.edit_profile) ? comment_phrases.edit_profile : 'Edit profile';
  const commentingAsTemplate = (comment_phrases && comment_phrases.commenting_as) ? comment_phrases.commenting_as : 'Commenting as {name}';
  const uploadLabel = (comment_phrases && comment_phrases.profile_modal_upload) ? comment_phrases.profile_modal_upload : 'Upload photo';
  const uploadingLabel = (comment_phrases && comment_phrases.profile_modal_uploading) ? comment_phrases.profile_modal_uploading : 'Uploading…';
  const commentPlaceholder = (comment_phrases && comment_phrases.comment_placeholder) ? comment_phrases.comment_placeholder : '';
  const noPersonalComments = (comment_phrases && comment_phrases.no_personal_comments) ? comment_phrases.no_personal_comments : 'No comments yet.';
  const defaultAvatar = '/assets/images/default-avatar.svg';

  if (commentInput && commentPlaceholder) {
    commentInput.placeholder = commentPlaceholder;
  }

  let currentUser = null;
  let userProfile = null;
  let latestOAuthProvider = null;
  let profileMenuOpen = false;

  function formatCommentingAs(name) {
    if (!name) return '';
    if (commentingAsTemplate.includes('{name}')) {
      return commentingAsTemplate.replace('{name}', name);
    }
    return `${commentingAsTemplate} ${name}`;
  }

  function setPhotoPreview(url) {
    if (!photoPreviewImage) return;
    const hasPhoto = !!url;
    photoPreviewImage.src = hasPhoto ? url : defaultAvatar;
    if (photoRemoveButton) {
      photoRemoveButton.style.display = hasPhoto ? '' : 'none';
    }
  }

  function setUploadState(isUploading) {
    if (!photoUploadButton || !photoUploadLabel) return;
    photoUploadButton.disabled = isUploading;
    photoUploadLabel.textContent = isUploading ? uploadingLabel : uploadLabel;
  }

  function openProfileMenu() {
    if (!profileMenu || !profileMenuTrigger) return;
    profileMenu.hidden = false;
    profileMenuTrigger.setAttribute('aria-expanded', 'true');
    profileMenuTrigger.classList.add('is-active');
    profileMenuOpen = true;
  }

  function closeProfileMenu() {
    if (!profileMenu || !profileMenuTrigger) return;
    profileMenu.hidden = true;
    profileMenuTrigger.setAttribute('aria-expanded', 'false');
    profileMenuTrigger.classList.remove('is-active');
    profileMenuOpen = false;
  }

  function toggleProfileMenu() {
    if (profileMenuOpen) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  }

  function focusUserComments() {
    closeProfileMenu();
    if (!currentUser || !commentList) {
      return;
    }
    const target = commentList.querySelector(`[data-author-id="${currentUser.uid}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('highlight');
      window.setTimeout(() => target.classList.remove('highlight'), 2000);
    } else if (noPersonalComments) {
      alert(noPersonalComments);
    } else {
      alert('No comments yet.');
    }
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function openProfileSettings() {
    if (!settingsModal || !currentUser || !userProfile) {
      return;
    }
    closeProfileMenu();
    if (displayNameInput) {
      displayNameInput.value = userProfile.displayName || '';
    }
    if (photoURLInput) {
      photoURLInput.value = userProfile.photoURL || '';
    }
    setPhotoPreview(userProfile.photoURL);
    setUploadState(false);
    if (photoUploadInput) {
      photoUploadInput.value = '';
    }
    settingsModal.style.display = 'flex';
    settingsModal.classList.add('is-open');
    if (displayNameInput) {
      window.requestAnimationFrame(() => displayNameInput.focus());
    }
  }

  function closeProfileSettings() {
    if (!settingsModal) {
      return;
    }
    setUploadState(false);
    settingsModal.classList.remove('is-open');
    settingsModal.style.display = 'none';
    if (photoUploadInput) {
      photoUploadInput.value = '';
    }
    if (profileMenuTrigger && profileMenuWrapper && profileMenuWrapper.style.display !== 'none') {
      profileMenuTrigger.focus();
    } else if (commentAvatarTrigger && commentFormWrapper && commentFormWrapper.style.display !== 'none') {
      commentAvatarTrigger.focus();
    }
  }

  // --- User Profile Management ---
  async function handleUserProfile(user) {
    const providerData = user.providerData || [];
    const providerIdCandidate = latestOAuthProvider || (providerData.length ? providerData[providerData.length - 1].providerId : 'password');
    const providerId = providerIdCandidate || 'password';
    const buildAvatarUrl = (seed) => 'https://source.boringavatars.com/beam/120/' + seed + '?colors=264653,2a9d8f,e9c46a,f4a261,e76f51';

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existing = userDoc.data();
        const normalizedProvider = providerId === 'password' && existing.provider ? existing.provider : providerId;
        userProfile = { ...existing, provider: normalizedProvider };
        if (providerId !== 'password' && existing.provider !== providerId) {
          await updateDoc(userRef, { provider: providerId });
        }
      } else {
        const newProfile = {
          displayName: user.displayName || generateRandomName(),
          photoURL: user.photoURL || buildAvatarUrl(user.uid),
          provider: providerId,
          createdAt: serverTimestamp(),
          originalName: user.displayName || '',
        };
        await setDoc(userRef, newProfile);
        userProfile = newProfile;
      }
    } catch (error) {
      console.warn('Falling back to auth profile. Firestore user profile unavailable.', error);
      const fallbackName = user.displayName || generateRandomName();
      const fallbackPhoto = user.photoURL || buildAvatarUrl(user.uid);
      userProfile = {
        displayName: fallbackName,
        photoURL: fallbackPhoto,
        provider: providerId || 'password',
      };

      if (!user.displayName || !user.photoURL) {
        try {
          await updateProfile(user, {
            displayName: fallbackName,
            photoURL: fallbackPhoto,
          });
        } catch (profileError) {
          console.error('Error updating Firebase auth profile', profileError);
        }
      }
    } finally {
      latestOAuthProvider = null;
    }

    const resolvedPhoto = userProfile.photoURL || defaultAvatar;
    const resolvedName = userProfile.displayName || user.email || 'Anonymous';

    if (userName) {
      userName.textContent = formatCommentingAs(resolvedName);
    }
    if (commentAvatarImg) {
      commentAvatarImg.src = resolvedPhoto;
      commentAvatarImg.alt = userProfile.displayName || editProfileLabel;
    }
    if (headerAvatarImg) {
      headerAvatarImg.src = resolvedPhoto;
      headerAvatarImg.alt = userProfile.displayName || editProfileLabel;
    }
    if (profileSummaryPic) {
      profileSummaryPic.src = resolvedPhoto;
      profileSummaryPic.alt = userProfile.displayName || editProfileLabel;
    }
    if (profileSummaryName) {
      profileSummaryName.textContent = resolvedName;
    }
    if (profileSummaryEmail) {
      if (user.email) {
        profileSummaryEmail.textContent = user.email;
        profileSummaryEmail.style.display = '';
      } else {
        profileSummaryEmail.textContent = '';
        profileSummaryEmail.style.display = 'none';
      }
    }
    setPhotoPreview(userProfile.photoURL);
    setUploadState(false);
    if (profileMenuTrigger) {
      profileMenuTrigger.setAttribute('aria-label', editProfileLabel);
      profileMenuTrigger.setAttribute('title', editProfileLabel);
      profileMenuTrigger.disabled = false;
    }
    if (commentAvatarTrigger) {
      commentAvatarTrigger.setAttribute('aria-label', editProfileLabel);
      commentAvatarTrigger.setAttribute('title', editProfileLabel);
      commentAvatarTrigger.disabled = false;
    }
    if (profileMenuWrapper) {
      profileMenuWrapper.style.display = 'inline-flex';
    }
    if (displayNameInput) {
      displayNameInput.value = userProfile.displayName || '';
    }
    if (photoURLInput) {
      photoURLInput.value = userProfile.photoURL || '';
    }
  }

  // --- Authentication ---
  onAuthStateChanged(auth, async user => {
    currentUser = user;
    if (user) {
      await handleUserProfile(user);
      if (loginArea) loginArea.style.display = 'none';
      if (commentFormWrapper) commentFormWrapper.style.display = 'block';
      if (logoutButton) logoutButton.disabled = false;
    } else {
      userProfile = null;
      closeProfileMenu();
      if (loginArea) loginArea.style.display = 'block';
      if (commentFormWrapper) commentFormWrapper.style.display = 'none';
      if (profileMenuWrapper) profileMenuWrapper.style.display = 'none';
      if (profileMenuTrigger) {
        profileMenuTrigger.setAttribute('aria-expanded', 'false');
        profileMenuTrigger.classList.remove('is-active');
        profileMenuTrigger.disabled = true;
      }
      if (commentAvatarTrigger) {
        commentAvatarTrigger.disabled = true;
      }
      if (userName) {
        userName.textContent = '';
      }
      if (commentAvatarImg) {
        commentAvatarImg.src = defaultAvatar;
        commentAvatarImg.alt = editProfileLabel;
      }
      if (headerAvatarImg) {
        headerAvatarImg.src = defaultAvatar;
        headerAvatarImg.alt = editProfileLabel;
      }
      if (profileSummaryPic) {
        profileSummaryPic.src = defaultAvatar;
        profileSummaryPic.alt = editProfileLabel;
      }
      if (profileSummaryName) {
        profileSummaryName.textContent = '';
      }
      if (profileSummaryEmail) {
        profileSummaryEmail.textContent = '';
        profileSummaryEmail.style.display = 'none';
      }
      if (photoURLInput) {
        photoURLInput.value = '';
      }
      setPhotoPreview(null);
      setUploadState(false);
      if (photoUploadButton) {
        photoUploadButton.disabled = false;
      }
      if (logoutButton) {
        logoutButton.disabled = true;
      }
    }
    renderComments();
  });

  // --- Auth Event Listeners ---
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  const providerConfig = {
    google: { instance: googleProvider, id: 'google.com' },
    github: { instance: githubProvider, id: 'github.com' },
  };

  async function resolveAccountLinkingConflict(error, attemptedProviderKey) {
    const email = error.customData?.email;
    const pendingCredential =
      attemptedProviderKey === 'github'
        ? GithubAuthProvider.credentialFromError(error)
        : GoogleAuthProvider.credentialFromError(error);

    if (!email || !pendingCredential) {
      alert('이미 다른 로그인 방법으로 가입된 이메일입니다. 기존 로그인 방법으로 먼저 로그인해주세요.');
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.includes('google.com')) {
        try {
          googleProvider.setCustomParameters({ login_hint: email, prompt: 'select_account' });
          latestOAuthProvider = 'google.com';
          const googleResult = await signInWithPopup(auth, googleProvider);
          try {
            await linkWithCredential(googleResult.user, pendingCredential);
            latestOAuthProvider = attemptedProviderKey === 'github' ? 'github.com' : 'google.com';
            if (auth.currentUser) {
              await handleUserProfile(auth.currentUser);
            }
            alert('GitHub 계정을 기존 로그인과 연결했습니다. 이제 GitHub로도 로그인할 수 있습니다.');
          } catch (linkError) {
            console.error('Failed to link OAuth credential', linkError);
            alert('계정 연결에 실패했습니다. Google로 로그인한 후 GitHub 로그인을 다시 시도해주세요.');
          }
        } catch (googleError) {
          if (googleError.code === 'auth/popup-closed-by-user') {
            console.warn('Google sign-in popup closed before completing account linking.');
          } else if (googleError.code !== 'auth/cancelled-popup-request') {
            console.error('Google sign-in failed while resolving account linking', googleError);
            alert('Google 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
          }
        }
      } else {
        const existingMethod = methods[0] || '기존 로그인 방법';
        const readableMethod = existingMethod === 'password'
          ? '이메일/비밀번호'
          : existingMethod === 'emailLink'
            ? '이메일 링크'
            : existingMethod;
        alert('이미 ' + readableMethod + ' 방식으로 가입된 이메일입니다. 먼저 해당 방법으로 로그인한 뒤 GitHub를 연결해주세요.');
      }
    } catch (methodError) {
      console.error('Error fetching sign-in methods for linking', methodError);
      alert('계정 정보를 확인할 수 없습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  async function startOAuthSignIn(providerKey) {
    const config = providerConfig[providerKey];
    if (!config) {
      return;
    }

    latestOAuthProvider = config.id;

    try {
      await signInWithPopup(auth, config.instance);
    } catch (error) {
      latestOAuthProvider = null;

      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }

      if (error.code === 'auth/account-exists-with-different-credential') {
        await resolveAccountLinkingConflict(error, providerKey);
        return;
      }

      console.error('Error during ' + providerKey + ' sign-in', error);
      alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  loginButton.addEventListener('click', () => startOAuthSignIn('google'))
  githubLoginButton.addEventListener('click', () => startOAuthSignIn('github'))

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      closeProfileMenu();
      signOut(auth);
    });
  }

  if (profileMenuTrigger) {
    profileMenuTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!currentUser) {
        return;
      }
      toggleProfileMenu();
    });
    profileMenuTrigger.addEventListener('keydown', (event) => {
      if (!currentUser) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleProfileMenu();
      } else if (event.key === 'Escape') {
        closeProfileMenu();
      }
    });
  }

  if (commentAvatarTrigger) {
    commentAvatarTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!currentUser) {
        return;
      }
      openProfileMenu();
      if (profileMenuTrigger) {
        window.requestAnimationFrame(() => profileMenuTrigger.focus());
      }
    });
  }

  if (profileMenuEdit) {
    profileMenuEdit.addEventListener('click', () => {
      openProfileSettings();
    });
  }

  if (profileMenuMyComments) {
    profileMenuMyComments.addEventListener('click', () => {
      focusUserComments();
    });
  }

  document.addEventListener('click', (event) => {
    if (!profileMenuOpen) {
      return;
    }
    if (profileMenuWrapper && profileMenuWrapper.contains(event.target)) {
      return;
    }
    closeProfileMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && profileMenuOpen) {
      closeProfileMenu();
      if (profileMenuTrigger && profileMenuWrapper && profileMenuWrapper.style.display !== 'none') {
        profileMenuTrigger.focus();
      }
    }
  });

  if (photoUploadButton && photoUploadInput) {
    photoUploadButton.addEventListener('click', () => {
      photoUploadInput.click();
    });
  }

  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Please choose an image file.');
        setUploadState(false);
        photoUploadInput.value = '';
        return;
      }
      if (file.size > 524288) {
        alert('Selected image is too large. Please choose a file under 500KB.');
        setUploadState(false);
        photoUploadInput.value = '';
        return;
      }
      try {
        setUploadState(true);
        const dataUrl = await readFileAsDataURL(file);
        if (photoURLInput) {
          photoURLInput.value = dataUrl;
        }
        setPhotoPreview(dataUrl);
      } catch (error) {
        console.error('Failed to load selected image', error);
        alert('Unable to load the selected image. Please try a different file.');
      } finally {
        setUploadState(false);
        photoUploadInput.value = '';
      }
    });
  }

  if (photoRemoveButton) {
    photoRemoveButton.addEventListener('click', () => {
      if (photoURLInput) {
        photoURLInput.value = '';
      }
      setPhotoPreview(null);
      setUploadState(false);
    });
  }

  if (photoURLInput) {
    photoURLInput.addEventListener('input', () => {
      const value = photoURLInput.value.trim();
      setPhotoPreview(value || null);
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeProfileSettings();
    });
  }

  if (cancelSettingsButton) {
    cancelSettingsButton.addEventListener('click', () => {
      closeProfileSettings();
    });
  }

  window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
      closeProfileSettings();
    }
  });

  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!displayNameInput) return;
    const newDisplayName = displayNameInput.value.trim();
    const newPhotoURL = photoURLInput ? photoURLInput.value.trim() : '';

    if (!newDisplayName) {
      alert('Please provide a display name.');
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      displayName: newDisplayName,
      photoURL: newPhotoURL
    });

    userProfile.displayName = newDisplayName;
    userProfile.photoURL = newPhotoURL;

    const resolvedPhoto = newPhotoURL || defaultAvatar;
    const resolvedName = newDisplayName || currentUser.email || 'Anonymous';

    if (userName) {
      userName.textContent = formatCommentingAs(resolvedName);
    }
    if (commentAvatarImg) {
      commentAvatarImg.src = resolvedPhoto;
      commentAvatarImg.alt = newDisplayName || editProfileLabel;
    }
    if (headerAvatarImg) {
      headerAvatarImg.src = resolvedPhoto;
      headerAvatarImg.alt = newDisplayName || editProfileLabel;
    }
    if (profileSummaryPic) {
      profileSummaryPic.src = resolvedPhoto;
      profileSummaryPic.alt = newDisplayName || editProfileLabel;
    }
    if (profileSummaryName) {
      profileSummaryName.textContent = resolvedName;
    }
    if (profileSummaryEmail) {
      if (currentUser.email) {
        profileSummaryEmail.textContent = currentUser.email;
        profileSummaryEmail.style.display = '';
      } else {
        profileSummaryEmail.textContent = '';
        profileSummaryEmail.style.display = 'none';
      }
    }
    setPhotoPreview(newPhotoURL);
    closeProfileSettings();
  });

  // This is now only for the top-level form.
  cancelReplyButton.addEventListener('click', () => {
    commentInput.value = '';
  });

  emailLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (!email) return;

    const actionCodeSettings = {
      url: window.location.href, 
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        alert(`로그인 링크가 ${email} 주소로 전송되었습니다. 이메일을 확인해주세요!`);
        emailInput.value = '';
      })
      .catch((error) => {
        console.error("Error sending sign-in link", error);
        alert("로그인 링크 전송에 실패했습니다. 이메일 주소를 확인해주세요.");
      });
  });

  // --- Firestore & Comment Logic ---
  const commentsRef = collection(db, "comments");
  const postSlug = window.location.pathname;

  // Handler for the main, top-level comment form
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (!commentText || !currentUser || !userProfile) return;

    submitButton.disabled = true;

    const newComment = {
      text: commentText,
      author: userProfile.displayName,
      authorImg: userProfile.photoURL,
      authorId: currentUser.uid,
      providerId: userProfile.provider,
      postSlug: postSlug,
      createdAt: serverTimestamp(),
      parentId: null, // Top-level comments have no parent
      deleted: false,
      likes: 0,
    };

    addDoc(commentsRef, newComment)
      .then(() => {
        commentInput.value = ''; // Only clear the input
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error("Error adding document: ", error)
        submitButton.disabled = false;
      });
  });

  function createReplyForm(targetEl, replyTarget) {
    const formWrapper = document.createElement('div');
    formWrapper.className = 'comment-form-container reply-form-container';
    formWrapper.style.marginTop = '1rem';

    const form = document.createElement('form');
    form.className = 'comment-form';

    form.innerHTML = `
      <div class="comment-form-top-row">
        <span class="comment-form-avatar">
          <img src="${userProfile.photoURL || '/assets/images/default-avatar.svg'}" alt="User Profile">
        </span>
        <div class="comment-form-main">
          <div style="display: block; font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">
            Replying to <strong>${replyTarget.author}</strong>
          </div>
          <textarea class="comment-textarea" required>${replyTarget.depth >= 2 ? `@${replyTarget.author} ` : ''}</textarea>
          <div class="comment-form-bottom-row">
            <span class="comment-form-user-info">${userProfile.displayName}</span>
            <div class="comment-form-actions">
              <button type="button" class="cancel-reply-btn">Cancel</button>
              <button type="submit" class="comment-submit-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    `;

    formWrapper.appendChild(form);
    targetEl.appendChild(formWrapper);

    const newTextarea = form.querySelector('.comment-textarea');
    newTextarea.focus();

    form.querySelector('.cancel-reply-btn').addEventListener('click', () => {
      formWrapper.remove();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentText = newTextarea.value.trim();
      if (!commentText) return;

      const submitBtn = form.querySelector('.comment-submit-button');
      submitBtn.disabled = true;

      let parentId = replyTarget.depth >= 2 ? replyTarget.parentId : replyTarget.id;

      const newComment = {
        text: commentText,
        author: userProfile.displayName,
        authorImg: userProfile.photoURL,
        authorId: currentUser.uid,
        providerId: userProfile.provider,
        postSlug: postSlug,
        createdAt: serverTimestamp(),
        parentId: parentId,
        mentionTargetId: replyTarget.depth >= 2 ? replyTarget.id : null,
        deleted: false,
        likes: 0,
      };

      addDoc(commentsRef, newComment)
        .then(() => {
          formWrapper.remove();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          submitBtn.disabled = false;
        });
    });
  }

  function setReplyTo(comment, depth, rootId) {
    const targetCommentEl = document.getElementById('comment-' + comment.id);
    if (!targetCommentEl || !currentUser) return;

    const existingForm = targetCommentEl.querySelector('.reply-form-container');
    if (existingForm) {
      existingForm.remove();
      return;
    }

    const replyTarget = {
      id: comment.id,
      author: comment.author,
      depth: depth,
      rootId: rootId,
      parentId: comment.parentId
    };

    createReplyForm(targetCommentEl, replyTarget);
  }

  function buildCommentTree(comments) {
    const commentMap = {};
    comments.forEach(comment => {
      commentMap[comment.id] = { ...comment, children: [] };
    });

    const tree = [];
    comments.forEach(comment => {
      if (comment.parentId && commentMap[comment.parentId]) {
        commentMap[comment.parentId].children.push(commentMap[comment.id]);
      } else {
        tree.push(commentMap[comment.id]);
      }
    });
    return tree;
  }

  function renderComments() {
    const q = query(commentsRef, where("postSlug", "==", postSlug), orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const allComments = [];
      querySnapshot.forEach(doc => allComments.push({ id: doc.id, ...doc.data() }));
      
      const authorMap = {};
      allComments.forEach(c => { authorMap[c.id] = c.author; });

      commentCount.textContent = `${allComments.length}`;
      commentList.innerHTML = ''; 

      if (allComments.length === 0) {
        const noCommentsBox = document.createElement('div');
        noCommentsBox.className = 'no-comments-box';
        noCommentsBox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <p>첫 댓글을 작성해주세요!</p>
        `;
        commentList.appendChild(noCommentsBox);
      } else {
        const commentTree = buildCommentTree(allComments);
        commentTree.forEach(commentNode => {
            const commentEl = renderCommentNode(commentNode, 0, commentNode.id, authorMap);
            commentList.appendChild(commentEl);
        });
      }
    });
  }

  function toggleEdit(commentItem, comment, bodyEl) {
    const originalBodyHTML = bodyEl.innerHTML;
    const actionsEl = commentItem.querySelector('.comment-actions');
    actionsEl.style.display = 'none';

    const editForm = document.createElement('form');
    const editArea = document.createElement('textarea');
    editArea.className = 'comment-textarea';
    editArea.value = comment.text;
    editForm.appendChild(editArea);

    const editActions = document.createElement('div');
    editActions.className = 'flex justify-end gap-2 mt-2';
    
    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.className = 'comment-submit-button';
    saveButton.textContent = '저장';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'comment-action-btn';
    cancelButton.textContent = '취소';

    editActions.appendChild(cancelButton);
    editActions.appendChild(saveButton);
    editForm.appendChild(editActions);

    bodyEl.innerHTML = '';
    bodyEl.appendChild(editForm);

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newText = editArea.value.trim();
        if (newText) {
            updateDoc(doc(db, 'comments', comment.id), { text: newText });
        } 
    });

    cancelButton.addEventListener('click', () => {
        bodyEl.innerHTML = originalBodyHTML;
        actionsEl.style.display = 'flex';
    });
  }

  function renderCommentNode(commentNode, depth, rootId, authorMap) {
    const wrapper = document.createElement('div');
    wrapper.className = 'comment-item-wrapper';
    if (depth > 0) {
        wrapper.classList.add('nested-comment');
    }

    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.id = `comment-${commentNode.id}`;
    if (commentNode.authorId) {
      commentItem.dataset.authorId = commentNode.authorId;
    }

    if (depth === 1) {
        commentItem.classList.add('comment-reply-shadow');
    }
    if (depth === 2) {
        commentItem.classList.add('comment-deep-reply-shadow');
    }

    const flexContainer = document.createElement('div');
    flexContainer.className = 'comment-item-flex';

    const avatar = document.createElement('span');
    avatar.className = 'comment-avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = commentNode.authorImg || '/assets/images/default-avatar.svg';
    if (commentNode.deleted) {
        avatarImg.src = '/assets/images/default-avatar.svg';
    }
    avatar.appendChild(avatarImg);

    if (currentUser && commentNode.authorId && currentUser.uid === commentNode.authorId && !commentNode.deleted) {
        avatar.classList.add('comment-avatar--interactive');
        avatar.setAttribute('role', 'button');
        avatar.setAttribute('aria-label', editProfileLabel);
        avatar.tabIndex = 0;
        const handleAvatarActivate = (event) => {
            if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
                return;
            }
            event.preventDefault();
            openProfileSettings();
        };
        avatar.addEventListener('click', handleAvatarActivate);
        avatar.addEventListener('keydown', handleAvatarActivate);
    }

    const mainContent = document.createElement('div');
    mainContent.className = 'comment-main';

    const header = document.createElement('div');
    header.className = 'comment-header-main';

    const authorWrapper = document.createElement('div');
    authorWrapper.className = 'comment-author-wrapper';
    const author = document.createElement('span');
    author.className = 'comment-author';
    author.textContent = commentNode.deleted ? '[삭제된 사용자]' : (commentNode.author || '[익명]');
    authorWrapper.appendChild(author);

    const providerId = commentNode.providerId;
    if (providerId && !commentNode.deleted) {
        const socialIcon = document.createElement('span');
        socialIcon.className = 'comment-author-social-icon';
        socialIcon.innerHTML = getIconForProvider(providerId);
        authorWrapper.appendChild(socialIcon);
    }
    header.appendChild(authorWrapper);

    const meta = document.createElement('div');
    meta.className = 'comment-meta';
    const time = document.createElement('time');
    time.textContent = toRelativeTime(commentNode.createdAt);
    meta.appendChild(time);
    header.appendChild(meta);

    const body = document.createElement('div');
    body.className = 'comment-body';
    if (commentNode.deleted) {
        body.innerHTML = '<i>[삭제된 댓글입니다]</i>';
    } else {
        let commentText = commentNode.text || '';
        let commentHTML = '';

        if (commentNode.mentionTargetId) {
            const mentionedAuthor = authorMap[commentNode.mentionTargetId];
            if (mentionedAuthor) {
                const mentionString = `@${mentionedAuthor}`;
                if (commentText.startsWith(mentionString)) {
                    const link = `<a class="comment-mention-link" href="#comment-${commentNode.mentionTargetId}">${mentionString}</a>`;
                    const restOfText = commentText.substring(mentionString.length);
                    commentHTML = `<p>${link}${marked.parse(restOfText).replace(/^<p>|<\/p>$/g, '')}</p>`;
                } else {
                    commentHTML = marked.parse(commentText);
                }
            } else {
                commentHTML = marked.parse(commentText);
            }
        } else {
            commentHTML = marked.parse(commentText);
        }
        body.innerHTML = commentHTML;
    }

    const actions = document.createElement('div');
    actions.className = 'comment-actions';

    if (!commentNode.deleted) {
        const likeButton = document.createElement('button');
        likeButton.className = 'comment-action-btn like-button';
        likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg><span>${commentNode.likes || 0}</span>`;
        actions.appendChild(likeButton);

        const replyButton = document.createElement('button');
        replyButton.className = 'comment-action-btn';
        replyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span class="sm-only">답글</span>`;
        replyButton.onclick = () => setReplyTo(commentNode, depth, rootId);
        actions.appendChild(replyButton);

        if (currentUser && currentUser.uid === commentNode.authorId) {
            const editButton = document.createElement('button');
            editButton.className = 'comment-action-btn';
            editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg><span class="sm-only">수정</span>`;
            editButton.onclick = () => toggleEdit(commentItem, commentNode, body);
            actions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'comment-action-btn';
            deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg><span class="sm-only">삭제</span>`;
            deleteButton.onclick = () => {
                if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
                    updateDoc(doc(db, 'comments', commentNode.id), {
                        text: '',
                        author: '',
                        authorImg: '',
                        authorId: '',
                        deleted: true
                    });
                }
            };
            actions.appendChild(deleteButton);
        }
    }

    mainContent.appendChild(header);
    mainContent.appendChild(body);
    mainContent.appendChild(actions);

    flexContainer.appendChild(avatar);
    flexContainer.appendChild(mainContent);
    commentItem.appendChild(flexContainer);
    wrapper.appendChild(commentItem);

    if (commentNode.children && commentNode.children.length > 0) {
        const childrenWrapper = document.createElement('div');
        childrenWrapper.className = 'nested-comment-children';
        commentNode.children.forEach(childNode => {
            const childEl = renderCommentNode(childNode, depth + 1, rootId, authorMap);
            childrenWrapper.appendChild(childEl);
        });
        wrapper.appendChild(childrenWrapper);
    }

    return wrapper;
  }

  // Initial render
  renderComments();

  // --- Highlight on Mention Click ---

  function highlightComment(commentId) {
    const commentEl = document.getElementById(commentId);
    if (commentEl) {
      commentEl.classList.add('highlight');
      // Optional: scroll into view with offset for sticky header
      const headerOffset = 80;
      const elementPosition = commentEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setTimeout(() => {
        commentEl.classList.remove('highlight');
      }, 2000); // Remove highlight after 2 seconds
    }
  }

  // Listen for clicks on mention links
  commentList.addEventListener('click', (e) => {
    const target = e.target.closest('.comment-mention-link');
    if (target) {
      e.preventDefault();
      const commentId = target.hash.substring(1);
      highlightComment(commentId);
    }
  });

  // Check for a comment hash in the URL on page load
  function handlePageLoadHighlight() {
    if (window.location.hash.startsWith('#comment-')) {
      highlightComment(window.location.hash.substring(1));
    }
  }

  // We need to wait for comments to be rendered the first time
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('.comment-item')) {
      handlePageLoadHighlight();
      obs.disconnect(); // Stop observing after first render
    }
  });
  observer.observe(commentList, {
    childList: true,
    subtree: true
  });
}
