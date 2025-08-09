class PagesController < ApplicationController
  def home
    @latest_blog = Post.blogs.published
                       .select(:id, :title, :slug, :description, :created_at, :post_type)
                       .order(created_at: :desc)
                       .limit(5)
  end

  def about
  end

  def terms
  end

  def privacy
  end
end
