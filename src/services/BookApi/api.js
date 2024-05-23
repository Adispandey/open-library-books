import axios from "axios";
import { fetchAuthorDetails } from "../AuthorApi/authorapi";

export const fetchBooks = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://openlibrary.org/people/mekBot/books/want-to-read.json?page=${page}&limit=${limit}`
    );
    const readingLogEntries = response.data.reading_log_entries;

    const booksWithAuthorDetails = await Promise.all(
      readingLogEntries.map(async (entry) => {
        const authorDetails = await fetchAuthorDetails(
          entry.work.author_names[0]
        );

        return {
          author_names: entry.work.author_names.join(", "),
          title: entry.work.title,
          first_publish_year: entry.work.first_publish_year,
          ratings_average: '4.22',
          subject: authorDetails.top_subjects,
          author_birth_date: authorDetails.birth_date,
          author_top_work: authorDetails.top_work,
        };
      })
    );

    return booksWithAuthorDetails;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
