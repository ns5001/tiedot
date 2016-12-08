Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
  resources :contacts
  resources :comments
  resources :graphs

  root :to =>'welcome#index'
  get "/users/sign_out.:id" => 'users#custom_sign_out'
  get "/users/:id/inbox/" => 'users#inbox'


  resources :connections
  resources :users

  resources :users do
    resources :graphs
  end

  post '/users/:user_id/graphs/upload' => 'graphs#upload', as: 'users_graphs_upload'
  post "/users/:user_id/graphs/:id/send_mail" => "graphs#send_mail", as: 'user_graphs_email'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
