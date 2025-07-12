class LessonsController < ApplicationController
  # GET /learn-ruby
  def index
    @lessons = Lesson.all
  end

  # GET /learn-ruby/:id
  def show
    @lesson = Lesson.find_by!(slug: params[:id])
  end
end
