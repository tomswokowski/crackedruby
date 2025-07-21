class PostsController < ApplicationController
  # GET /blog
  def index
    @posts = Post.all
  end

  # GET /blog/:slug
  def show
    @post = Post.find_by!(slug: params[:slug])
  end
end
