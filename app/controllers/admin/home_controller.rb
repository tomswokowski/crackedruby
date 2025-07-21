module Admin
  class HomeController < BaseController
    def index
      @post_count    = Post.count
      @article_count = Article.count
      @lesson_count  = Lesson.count
    end
  end
end
