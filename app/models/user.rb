class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2, :github]

  def self.from_omniauth(auth)
    user = find_by(provider: auth.provider, uid: auth.uid)
    user ||= find_by(email: auth.info.email)

    if user
      user.update(provider: auth.provider, uid: auth.uid) if user.provider.blank? || user.uid.blank?
      user
    else
      create(
        email: auth.info.email,
        provider: auth.provider,
        uid: auth.uid
      )
    end
  end
end
