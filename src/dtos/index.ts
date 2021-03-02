export class Article {
  static lastId = 0;

  id: number;
  title: string;
  body: string;

  constructor(title: string, body: string) {
    this.id = ++Article.lastId;
    this.title = title;
    this.body = body;
  }
};