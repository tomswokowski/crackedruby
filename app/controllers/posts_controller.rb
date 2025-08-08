class PostsController < ApplicationController
  def index
    @posts = Post.where(post_type: params[:post_type]).published

    # Apply search filter
    if params[:search].present?
      @posts = @posts.where(
        "title ILIKE ? OR description ILIKE ?",
        "%#{params[:search]}%",
        "%#{params[:search]}%"
      )
    end

    # Apply category filter
    if params[:category].present?
      @posts = @posts.where(category: params[:category])
    end

    # Apply sorting
    @posts = case params[:sort]
    when "oldest"
      @posts.order(created_at: :asc)
    when "title_asc"
      @posts.order(title: :asc)
    when "title_desc"
      @posts.order(title: :desc)
    when "section_order"
      @posts.order(:section_number, :created_at)
    else
      if params[:post_type] == "learn_ruby"
        @posts.order(:section_number, :created_at)
      else
        @posts.order(created_at: :desc)
      end
    end

    @post_type = params[:post_type]
    @page_title = page_title_for_type(@post_type)
  end

  def show
    @post = Post.find_by!(slug: params[:slug], post_type: params[:post_type])
    @back_link_text = back_link_text_for_type(@post.post_type)
    @back_link_path = back_link_path_for_type(@post.post_type)
  end

  private

  def page_title_for_type(type)
    case type
    when "learn_ruby" then "Learn Ruby"
    when "software_dev" then "Software Dev"
    when "blog" then "Blog"
    end
  end

  def back_link_text_for_type(type)
    case type
    when "learn_ruby" then "Back to Learn Ruby"
    when "software_dev" then "Back to Software Dev"
    when "blog" then "Back to Blog"
    end
  end

  def back_link_path_for_type(type)
    case type
    when "learn_ruby" then learn_ruby_posts_path
    when "software_dev" then software_dev_posts_path
    when "blog" then blog_posts_path
    end
  end
end
