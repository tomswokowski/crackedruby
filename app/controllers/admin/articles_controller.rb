module Admin
  class ArticlesController < BaseController
    before_action :set_article, only: %i[show edit update destroy]

    def index
      @articles = Article.all
    end

    def show
    end

    def new
      @article = Article.new
    end

    def create
      @article = Article.new(article_params)
      if @article.save
        redirect_to admin_articles_path, notice: "Article created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @article.update(article_params)
        redirect_to admin_articles_path, notice: "Article updated successfully."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @article.destroy
      redirect_to admin_articles_path, notice: "Article deleted successfully."
    end

    private

    def set_article
      identifier = params[:slug].presence || params[:id]
      @article = identifier.to_s.match?(/\A\d+\z/) ? Article.find(identifier) : Article.find_by!(slug: identifier)
    end

    def article_params
      params.require(:article).permit(:title, :body, :slug, :published, :featured)
    end
  end
end
