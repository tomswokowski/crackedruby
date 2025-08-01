class PostsController < ApplicationController
  def index
    @posts = Post.where(post_type: params[:post_type]).published
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
    when "learn_ruby" then "\u2190 Back to Learn Ruby"
    when "software_dev" then "\u2190 Back to Software Dev"
    when "blog" then "\u2190 Back to Blog"
    end
  end

  def back_link_path_for_type(type)
    case type
    when "learn_ruby" then "/learn-ruby"
    when "software_dev" then "/software-development"
    when "blog" then "/blog"
    end
  end
end
