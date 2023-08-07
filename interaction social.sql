CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Table des réactions
CREATE TABLE IF NOT EXISTS reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  reaction_type TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Table des groupes
  
-- Table des pages suivies
CREATE TABLE IF NOT EXISTS followed_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  page_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT
  posts.id AS post_id,
  posts.content AS post_content,
  posts.created_at AS post_created_at,
  users.username AS author_username,
  COUNT(DISTINCT comments.id) AS total_comments,
  COUNT(DISTINCT reactions.id) AS total_reactions,
  COUNT(DISTINCT groups.id) AS total_groups,
  COUNT(DISTINCT followed_pages.id) AS total_followed_pages
FROM posts
LEFT JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
LEFT JOIN reactions ON posts.id = reactions.post_id
LEFT JOIN group_members ON group_members.member_id = ?
LEFT JOIN groups ON group_members.group_id = groups.id
LEFT JOIN followed_pages ON followed_pages.user_id = ?
WHERE posts.id = ?;