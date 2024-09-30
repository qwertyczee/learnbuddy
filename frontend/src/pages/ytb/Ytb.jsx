import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import styles from './ytb.module.scss';
import "./highlight.css";

const parseMarkdown = (text) => {
  text = text.replace(/(\w)'s/g, '$1‘s');

  // Replace headings
  text = text.replace(/^(#{1,6})\s(.+)/gm, (_, hashes, content) => {
    const level = hashes.length;
    return `<h${level} class="${styles.heading1}">${content}</h${level}>`;
  });

  // Replace bold text
  text = text.replace(/\*\*(.+?)\*\*/g, `<span class="${styles.bold}">$1</span>`);

  // Replace italic text
  text = text.replace(/\*(.+?)\*/g, `<span class="${styles.italian}">$1</span>`);

  // Replace inline code
  text = text.replace(/`([^`\n]+)`/g, `<span class="${styles.inlineCode}">$1</span>`);

  // Replace code blocks
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'plaintext'; 
    return `<pre class="${styles.codeBlock}"><code class="language-${language}">${hljs.highlight(code, { language }).value}</code></pre>`;
  });

  return text;
};

function Ytb() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [summary]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/process-video', { videoUrl });
      setSummary(response.data.summary);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError('We are currently unable to process subtitles for this video. Our team is working to resolve this issue. We apologize for any inconvenience.');
      } else {
        setError(error.message || 'An unexpected error occurred. Please try again later.');
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Video Processor</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        className={styles.input}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Processing...' : 'Process Video'}
      </button>
      {summary && (
        <div className={styles.section}>
          <h2 className={styles.summary}>Summary</h2>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}
          />
        </div>
      )}
      {error && (
        <div className={styles.section}>
          <h2 className={styles.issue}>Issue</h2>
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ytb;
