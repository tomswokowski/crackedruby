class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    if user_signed_in?
      redirect_to root_path, notice: "You're already signed in."
      return
    end

    handle_auth "Google"
  end

  def after_omniauth_failure_path_for(_scope)
    root_path
  end

  private

  def handle_auth(kind)
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: kind) if is_navigational_format?
    else
      redirect_to root_path, alert: "#{kind} authentication failed."
    end
  end
end
