// // export const createNewsVoiceCommands = (newsData, actions) => {
// //   const { news = [], currentArticleIndex = 0 } = newsData;
// //   const { 
// //     readArticle, 
// //     readArticleSummary, 
// //     fetchNews, 
// //     stopReading,
// //     setCurrentArticleIndex 
// //   } = actions;

// //   return {
// //     // Reading commands
// //     'read news': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return `Reading article ${currentArticleIndex + 1}: ${article.title}`;
// //         }
// //       }
// //       return "No articles available. Please refresh the news.";
// //     },
    
// //     'read article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticle(article);
// //           return `Reading article ${currentArticleIndex + 1}`;
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     'read summary': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           readArticleSummary(article);
// //           return "Reading article summary";
// //         }
// //       }
// //       return "No article available";
// //     },
    
// //     // Navigation
// //     'next article': () => {
// //       if (news.length > 0) {
// //         const nextIndex = (currentArticleIndex + 1) % news.length;
// //         setCurrentArticleIndex(nextIndex);
// //         const nextArticle = news[nextIndex];
// //         if (nextArticle) {
// //           return `Next article: ${nextArticle.title}. Article ${nextIndex + 1} of ${news.length}`;
// //         }
// //       }
// //       return "No articles loaded yet";
// //     },
    
// //     'previous article': () => {
// //       if (news.length > 0) {
// //         const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
// //         setCurrentArticleIndex(prevIndex);
// //         const prevArticle = news[prevIndex];
// //         if (prevArticle) {
// //           return `Previous article: ${prevArticle.title}. Article ${prevIndex + 1} of ${news.length}`;
// //         }
// //       }
// //       return "No articles loaded yet";
// //     },
    
// //     'first article': () => {
// //       if (news.length > 0) {
// //         setCurrentArticleIndex(0);
// //         const firstArticle = news[0];
// //         if (firstArticle) {
// //           return `First article: ${firstArticle.title}`;
// //         }
// //       }
// //       return "No articles loaded";
// //     },
    
// //     'last article': () => {
// //       if (news.length > 0) {
// //         setCurrentArticleIndex(news.length - 1);
// //         const lastArticle = news[news.length - 1];
// //         if (lastArticle) {
// //           return `Last article: ${lastArticle.title}`;
// //         }
// //       }
// //       return "No articles loaded";
// //     },
    
// //     'article number': (number) => {
// //       if (news.length > 0) {
// //         const index = parseInt(number) - 1;
// //         if (index >= 0 && index < news.length) {
// //           setCurrentArticleIndex(index);
// //           const article = news[index];
// //           if (article) {
// //             return `Article ${number}: ${article.title}`;
// //           }
// //         }
// //       }
// //       return `Article ${number} not available`;
// //     },
    
// //     // Control
// //     'stop reading': () => {
// //       stopReading();
// //       return "Stopped reading";
// //     },
    
// //     'pause reading': () => {
// //       if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
// //         window.speechSynthesis.pause();
// //         return "Paused reading";
// //       }
// //       return "Nothing is reading";
// //     },
    
// //     'resume reading': () => {
// //       if ('speechSynthesis' in window && window.speechSynthesis.paused) {
// //         window.speechSynthesis.resume();
// //         return "Resumed reading";
// //       }
// //       return "Nothing is paused";
// //     },
    
// //     // Information
// //     'current article': () => {
// //       if (news.length > 0) {
// //         const article = news[currentArticleIndex];
// //         if (article) {
// //           return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
// //         }
// //       }
// //       return "No article selected";
// //     },
    
// //     'news count': () => {
// //       if (news.length === 0) {
// //         return "No articles loaded";
// //       } else if (news.length === 1) {
// //         return "There is 1 article loaded";
// //       } else {
// //         return `There are ${news.length} articles loaded`;
// //       }
// //     },
    
// //     'read headlines': () => {
// //       if (news.length === 0) {
// //         return "No news articles available";
// //       }
      
// //       const headlines = news.slice(0, 3).map((article, idx) => 
// //         `Article ${idx + 1}: ${article.title}`
// //       ).join('. ');
      
// //       return `Top headlines: ${headlines}`;
// //     },
    
// //     // Actions
// //     'refresh news': () => {
// //       fetchNews();
// //       return "Refreshing news feed";
// //     },
    
// //     // News-specific help
// //     'news help': () => {
// //       return `News commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article`;
// //     }
// //   };
// // };



// export const createNewsVoiceCommands = (newsData, actions) => {
//   const { news = [], currentArticleIndex = 0 } = newsData;
//   const { 
//     readArticle, 
//     readArticleSummary, 
//     fetchNews, 
//     stopReading,
//     setCurrentArticleIndex 
//   } = actions;

//   return {
//     // Reading commands
//     'read news': () => {
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         if (article) {
//           readArticle(article);
//           return `Reading article ${currentArticleIndex + 1}: ${article.title}`;
//         }
//       }
//       return "No articles available. Please refresh the news.";
//     },
    
//     'next article': () => {
//       if (news.length > 0) {
//         const nextIndex = (currentArticleIndex + 1) % news.length;
//         setCurrentArticleIndex(nextIndex);
//         const nextArticle = news[nextIndex];
//         if (nextArticle) {
//           return `Next article: ${nextArticle.title}. Article ${nextIndex + 1} of ${news.length}`;
//         }
//       }
//       return "No articles loaded yet";
//     },
    
//     'previous article': () => {
//       if (news.length > 0) {
//         const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
//         setCurrentArticleIndex(prevIndex);
//         const prevArticle = news[prevIndex];
//         if (prevArticle) {
//           return `Previous article: ${prevArticle.title}. Article ${prevIndex + 1} of ${news.length}`;
//         }
//       }
//       return "No articles loaded yet";
//     },
    
//     'first article': () => {
//       if (news.length > 0) {
//         setCurrentArticleIndex(0);
//         const firstArticle = news[0];
//         if (firstArticle) {
//           return `First article: ${firstArticle.title}`;
//         }
//       }
//       return "No articles loaded";
//     },
    
//     'last article': () => {
//       if (news.length > 0) {
//         setCurrentArticleIndex(news.length - 1);
//         const lastArticle = news[news.length - 1];
//         if (lastArticle) {
//           return `Last article: ${lastArticle.title}`;
//         }
//       }
//       return "No articles loaded";
//     },
    
//     'stop reading': () => {
//       stopReading();
//       return "Stopped reading";
//     },
    
//     'read summary': () => {
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         if (article) {
//           readArticleSummary(article);
//           return "Reading article summary";
//         }
//       }
//       return "No article available";
//     },
    
//     'current article': () => {
//       if (news.length > 0) {
//         const article = news[currentArticleIndex];
//         if (article) {
//           return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
//         }
//       }
//       return "No article selected";
//     },
    
//     'news count': () => {
//       if (news.length === 0) {
//         return "No articles loaded";
//       } else if (news.length === 1) {
//         return "There is 1 article loaded";
//       } else {
//         return `There are ${news.length} articles loaded`;
//       }
//     },
    
//     'read headlines': () => {
//       if (news.length === 0) {
//         return "No news articles available";
//       }
      
//       const headlines = news.slice(0, 3).map((article, idx) => 
//         `Article ${idx + 1}: ${article.title}`
//       ).join('. ');
      
//       return `Top headlines: ${headlines}`;
//     },
    
//     'refresh news': () => {
//       fetchNews();
//       return "Refreshing news feed";
//     },
    
//     'news help': () => {
//       return `News commands: read news, next article, previous article, read summary, stop reading, refresh news, read headlines, current article, news count, first article, last article`;
//     }
//   };
// };


export const createNewsVoiceCommands = (newsData, actions) => {
  const { news = [], currentArticleIndex = 0 } = newsData;
  const { 
    readArticle, 
    readArticleSummary, 
    fetchNews, 
    stopReading,
    setCurrentArticleIndex 
  } = actions;

  const commands = {
    // Reading commands
    'read news': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          readArticle(article);
          return `Reading article ${currentArticleIndex + 1}: ${article.title}`;
        }
      }
      return "No articles available. Please refresh the news.";
    },
    
    'read article': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          readArticle(article);
          return `Reading current article`;
        }
      }
      return "No article available";
    },
    
    'read headline': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          // readArticleTitle function needs to be added to actions
          return `Headline: ${article.title}`;
        }
      }
      return "No headline available";
    },
    
    'read summary': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          readArticleSummary(article);
          return "Reading article summary";
        }
      }
      return "No article available";
    },
    
    'read full article': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          readArticle(article);
          return "Reading full article";
        }
      }
      return "No article available";
    },
    
    // Navigation commands
    'next article': () => {
      if (news.length > 0) {
        const nextIndex = (currentArticleIndex + 1) % news.length;
        setCurrentArticleIndex(nextIndex);
        const nextArticle = news[nextIndex];
        if (nextArticle) {
          return `Next article: ${nextArticle.title}. Article ${nextIndex + 1} of ${news.length}`;
        }
      }
      return "No articles loaded yet";
    },
    
    'previous article': () => {
      if (news.length > 0) {
        const prevIndex = currentArticleIndex === 0 ? news.length - 1 : currentArticleIndex - 1;
        setCurrentArticleIndex(prevIndex);
        const prevArticle = news[prevIndex];
        if (prevArticle) {
          return `Previous article: ${prevArticle.title}. Article ${prevIndex + 1} of ${news.length}`;
        }
      }
      return "No articles loaded yet";
    },
    
    'first article': () => {
      if (news.length > 0) {
        setCurrentArticleIndex(0);
        const firstArticle = news[0];
        if (firstArticle) {
          return `First article: ${firstArticle.title}`;
        }
      }
      return "No articles loaded";
    },
    
    'last article': () => {
      if (news.length > 0) {
        setCurrentArticleIndex(news.length - 1);
        const lastArticle = news[news.length - 1];
        if (lastArticle) {
          return `Last article: ${lastArticle.title}`;
        }
      }
      return "No articles loaded";
    },
    
    // Control commands
    'stop reading': () => {
      stopReading();
      return "Stopped reading";
    },
    
    // Information commands
    'current article': () => {
      if (news.length > 0) {
        const article = news[currentArticleIndex];
        if (article) {
          return `Current article ${currentArticleIndex + 1} of ${news.length}: ${article.title}`;
        }
      }
      return "No article selected";
    },
    
    'news count': () => {
      if (news.length === 0) {
        return "No articles loaded";
      } else if (news.length === 1) {
        return "There is 1 article loaded";
      } else {
        return `There are ${news.length} articles loaded`;
      }
    },
    
    'read headlines': () => {
      if (news.length === 0) {
        return "No news articles available";
      }
      
      // This will need a separate action function
      return `Top ${Math.min(3, news.length)} headlines loaded`;
    },
    
    // Refresh command
    'refresh news': () => {
      fetchNews();
      return "Refreshing news feed";
    },
    
    // Help command
    'news help': () => {
      return `News commands: read news, next article, previous article, read summary, stop reading, refresh news, article 1, article 2, current article, news count, first article, last article`;
    },
    
    'help': () => {
      return "News Reader: Say 'read news' to read current article, 'next article' to navigate, 'article 1' to select specific article, 'stop reading' to stop, 'refresh news' to update.";
    }
  };

  return commands;
};