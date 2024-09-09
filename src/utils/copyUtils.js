// /utils/copyUtils.js
export const copyCodeToClipboard = (button) => {
    const codeElement = button.nextElementSibling.querySelector('code');
    if (codeElement) {
      const range = document.createRange();
      range.selectNode(codeElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      try {
        document.execCommand('copy');
        button.innerText = 'Copied';
        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
      window.getSelection().removeAllRanges();
    }
  };
  