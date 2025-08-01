class PagesController < ApplicationController
  def home
    @latest_learn_ruby = Post.learn_ruby.published.order(created_at: :desc).limit(5)
    @latest_software_dev = Post.software_dev.published.order(created_at: :desc).limit(5)
    @latest_blog = Post.blogs.published.order(created_at: :desc).limit(5)
    @latest_entries = Post.published.order(created_at: :desc).limit(10)
  end

  def about
  end

  def apps
  end

  def terms
  end

  def privacy
  end
end
