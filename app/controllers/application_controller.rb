class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def after_sign_in_path_for(resource)
    stored_location_for(resource) ||
      (resource.respond_to?(:admin?) && resource.admin? ? admin_root_path : app_path)
  end

  def after_sign_out_path_for(_resource_or_scope)
    app_path
  end
end
