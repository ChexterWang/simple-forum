
export class PostItem {
  constructor({ _id, title, content, author, tags, createdAt, updatedAt, rating }) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.rating = rating;
    this.author = author;
    this.tags = tags;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}

export class Post {
  constructor({ _id, title, content, answers, comments, rating, tags, author, createdAt, updatedAt }) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.answers = answers;
    this.comments = comments;
    this.rating = rating;
    this.tags = tags;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class User {
  constructor({ _id, username, isAdmin, }) {
    this._id = _id;
    this.username = username;
    this.isAdmin = isAdmin;
  }
}