module Admin
  class LessonsController < BaseController
    before_action :set_lesson, only: %i[show edit update destroy]

    def index
      @lessons = Lesson.all
    end

    def show
    end

    def new
      @lesson = Lesson.new
    end

    def create
      @lesson = Lesson.new(lesson_params)
      if @lesson.save
        redirect_to admin_lessons_path, notice: "Lesson created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @lesson.update(lesson_params)
        redirect_to admin_lessons_path, notice: "Lesson updated successfully."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @lesson.destroy
      redirect_to admin_lessons_path, notice: "Lesson deleted successfully."
    end

    private

    def set_lesson
      identifier = params[:slug].presence || params[:id]
      @lesson = identifier.to_s.match?(/\A\d+\z/) ? Lesson.find(identifier) : Lesson.find_by!(slug: identifier)
    end

    def lesson_params
      params.require(:lesson).permit(:title, :body, :slug, :published, :featured)
    end
  end
end
