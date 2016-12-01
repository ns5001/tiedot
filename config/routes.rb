Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
  resources :contacts
  resources :comments
  resources :graphs

  root :to =>'welcome#index'
  get "/users/sign_out.1" => 'users#custom_sign_out'
end
