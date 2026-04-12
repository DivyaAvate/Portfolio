import { useEffect, useState } from 'react';

export function useGithubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, [username]);

  return { repos, loading };
}
