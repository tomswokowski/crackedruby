Rails.application.routes.draw do
  root "pages#home"

  # App Route
  get "/app", to: "app#index", as: :app

  # Static Pages
  get "about",   to: "pages#about",   as: :about
  get "terms",   to: "pages#terms",   as: :terms
  get "privacy", to: "pages#privacy", as: :privacy

  # Public Resourceful Paths
  get "learn-ruby",                 to: "posts#index", post_type: "learn_ruby", as: :learn_ruby_posts
  get "learn-ruby/:slug",           to: "posts#show", post_type: "learn_ruby", as: :learn_ruby_post

  get "software-development",       to: "posts#index", post_type: "software_dev", as: :software_dev_posts
  get "software-development/:slug", to: "posts#show", post_type: "software_dev", as: :software_dev_post

  get "blog",                       to: "posts#index", post_type: "blog", as: :blog_posts
  get "blog/:slug",                 to: "posts#show", post_type: "blog", as: :blog_post

  # Authenticated Routes
  authenticate :user do
    get "settings", to: "settings#index", as: :settings
  end

  # Admin Routes
  authenticate :user, ->(u) { u.admin? } do
    namespace :admin do
      root to: "home#index"
      resources :posts, param: :slug
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
