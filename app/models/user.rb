class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i[google_oauth2 github]

  before_validation :normalize_email
  validates :email, presence: true, uniqueness: { case_sensitive: false }

  ADMIN_EMAIL = ENV.fetch("ADMIN_EMAIL")

  def self.from_omniauth(auth)
    email = auth.info.email.to_s.strip.downcase

    verified = auth.info.email_verified
    verified ||= auth.extra.all_emails&.any? do |e|
      e["email"].to_s.strip.downcase == email && e["verified"] == true
    end

    raise "Unverified email from OAuth provider" unless verified

    find_or_create_by!(email: email)
  end

  def admin?
    email == ADMIN_EMAIL
  end

  private

  def normalize_email
    self.email = email.to_s.strip.downcase
  end
end
