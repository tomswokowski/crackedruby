class PostsController < ApplicationController
  # GET /blog
  def index
    @posts = Post.all
  end

  # GET /blog/:id
  def show
    @post = Post.find_by!(slug: params[:id])
  end
end
