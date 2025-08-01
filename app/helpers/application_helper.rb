module ApplicationHelper
  def post_path_for_type(post)
    case post.post_type
    when "learn_ruby"
      "/learn-ruby/#{post.slug}"
    when "software_dev"
      "/software-development/#{post.slug}"
    when "blog"
      "/blog/#{post.slug}"
    end
  end
end
