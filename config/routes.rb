Rails.application.routes.draw do
  root "pages#home"

  # Static Pages
  get "about", to: "pages#about", as: :about

  # Public Resourceful Paths
  resources :lessons,  only: %i[index show], path: "learn-ruby",           param: :slug
  resources :articles, only: %i[index show], path: "software-development", param: :slug
  resources :posts,    only: %i[index show], path: "blog",                 param: :slug

  # Authenticated Routes
  authenticate :user do
    get "settings", to: "settings#index", as: :settings
  end

  # Admin Routes
  authenticate :user, ->(u) { u.admin? } do
    namespace :admin do
      root to: "dashboard#index"
      resources :posts,    param: :slug
      resources :articles, param: :slug
      resources :lessons,  param: :slug
    end
  end

  # Devise Auth
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  devise_scope :user do
    delete "sign_out", to: "devise/sessions#destroy", as: :destroy_user_session
  end
end
