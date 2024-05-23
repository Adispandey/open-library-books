import axios from 'axios';

export const fetchAuthorDetails = async (authorName) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(authorName)}`);
    if (response.data && response.data.numFound > 0) {
      const author = response.data.docs[0];
      return {
        birth_date: author.birth_date || 'Not available',
        top_work: author.top_work || 'N/A',
        top_subjects: author.top_subjects || [],
      };
    }
    return {
      birth_date: 'N/A',
      top_work: 'N/A',
      top_subjects: 'N/A',
    };
  } catch (error) {
    console.error('Error fetching author details:', error);
    return {
      birth_date: 'N/A',
      top_work: 'N/A',
      top_subjects: 'N/A',
    };
  }
};
