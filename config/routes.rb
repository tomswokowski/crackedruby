Rails.application.routes.draw do
  root "pages#home"

  # Static pages
  get "about", to: "pages#about", as: :about

  # Public Resourceful Paths
  resources :lessons,  only: %i[index show], path: "learn-ruby"
  resources :articles, only: %i[index show], path: "software-development"
  resources :posts,    only: %i[index show], path: "blog"

  # Admin Area
  authenticate :user, ->(u) { u.admin? } do
    namespace :admin do
      root to: "dashboard#index", as: ""
      resources :posts,    param: :slug
      resources :articles, param: :slug
      resources :lessons,  param: :slug
    end
  end

  # Authenticated routes
  authenticate :user do
    get "settings", to: "settings#index", as: :settings
  end

  # Devise auth
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end
end
