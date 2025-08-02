class Post < ApplicationRecord
  TYPES = %w[learn_ruby software_dev blog].freeze

  validates :title, presence: true
  validates :post_type, presence: true, inclusion: { in: TYPES }
  validates :slug, presence: true, uniqueness: true
  validates :description, presence: true, length: { maximum: 500 }

  scope :published, -> { where(published: true) }
  scope :featured, -> { where(featured: true) }
  scope :learn_ruby, -> { where(post_type: "learn_ruby") }
  scope :software_dev, -> { where(post_type: "software_dev") }
  scope :blogs, -> { where(post_type: "blog") }

  before_validation :generate_slug

  def learn_ruby?
    post_type == "learn_ruby"
  end

  def software_dev?
    post_type == "software_dev"
  end

  def blog?
    post_type == "blog"
  end

  private

  def generate_slug
    if slug.blank? && title.present?
      self.slug = title.parameterize
    end
  end
end
