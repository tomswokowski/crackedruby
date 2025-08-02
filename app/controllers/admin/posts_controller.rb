module Admin
  class PostsController < BaseController
    before_action :set_post, only: %i[show edit update destroy]

    def index
      @posts = Post.all
    end

    def show
    end

    def new
      @post = Post.new
    end

    def create
      @post = Post.new(post_params)
      if @post.save
        redirect_to admin_posts_path, notice: "Post created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @post.update(post_params)
        redirect_to admin_posts_path, notice: "Post updated successfully."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @post.destroy
      redirect_to admin_posts_path, notice: "Post deleted successfully."
    end

    private

    def set_post
      identifier = params[:slug].presence || params[:id]
      if identifier.to_s.match?(/\A\d+\z/)
        @post = Post.find(identifier)
      else
        @post = Post.find_by!(slug: identifier)
      end
    end

    def post_params
      params.require(:post).permit(:title, :body, :slug, :published, :featured, :post_type, :description)
    end
  end
end
