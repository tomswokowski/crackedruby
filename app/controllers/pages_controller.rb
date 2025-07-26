class PagesController < ApplicationController
  def home
    @latest_articles = Article.published.order(created_at: :desc).limit(5)
    @latest_lessons  = Lesson.published.order(created_at: :desc).limit(5)
    @latest_posts    = Post.published.order(created_at: :desc).limit(5)

    @latest_entries = (
      @latest_articles + @latest_lessons
    ).sort_by(&:created_at).reverse.first(10)
  end

  def about
  end
end
