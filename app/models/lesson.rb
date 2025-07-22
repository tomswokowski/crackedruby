class Lesson < ApplicationRecord
  scope :published, -> { where(published: true) }
end
