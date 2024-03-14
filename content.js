// content.js

class CommentBox {
  constructor() {
    this.commentBox = document.createElement('div');
    this.commentBox.classList.add('comment-box');
    this.textarea = document.createElement('textarea');
    this.saveButton = document.createElement('button');
    this.saveButton.textContent = 'Save Comment';
    this.commentBox.appendChild(this.textarea);
    this.commentBox.appendChild(this.saveButton);
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.saveButton.addEventListener('click', () => {
      const comment = this.textarea.value;
      const url = window.location.href;
      chrome.storage.local.get({comments: {}}, (result) => {
        const comments = result.comments;
        if (!comments[url]) {
          comments[url] = [];
        }
        comments[url].push(comment);
        chrome.storage.local.set({comments}, () => {
          console.log('Comment saved');
          this.textarea.value = ''; // Clear the textarea after saving
        });
      });
    });
  }

  injectCommentBox() {
    document.body.appendChild(this.commentBox);
  }
}

function injectCommentBoxIfNotExist() {
  if (!document.querySelector('.comment-box')) {
    const commentBox = new CommentBox();
    commentBox.injectCommentBox();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggleCommentBox') {
    injectCommentBoxIfNotExist();
  }
});

// Add CSS for the comment box
const style = document.createElement('style');
style.textContent = `
  .comment-box {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 10px;
    z-index: 10000;
  }
  .comment-box textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  .comment-box button {
    width: 100%;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  .comment-box button:hover {
    background-color: #45a049;
  }
`;
document.head.appendChild(style);