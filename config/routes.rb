Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    post "memes", to: "memes#create"
    get "users", to: "users#index"
    get "users/:id", to: "users#show"
    put "users/:id", to: "users#update"
  end
  get"*other", to: "static#index"
end
