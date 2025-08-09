class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include Devise::Controllers::Rememberable

  def google_oauth2
    handle_auth "Google"
  end

  def github
    handle_auth "GitHub"
  end

  def after_omniauth_failure_path_for(_scope)
    app_path
  end

  private

  def handle_auth(kind)
    if user_signed_in?
      redirect_to app_path, notice: "You're already signed in."
      return
    end

    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      remember_me(@user)
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: kind) if is_navigational_format?
    else
      redirect_to app_path, alert: "#{kind} authentication failed."
    end
  end
end
