Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
  resources :contacts
  resources :comments
  root :to =>'welcome#index'
  get "/users/sign_out.3" => 'users#custom_sign_out'

  resources :users do
    resources :graphs
  end

  post '/users/:user_id/graphs/upload' => 'graphs#upload', as: 'users_graphs_upload'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
