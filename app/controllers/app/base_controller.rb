module App
  class BaseController < ::ApplicationController
    before_action :authenticate_user!
    layout "app"
  end
end
