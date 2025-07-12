class ArticlesController < ApplicationController
  # GET /software-development
  def index
    @articles = Article.all
  end

  # GET /software-development/:id
  def show
    @article = Article.find_by!(slug: params[:id])
  end
end
