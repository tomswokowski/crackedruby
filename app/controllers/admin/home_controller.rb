module Admin
  class HomeController < BaseController
    def index
      @post_count = Post.count
      @learn_ruby_count = Post.learn_ruby.count
      @software_dev_count = Post.software_dev.count
      @blog_count = Post.blogs.count
    end
  end
end
