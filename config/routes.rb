Rails.application.routes.draw do
  root "home#index"

  get "up", to: "rails/health#show", as: :rails_health_check

  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end
end
