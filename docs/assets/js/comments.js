
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
  updateProfile
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
  const logoutButton = document.getElementById('logout');
  const userName = document.getElementById('user-name');
  const userProfilePic = document.getElementById('user-profile-pic');
  const loginArea = document.getElementById('comment-login');
  const replyingToContainer = document.getElementById('replying-to-container');
  const replyingToUser = document.getElementById('replying-to-user');
  const cancelReplyButton = document.getElementById('cancel-reply');
  const submitButton = document.getElementById('submit-comment');
  const emailLoginForm = document.getElementById('email-login-form');
  const emailInput = document.getElementById('email-input');

  if (comment_phrases && comment_phrases.placeholder) {
    commentInput.placeholder = comment_phrases.placeholder;
  }

  let currentUser = null;
  let replyTarget = null; 

  // --- Authentication ---
  onAuthStateChanged(auth, user => {
    currentUser = user;
    if (user) {
      if (user.displayName) {
        loginArea.style.display = 'none';
        commentFormWrapper.style.display = 'block';
        logoutButton.style.display = 'inline-flex';
        userName.textContent = `${user.displayName}로 댓글 작성`;
        userProfilePic.src = user.photoURL || '/assets/images/default-avatar.svg';
      } else {
        const randomName = generateRandomName();
        const avatarUrl = `https://source.boringavatars.com/beam/120/${randomName}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;

        loginArea.style.display = 'none';
        commentFormWrapper.style.display = 'block';
        logoutButton.style.display = 'inline-flex';
        userName.textContent = `'${randomName}'(으)로 댓글 작성`;
        userProfilePic.src = avatarUrl;

        updateProfile(user, { 
          displayName: randomName, 
          photoURL: avatarUrl 
        }).catch(error => {
          console.error("Error auto-updating profile:", error);
        });
      }
    } else {
      loginArea.style.display = 'block';
      commentFormWrapper.style.display = 'none';
      logoutButton.style.display = 'none';
    }
    renderComments();
  });

  // --- Auth Event Listeners ---
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  loginButton.addEventListener('click', () => signInWithPopup(auth, googleProvider).catch(err => console.error(err)));
  githubLoginButton.addEventListener('click', () => signInWithPopup(auth, githubProvider).catch(err => console.error(err)));
  logoutButton.addEventListener('click', () => signOut(auth));
  cancelReplyButton.addEventListener('click', cancelReply);

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

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (!commentText || !currentUser || !currentUser.displayName) return;

    submitButton.disabled = true;

    const newComment = {
      text: commentText,
      author: currentUser.displayName,
      authorImg: currentUser.photoURL,
      authorId: currentUser.uid,
      providerId: currentUser.providerData[0]?.providerId || 'password', 
      postSlug: postSlug,
      createdAt: serverTimestamp(),
      parentId: replyTarget ? replyTarget.id : null,
      deleted: false,
      likes: 0,
    };

    addDoc(commentsRef, newComment)
      .then(() => {
        cancelReply();
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error("Error adding document: ", error)
        submitButton.disabled = false;
      });
  });

  function setReplyTo(comment) {
    replyTarget = { id: comment.id, author: comment.author };
    replyingToContainer.style.display = 'block';
    commentInput.focus();
  }

  function cancelReply() {
    replyTarget = null;
    replyingToContainer.style.display = 'none';
    commentInput.value = '';
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
            const commentEl = renderCommentNode(commentNode, 0);
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

  // FINAL, LAYOUT-ADJUSTED VERSION
  function renderCommentNode(commentNode, depth) {
    const wrapper = document.createElement('div');
    wrapper.className = 'comment-item-wrapper';
    if (depth > 0) {
        wrapper.classList.add('ml-6', 'md:ml-10');
    }

    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.id = `comment-${commentNode.id}`;

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex items-start gap-3 md:gap-4';

    const avatar = document.createElement('span');
    avatar.className = 'comment-avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = commentNode.authorImg || '/assets/images/default-avatar.svg';
    if (commentNode.deleted) {
        avatarImg.src = '/assets/images/default-avatar.svg';
    }
    avatar.appendChild(avatarImg);

    const mainContent = document.createElement('div');
    mainContent.className = 'flex-1 min-w-0';

    const header = document.createElement('div');
    header.className = 'comment-header-main flex items-center justify-between';

    const authorWrapper = document.createElement('div');
    authorWrapper.className = 'comment-author-wrapper flex items-center gap-2';
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
    body.className = 'comment-body mt-2';
    if (commentNode.deleted) {
        body.innerHTML = '<i>[삭제된 댓글입니다]</i>';
    } else {
        body.innerHTML = marked.parse(commentNode.text || '');
    }

    const actions = document.createElement('div');
    actions.className = 'comment-actions mt-2';

    if (!commentNode.deleted) {
        const likeButton = document.createElement('button');
        likeButton.className = 'comment-action-btn like-button';
        likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg><span>${commentNode.likes || 0}</span>`;
        actions.appendChild(likeButton);

        const replyButton = document.createElement('button');
        replyButton.className = 'comment-action-btn';
        replyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span class="sm-only">답글</span>`;
        replyButton.onclick = () => setReplyTo(commentNode);
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
        childrenWrapper.className = 'mt-4 space-y-3';
        commentNode.children.forEach(childNode => {
            const childEl = renderCommentNode(childNode, depth + 1);
            childrenWrapper.appendChild(childEl);
        });
        wrapper.appendChild(childrenWrapper);
    }

    return wrapper;
  }

  // Initial render
  renderComments();
}
