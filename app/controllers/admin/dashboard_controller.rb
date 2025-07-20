module Admin
  class DashboardController < BaseController
    def index
      @post_count    = Post.count
      @article_count = Article.count
      @lesson_count  = Lesson.count
      render template: 'admin/index'
    end
  end
end
